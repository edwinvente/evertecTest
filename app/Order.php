<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "orders";
    protected $filleable = [
        "customer_name",
        "customer_email",
        "customer_mobile",
        "status",
        "reference",
        'products',
        'amount'
    ];
}
