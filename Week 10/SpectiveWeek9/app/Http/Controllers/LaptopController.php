<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Laptop;

class LaptopController extends Controller
{
    public function index()
    {

        $laptops = Laptop::all();

        // Mengirimkan data $laptops ke view 'home'
        return view('home', compact('laptops'));
    }
}
