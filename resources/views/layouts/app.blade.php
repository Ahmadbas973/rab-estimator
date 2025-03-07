<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Estimator App</title>
    <!-- Tailwind CSS -->
    @vite('resources/css/app.css')

    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{ asset('css/all.min.css') }}">
</head>
<body class="bg-gray-100 antialiased pt-16">
  <x-navbar />
  <main id="app">
    @yield('content')
  </main>
  @vite(['resources/js/app.js'])
  @yield('scripts')
</body>
</html>
