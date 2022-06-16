<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class PayController extends Controller
{
    public function test(Request $request){

        /* $seed = date('c');

        if (function_exists('random_bytes')) {
            $nonce = bin2hex(random_bytes(16));
        } elseif (function_exists('openssl_random_pseudo_bytes')) {
            $nonce = bin2hex(openssl_random_pseudo_bytes(16));
        } else {
            $nonce = mt_rand();
        }
        
        $nonceBase64 = base64_encode($nonce);

        $tranKey = base64_encode(sha1($nonce . $seed . "2345678bbb", true));

        $response = Http::withHeaders([
            'auth' => [
                "login" => "6dd490faf9cb87a9862245da41170ff2",
                "tranKey" => $tranKey,
                "nonce" => $nonce,
                "seed" => $seed
            ],
        ])->post('https://checkout-test.placetopay.com/api/session', [
            'name' => 'Taylor',
        ]);
        return [
            "response" => json_decode($response),
            "tranKey" => $tranKey,
            "seed" => $seed,
            "nonce" => $nonce,
        ]; */


        $placetopay = new \Dnetix\Redirection\PlacetoPay([
            'login' => '6dd490faf9cb87a9862245da41170ff2', // Provided by PlacetoPay
            'tranKey' => '024h1IlD', // Provided by PlacetoPay
            'url' => 'https://dev.placetopay.com/redirection/',
            'timeout' => 10, // (optional) 15 by default
        ]);

        $reference = "COULD_BE_THE_PAYMENT_ORDER_ID";
        $request = [
            'payment' => [
                'reference' => $reference,
                'description' => 'Testing payment',
                'amount' => [
                    'currency' => 'USD',
                    'total' => 120,
                ],
            ],
            'expiration' => date('c', strtotime('+2 days')),
            'returnUrl' => 'http://example.com/response?reference=' . $reference,
            'ipAddress' => '127.0.0.1',
            'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        ];

        $response = $placetopay->request($request);
        if ($response->isSuccessful()) {
            // STORE THE $response->requestId() and $response->processUrl() on your DB associated with the payment order
            // Redirect the client to the processUrl or display it on the JS extension
            $response->processUrl();
        } else {
            // There was some error so check the message and log it
            $response->status()->message();
        }

        return [
            "response" => $response,
            "placetopay" => $placetopay,
        ];
        

    }

    public function sebas(){
        $placetopay = new \Dnetix\Redirection\PlacetoPay([
            'login' => '6dd490faf9cb87a9862245da41170ff2', // Provided by PlacetoPay
            'tranKey' => '024h1IlD', // Provided by PlacetoPay
            'url' => 'https://dev.placetopay.com/redirection/',
            'timeout' => 10, // (optional) 15 by default
        ]);
        //$response = $placetopay->query('THE_REQUEST_ID_TO_QUERY');
        //$response = $placetopay->query('56415');
        $response = $placetopay->query('56419');

        if ($response->isSuccessful()) {
            // In order to use the functions please refer to the Dnetix\Redirection\Message\RedirectInformation class

            if ($response->status()->isApproved()) {
                // The payment has been approved
                /* echo "<pre>";
                var_dump($response->payment[0]);
                echo "</pre>"; */
                //dd($response->payment[0]);
                dd($response);
                dd($response->status()->message());
                dd($response->status());
            }
        } else {
            // There was some error with the connection so check the message
            print_r($response->status()->message() . "\n");
        }
        if ($response->status()->status() == "PENDING") {
            # code...
            dd("edwin",$response);
        }
    }
}
