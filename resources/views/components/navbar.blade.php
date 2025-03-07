<nav class="fixed top-0 left-0 right-0 w-full z-50 bg-blue-500 shadow text-white">
  <div class="container mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo / Brand -->
    <div class="text-lg font-bold">
      <a href="{{ route('home') }}">MyProject</a>
    </div>
    <!-- Menu Desktop -->
    <div class="hidden md:flex space-x-4">
      <a href="{{ route('upah.index') }}" class="hover:underline">Upah</a>
      <a href="{{ route('bahan.index') }}" class="hover:underline">Bahan</a>
      <a href="{{ route('alat.index') }}" class="hover:underline">Alat</a>
      <a href="{{ route('ahs.index') }}" class="hover:underline">AHSP</a>
      <a href="{{ route('rab.index') }}" class="hover:underline">RAB</a>
    </div>
    <!-- Hamburger Menu (Mobile) -->
    <div class="md:hidden">
      <button id="navbarToggle" class="focus:outline-none">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
  <!-- Menu Mobile -->
  <div id="mobileMenu" class="hidden md:hidden px-4 pb-4">
    <a href="{{ route('upah.index') }}" class="block py-2 hover:underline">Upah</a>
    <a href="{{ route('bahan.index') }}" class="block py-2 hover:underline">Bahan</a>
    <a href="{{ route('alat.index') }}" class="block py-2 hover:underline">Alat</a>
    <a href="{{ route('ahs.index') }}" class="block py-2 hover:underline">AHSP</a>
    <a href="{{ route('rab.index') }}" class="block py-2 hover:underline">RAB</a>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const toggle = document.getElementById('navbarToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      if (toggle) {
        toggle.addEventListener('click', function () {
          mobileMenu.classList.toggle('hidden');
        });
      }
    });
  </script>
</nav>
