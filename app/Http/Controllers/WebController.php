<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebController extends Controller
{
    public function index(){
        return redirect('tienda/');
    }
    public function react(){
        return view("welcome");
    }
}
