@php($editing = isset($laptop))
<form action="{{ $action }}" method="POST" class="bg-white dark:bg-[#161e2e] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-8 shadow-sm space-y-6">
    @csrf
    @if ($method !== 'POST') @method($method) @endif

    @if ($errors->any())
        <div class="rounded-xl border border-red-500 bg-red-50 text-white dark:border-slate-800 dark:bg-slate-900 dark:text-red-400 p-4 text-sm">
            <p class="font-bold mb-2">Periksa kembali data yang kamu masukkan:</p>
            <ul class="  space-y-1">@foreach ($errors->all() as $error)<li>{{ $error }}</li>@endforeach</ul>
        </div>
    @endif

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="col-span-full">
            <label for="title" class="block text-sm font-semibold mb-2">Nama Laptop <span class="text-red-500">*</span></label>
            <input id="title" name="title" type="text" required maxlength="255" value="{{ old('title', $laptop->title ?? '') }}" placeholder="Contoh: ASUS ROG Zephyrus G16" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
        </div>
        <div>
            <label for="brand" class="block text-sm font-semibold mb-2">Merek <span class="text-red-500">*</span></label>
            <input id="brand" name="brand" type="text" required maxlength="100" value="{{ old('brand', $laptop->brand ?? '') }}" placeholder="Contoh: ASUS" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
        </div>
        <div>
            <label for="price" class="block text-sm font-semibold mb-2">Harga (USD) <span class="text-red-500">*</span></label>
            <input id="price" name="price" type="number" required min="0" max="99999999.99" step="0.01" value="{{ old('price', $laptop->price ?? '') }}" placeholder="Contoh: 1299.99" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
        </div>
        <div class="col-span-full">
            <label for="thumbnail" class="block text-sm font-semibold mb-2">URL Gambar Laptop <span class="text-red-500">*</span></label>
            <input id="thumbnail" name="thumbnail" type="url" required maxlength="255" value="{{ old('thumbnail', $laptop->thumbnail ?? '') }}" placeholder="https://example.com/gambar-laptop.jpg" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
            <p class="text-xs text-slate-500 mt-1">Gunakan URL gambar yang dapat diakses publik.</p>
            <div class="mt-1 hidden" id="image-preview-wrap"><img id="image-preview" alt="Preview laptop" class="w-20 h-32 object-contain rounded-xl bg-slate-100 dark:bg-slate-900 p-2 border border-slate-200 dark:border-slate-700"></div>
        </div>
        <div class="col-span-full">
            <label for="specs" class="block text-sm font-semibold mb-2">Spesifikasi Singkat <span class="text-red-500">*</span></label>
            <input id="specs" name="specs" type="text" required maxlength="255" value="{{ old('specs', $laptop->specs ?? '') }}" placeholder="Contoh: 16GB RAM | 1TB SSD | RTX 4060" class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
        </div>
        <div class="col-span-full">
            <label for="description" class="block text-sm font-semibold mb-2">Deskripsi <span class="text-red-500">*</span></label>
            <textarea id="description" name="description" rows="4" required maxlength="5000" placeholder="Jelaskan keunggulan dan penggunaan laptop..." class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">{{ old('description', $laptop->description ?? '') }}</textarea>
        </div>
        <div>
            <label for="status" class="block text-sm font-semibold mb-2">Status <span class="text-red-500">*</span></label>
            <select id="status" name="status" required class="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:outline-none focus:border-sky-500">
                @foreach (['Tersedia', 'Pre-Order', 'Habis'] as $status)
                    <option value="{{ $status }}" @selected(old('status', $laptop->status ?? 'Tersedia') === $status)>{{ $status }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <a href="{{ route('laptops.manage') }}" class="inline-flex justify-center px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-semibold bg-slate-100 dark:bg-slate-900">Batal</a>
        <button type="submit" class="inline-flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold"><i class="fa-solid fa-floppy-disk"></i>{{ $buttonText }}</button>
    </div>
</form>
<script>
    const thumbnailInput = document.getElementById('thumbnail');
    const previewWrap = document.getElementById('image-preview-wrap');
    const previewImage = document.getElementById('image-preview');
    function updateImagePreview() {
        const url = thumbnailInput.value.trim();
        if (!url) { previewWrap.classList.add('hidden'); return; }
        previewImage.src = url;
        previewImage.onerror = () => previewWrap.classList.add('hidden');
        previewImage.onload = () => previewWrap.classList.remove('hidden');
    }
    thumbnailInput.addEventListener('input', updateImagePreview);
    updateImagePreview();
</script>
