<?php
// File: models/Laptop.php

class Laptop implements JsonSerializable {    
    private $id;
    private $title;
    private $brand;
    private $price;
    
    private $thumbnail;
    private $description;
    private $specs;
    private $status;

    public function __construct($id, $title, $brand, $price, $thumbnail, $description, $specs, $status) {
        $this->id = $id;
        $this->title = $title;
        $this->brand = $brand;
        $this->price = $price;
        $this->thumbnail = $thumbnail;
        $this->description = $description;
        $this->specs = $specs;
        $this->status = $status;
    }

    public function getId() { return $this->id; }
    public function getTitle() { return $this->title; }
    public function getBrand() { return $this->brand; }
    public function getPrice() { return $this->price; }
    public function getThumbnail() { return $this->thumbnail; }
    public function getDescription() { return $this->description; }
    public function getSpecs() { return $this->specs; }
    public function getStatus() { return $this->status; }

    public function getFormattedPrice() {
        return "$" . number_format($this->price, 2, '.', ',');
    }

    #[\ReturnTypeWillChange]
    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'brand' => $this->brand,
            'price' => $this->price,
            'thumbnail' => $this->thumbnail,
            'description' => $this->description,
            'specs' => $this->specs,
            'status' => $this->status
        ];
    }
}
?>