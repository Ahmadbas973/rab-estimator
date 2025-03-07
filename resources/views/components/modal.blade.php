<div id="{{ $id }}" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50">
    <div class="bg-white p-4 rounded shadow-lg w-full max-w-md relative">
        <!-- Tombol Close Modal -->
        <button type="button" onclick="closeModal('{{ $id }}')" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
            &times;
        </button>
        <!-- Judul Modal -->
        <h2 id="{{ $id }}Title" class="text-xl font-bold mb-4">{{ $title }}</h2>
        <!-- Slot konten modal -->
        <div>
            {{ $slot }}
        </div>
    </div>
</div>