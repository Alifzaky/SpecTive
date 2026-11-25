<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Laptop;

class LaptopSeeder extends Seeder
{
    public function run(): void
    {
        $laptops = [
            ['title' => 'Apple MacBook Pro 14 Inch M3 Pro', 'brand' => 'Apple', 'price' => 1999.99, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Apple+MacBook+Pro', 'description' => 'Laptop kencang untuk kebutuhan video editing 4K, software engineering, dan desain profesional.', 'specs' => '18GB RAM | 512GB SSD', 'status' => 'Tersedia'],
            ['title' => 'Asus ROG Zephyrus G16 Gaming', 'brand' => 'Asus', 'price' => 2199.00, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=ASUS+ROG+Zephyrus', 'description' => 'Laptop gaming ultra-thin dengan layar OLED 240Hz dan kartu grafis RTX seri terbaru.', 'specs' => '32GB RAM | 1TB SSD', 'status' => 'Pre-Order'],
            ['title' => 'Lenovo ThinkPad X1 Carbon Gen 11', 'brand' => 'Lenovo', 'price' => 1649.50, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Lenovo+ThinkPad', 'description' => 'Standar industri laptop bisnis dengan ketahanan militer dan keyboard terbaik di kelasnya.', 'specs' => '16GB RAM | 512GB SSD', 'status' => 'Tersedia'],
            ['title' => 'Dell XPS 15 9530 Creator Edition', 'brand' => 'Dell', 'price' => 1899.99, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Dell+XPS', 'description' => 'Layar InfinityEdge 3.5K Touchscreen dengan kekuatan prosesor Intel Core i9.', 'specs' => '32GB RAM | 1TB SSD', 'status' => 'Habis'],
            ['title' => 'Acer Swift Go 14 AI', 'brand' => 'Acer', 'price' => 1199.00, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Acer+Swift', 'description' => 'Laptop tipis bertenaga AI dengan sistem pendingin kipas ganda dan layar OLED warna akurat.', 'specs' => '32GB RAM | Intel Core Ultra 7', 'status' => 'Tersedia'],
            ['title' => 'HP Spectre x360 14', 'brand' => 'HP', 'price' => 1499.50, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=HP+Spectre', 'description' => 'Laptop 2-in-1 premium dengan desain elegan dan baterai tahan seharian penuh.', 'specs' => '16GB RAM | 1TB SSD', 'status' => 'Pre-Order'],
            ['title' => 'MSI Stealth 16 Studio', 'brand' => 'MSI', 'price' => 1750.00, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=MSI+Stealth', 'description' => 'Kombinasi sempurna antara performa gaming dan tampilan profesional untuk studio kreatif.', 'specs' => '32GB RAM | RTX 4070', 'status' => 'Tersedia'],
            ['title' => 'Huawei MateBook X Pro 2024', 'brand' => 'Huawei', 'price' => 1599.00, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Huawei+MateBook', 'description' => 'Bodi magnesium super ringan dengan rasio layar-ke-bodi tertinggi di kelasnya.', 'specs' => '16GB RAM | 1TB NVMe', 'status' => 'Habis'],
            ['title' => 'Razer Blade 15 Advanced', 'brand' => 'Razer', 'price' => 2499.99, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Razer+Blade', 'description' => 'Sasis aluminium CNC dengan performa gaming kelas berat tanpa kompromi.', 'specs' => '32GB RAM | 240Hz QHD', 'status' => 'Tersedia'],
            ['title' => 'Gigabyte AERO 14 OLED', 'brand' => 'Gigabyte', 'price' => 1349.00, 'thumbnail' => 'https://placehold.co/600x400/e2e8f0/0f172a?text=Gigabyte+AERO', 'description' => 'Dikalibrasi khusus dari pabrik untuk akurasi warna mutlak bagi pekerja industri kreatif.', 'specs' => '16GB RAM | RTX 4050', 'status' => 'Tersedia']
        ];

        foreach ($laptops as $laptop) {
            Laptop::updateOrCreate(
                ['title' => $laptop['title']],
                $laptop
            );
        }
    }
}
