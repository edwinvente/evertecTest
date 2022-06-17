<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Order;


class PayController extends Controller
{
    public $placetopay = null;

    public function __construct(){
        $settings = config('evertec');
        $this->placetopay = new \Dnetix\Redirection\PlacetoPay([
            'login'   => $settings["LOGIN"],
            'tranKey' => $settings["TRANKEY"],
            'url'     => $settings["URL"],
            'timeout' => $settings["TIMEOUT"], // (optional) 15 by default
        ]);
    }

    public function payment(Request $request){
        $resp = null;
        $reference = $request->referencia;
        $requestPay = [
            'payment' => [
                'reference' => $reference,
                'description' => 'Compra en tienda online de: '.$request->name,
                'amount' => [
                    'currency' => 'USD',
                    'total' => (int)$request->total,
                ],
            ],
            'expiration' => date('c', strtotime('+2 days')),
            'returnUrl' => 'http://localhost:8000/api/response?reference=' . $reference,
            'ipAddress' => '127.0.0.1',
            'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        ];
        //create payment in platopay
        $response = $this->placetopay->request($requestPay);
        //create order
        $resp = $this->createOrder($request, $response);
        
        return response()->json([
            "placetopay" => $response,
            "reference" => $reference,
            "resp" => $resp,
            "reference_front" => $request->referencia,
            "requestId" => $response->requestId(),
            "processUrl" => $response->processUrl(),
            "status" => $response->status(),
            "message" => $response->status()->message(),
        ], 200);
    }

    public function updatePayment(Request $request){
        $order = Order::where("reference", $request->reference)->first();
        $msg = "Actualización exitosa";
        if ($order) {
            $response = $this->placetopay->query($order->requestId);
            $order->status = $response->status()->status();
            try {
                $order->save();
            } catch (\Exception $e) {
                $msg = $e->getMessage();   
            }
        }
        return redirect('/tienda/detalle/' . $order->requestId);
    }
    
    public function getRefernce($requestId){
        $order = Order::where("requestId", $requestId)->first();
        $response = null;
        if ($order) {
            $response = $this->placetopay->query($order->requestId);
            $order->status = $response->status()->status();
        }
        return response()->json([
            "status" => true,
            "response" => $response,
            "message" => $response->status()->message(),
            "order" => $order,
            "request" => $requestId,
        ], 200);
    }
    
    public function getOrders(Request $request){    
        return response()->json([
            "status" => true,
            "response" => Order::where("customer_email", $request->email)->get(),
        ], 200);
    }

    public function createOrder($request, $response){
        $status = true;
        $msg = "Guardado exitoso";
        //create new instance for order
        $order = new Order;
        $order->customer_name = $request->name;
        $order->customer_email = $request->email;
        $order->customer_mobile = $request->phone;
        $order->status = $response->status()->status();
        $order->reference = $request->referencia;
        $order->products = $request->phone;
        $order->amount = $request->total;
        $order->url = $response->processUrl();
        $order->requestId = $response->requestId();
        try {
            $order->save();
        } catch (\Exception $e) {
            $msg = $e->getMessage();   
        }
        return [
            $status,
            $msg
        ];
    }
}
