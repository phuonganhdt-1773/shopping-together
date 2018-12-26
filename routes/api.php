<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/uninstall',['as'=>'uninstall', 'uses'=>'AuthController@uninstall']);
Route::post('/product/save','ProductController@save');
Route::post('/product/delete','ProductController@delete');
Route::post('/app/setting/init', 'SettingController@init');
Route::post('/app/setting/save', 'SettingController@save');
Route::post('/app/setting/get', 'SettingController@get');

Route::post('/product/search', 'ProductController@search');
Route::post('/product/get-list', 'ProductController@renderList');
Route::post('/cart-rule/save', 'CartRuleController@save');
Route::post('/product/clone', 'AuthController@cloneProducts');
