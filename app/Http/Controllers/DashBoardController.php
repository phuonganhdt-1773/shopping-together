<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Setting;
use App\Shop;
use DB;
use App\DashBoard;

class DashBoardController extends Controller
{   
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getData (Request $request) 
    {
        $status = true;
        $msg = 'successfully';
        $data = array();
        $granularity = $request->granularity;
        $date_from = $request->date_from;
        $date_to = $request->date_to;
        try{
            $summary_details = $this->getSummaryDetails($date_from, $date_to, $granularity);
            $data = array(
                'dashboard' => array(
                    'views' => $summary_details['views'],
                    'orders' => $summary_details['orders'],
                    'revenues' => $summary_details['revenues'],
                ),
                'detail' => DashBoard::getStastDetail($date_from, $date_to),
            );
        }
        catch(\Exception $e){
            $status = false;
            $msg = $e->getMessage();
        }
        return response()->json([
            'data' => $data,
            'message' => $msg,
            'status' => $status,
        ], 200); 
    }

    
    /**
     * @param $date_from
     * @param $date_to
     * @param $granularity
     * @return array
     */
    public function getSummaryDetails($date_from, $date_to, $granularity)
    {
        $summary_details = array(
            'views' => array(),
            'orders' => array(),
            'revenues' => array(),
        );
        $stats = DashBoard::getStast($date_from, $date_to, $granularity);
        $from = strtotime($date_from.' 00:00:00');
        $to = min(time(), strtotime($date_to.' 23:59:59'));
        switch ($granularity) {
            case 'day':
                for ($date = $from; $date <= $to; $date = strtotime('+1 day', $date)) {
                    $summary_details['views'][$date] = isset($stats[$date]['view']) ? $stats[$date]['view'] : 0;
                    $summary_details['orders'][$date] = isset($stats[$date]['order']) ? $stats[$date]['order'] : 0;
                    $summary_details['revenues'][$date] = isset($stats[$date]['sale']) ? $stats[$date]['sale'] : 0;
                }
                break;
            case 'week':
                for ($date = $from; $date <= $to; $date = strtotime('+1 week', $date)) {
                    $summary_details['views'][$date] = isset($stats[$date]['view']) ? $stats[$date]['view'] : 0;
                    $summary_details['orders'][$date] = isset($stats[$date]['order']) ? $stats[$date]['order'] : 0;
                    $summary_details['revenues'][$date] = isset($stats[$date]['sale']) ? $stats[$date]['sale'] : 0;
                }
                break;
            default:      
                for ($date = $from; $date <= $to; $date = strtotime('+1 month', $date)) {
                    $summary_details['views'][$date] = isset($stats[$date]['view']) ? $stats[$date]['view'] : 0;
                    $summary_details['orders'][$date] = isset($stats[$date]['order']) ? $stats[$date]['order'] : 0;
                    $summary_details['revenues'][$date] = isset($stats[$date]['sale']) ? $stats[$date]['sale'] : 0;
                }
                break;
        }
        return $summary_details;
    }
}
