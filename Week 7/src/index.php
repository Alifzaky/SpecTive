<?php
// File: index.php (Di root folder utama)

// Memanggil Controller utama
require_once 'controllers/LaptopController.php';

// Menjalankan aplikasi
$app = new LaptopController();
$app->index();
?>