<?php
// File: controllers/LaptopController.php

// Memanggil Model Laptop
require_once 'models/Laptop.php';

class LaptopController {
    public function index() {
        // Inisiasi data menggunakan Constructor dari Model
        $laptops = [
            new Laptop(101, "Apple MacBook Pro 14 Inch M3 Pro", "Apple", 1999.99, "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png", "Laptop kencang untuk kebutuhan video editing 4K, software engineering, dan desain profesional.", "18GB RAM | 512GB SSD", "Tersedia"),
            new Laptop(102, "Asus ROG Zephyrus G16 Gaming", "Asus", 2199.00, "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png", "Laptop gaming ultra-thin dengan layar OLED 240Hz dan kartu grafis RTX seri terbaru.", "32GB RAM | 1TB SSD", "Pre-Order"),
            new Laptop(103, "Lenovo ThinkPad X1 Carbon Gen 11", "Lenovo", 1649.50, "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png", "Standar industri laptop bisnis dengan ketahanan militer dan keyboard terbaik di kelasnya.", "16GB RAM | 512GB SSD", "Tersedia"),
            new Laptop(104, "Dell XPS 15 9530 Creator Edition", "Dell", 1899.99, "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png", "Layar InfinityEdge 3.5K Touchscreen dengan kekuatan prosesor Intel Core i9.", "32GB RAM | 1TB SSD", "Habis"),
            new Laptop(105, "Acer Swift Go 14 AI", "Acer", 1199.00, "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png", "Laptop tipis bertenaga AI dengan sistem pendingin kipas ganda dan layar OLED warna akurat.", "32GB RAM | Intel Core Ultra 7", "Tersedia"),
            new Laptop(106, "HP Spectre x360 14", "HP", 1499.50, "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png", "Laptop 2-in-1 premium dengan desain elegan dan baterai tahan seharian penuh.", "16GB RAM | 1TB SSD", "Pre-Order"),
            new Laptop(107, "MSI Stealth 16 Studio", "MSI", 1750.00, "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png", "Kombinasi sempurna antara performa gaming dan tampilan profesional untuk studio kreatif.", "32GB RAM | RTX 4070", "Tersedia"),
            new Laptop(108, "Huawei MateBook X Pro 2024", "Huawei", 1599.00, "https://cdn.dummyjson.com/products/images/laptops/Lenovo%20Yoga%20920/thumbnail.png", "Bodi magnesium super ringan dengan rasio layar-ke-bodi tertinggi di kelasnya.", "16GB RAM | 1TB NVMe", "Habis"),
            new Laptop(109, "Razer Blade 15 Advanced", "Razer", 2499.99, "https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/thumbnail.png", "Sasis aluminium CNC dengan performa gaming kelas berat tanpa kompromi.", "32GB RAM | 240Hz QHD", "Tersedia"),
            new Laptop(110, "Gigabyte AERO 14 OLED", "Gigabyte", 1349.00, "https://cdn.dummyjson.com/products/images/laptops/New%20DELL%20XPS%2013%209300%20Laptop/thumbnail.png", "Dikalibrasi khusus dari pabrik untuk akurasi warna mutlak bagi pekerja industri kreatif.", "16GB RAM | RTX 4050", "Tersedia")
        ];

        // Memuat View dan mengirimkan data $laptops agar bisa dirender
        require_once 'views/home.php';
    }
}
?>