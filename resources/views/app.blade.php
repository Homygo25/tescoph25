<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Inertia & Vite -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead

    <!-- Favicon -->
    <link rel="icon" href="/t_logo.jpg" type="image/jpg">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Tescoph Members" />
    <meta property="og:description" content="Welcome to our members' portal!" />
    <meta property="og:image" content="https://tescoph-members.com/build/assets/1-Dvuo1aMT.jpg" />
    <meta property="og:url" content="https://tescoph-members.com/" />
    <meta property="og:type" content="website" />
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
