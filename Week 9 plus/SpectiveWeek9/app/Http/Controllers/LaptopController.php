<?php

namespace App\Http\Controllers;

use App\Models\Laptop;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class LaptopController extends Controller
{
    /** Tampilkan katalog laptop pada halaman utama. */
    public function index(): View
    {
        $laptops = Laptop::latest()->get();

        return view('home', compact('laptops'));
    }

    /** Tampilkan halaman pengelolaan laptop. */
    public function manage(): View
    {
        $laptops = Laptop::latest()->paginate(10);

        return view('laptops.index', compact('laptops'));
    }

    /** Tampilkan formulir tambah laptop. */
    public function create(): View
    {
        return view('laptops.create');
    }

    /** Simpan laptop baru ke database. */
    public function store(Request $request): RedirectResponse
    {
        Laptop::create($this->validatedData($request));

        return redirect()
            ->route('laptops.manage')
            ->with('success', 'Data laptop berhasil ditambahkan.');
    }

    /** Tampilkan formulir edit laptop. */
    public function edit(Laptop $laptop): View
    {
        return view('laptops.edit', compact('laptop'));
    }

    /** Perbarui data laptop di database. */
    public function update(Request $request, Laptop $laptop): RedirectResponse
    {
        $laptop->update($this->validatedData($request));

        return redirect()
            ->route('laptops.manage')
            ->with('success', 'Data laptop berhasil diperbarui.');
    }

    /** Hapus laptop dari database. */
    public function destroy(Laptop $laptop): RedirectResponse
    {
        $laptop->delete();

        return redirect()
            ->route('laptops.manage')
            ->with('success', 'Data laptop berhasil dihapus.');
    }

    /** Validasi data yang digunakan saat create dan update. */
    private function validatedData(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:100'],
            'price' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'thumbnail' => ['required', 'url', 'max:255'],
            'description' => ['required', 'string', 'max:5000'],
            'specs' => ['required', 'string', 'max:255'],
            'status' => ['required', 'in:Tersedia,Pre-Order,Habis'],
        ], [
            'title.required' => 'Nama laptop wajib diisi.',
            'brand.required' => 'Merek laptop wajib diisi.',
            'price.required' => 'Harga laptop wajib diisi.',
            'price.numeric' => 'Harga harus berupa angka.',
            'thumbnail.required' => 'URL gambar laptop wajib diisi.',
            'thumbnail.url' => 'Masukkan URL gambar yang valid.',
            'description.required' => 'Deskripsi laptop wajib diisi.',
            'specs.required' => 'Spesifikasi laptop wajib diisi.',
            'status.required' => 'Status laptop wajib dipilih.',
            'status.in' => 'Status laptop tidak valid.',
        ]);
    }
}
