<?php

namespace App;
use DB;
use Illuminate\Database\Eloquent\Model;

class DashBoard extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'stats';
    protected $fillable=['id_shop','id_cart_rule','nb_view','nb_order','nb_sale','updated_at','created_at'];

    /**
     * @param $date_from
     * @param $date_to
     * @return array
     */
    public static function getStastDetail ($date_from, $date_to) {
        $stats = array();
        $sql = DB::table('stats');
        $sql->select('cart_rule.name');
        $sql->selectRaw('SUM(nb_view) as total_view');
        $sql->selectRaw('SUM(nb_order) as total_order');
        $sql->selectRaw('SUM(nb_sale) as total_sale');
        $sql->join('cart_rule', 'cart_rule.id', '=', 'stats.id_cart_rule');
        $sql->whereBetween('stats.created_at',["$date_from 00:00:00", "$date_to 23:59:59"]);
        $sql->groupBy('stats.id_cart_rule');
        $results = $sql->get()->toArray();
        return $results;
    }

    /**
     * @param $date_from
     * @param $date_to
     * @param $granularity
     * @return array
     */
    public static function getStast($date_from, $date_to, $granularity)
    {
        $stats = array();
        $sql = DB::table('stats');
        $sql->selectRaw('SUM(nb_view) as total_view');
        $sql->selectRaw('SUM(nb_order) as total_order');
        $sql->selectRaw('SUM(nb_sale) as total_sale');
        $sql->selectRaw('LEFT(created_at, 10) as date');
        $sql->whereBetween('created_at',["$date_from 00:00:00", "$date_to 23:59:59"]);
        switch ($granularity) {
            case 'day':
                $sql->groupBy(DB::raw('LEFT(`created_at`, 10)'));
                break;
            case 'week':
                $sql->groupBy(DB::raw('WEEK(`created_at`, 1)'));
                break;
            default:
                $sql->groupBy(DB::raw('MONTH(`created_at`)'));
                break;
        }

        $results = $sql->get()->toArray();
        foreach ($results as $result) {
            switch ($granularity) {
                case 'day':
                    $stats[strtotime($result->date)]['view'] = (float) $result->total_view;
                    $stats[strtotime($result->date)]['order'] = (float) $result->total_order;
                    $stats[strtotime($result->date)]['sale'] = (float) $result->total_sale;
                    break;
                case 'week':
                    $date = strtotime(date('Y-m-d', strtotime('monday this week', strtotime($result->date))));
                    $stats[$date]['view'] = (int) $result->total_view;
                    $stats[$date]['order'] = (int) $result->total_order;
                    $stats[$date]['sale'] = (float) $result->total_sale;
                    break;
                default:
                    $date = strtotime(date('Y-m', strtotime($result->date)));
                    $stats[$date]['view'] = (int) $result->total_view;
                    $stats[$date]['order'] = (int) $result->total_order;
                    $stats[$date]['sale'] = (float) $result->total_sale;
                    break;
            }
        }
        return $stats;
    }
}