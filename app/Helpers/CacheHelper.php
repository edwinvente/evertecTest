<?php

namespace App\Helpers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Mail;


class CacheHelper{
    public static function getCache($key){
        $data = null;
        if (Cache::has($key)) {
            $data = Cache::get($key);
        }
        return $data;
    }

    public static function createCache($key, $data){
        Cache::put($key, $data);
        return true;
    }
    
    public static function deleteCache($key){
        Cache::forget($key);
        return true;
    }

}
