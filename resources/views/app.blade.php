<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta name="color-scheme" content="light dark">

    <title inertia>{{ config('app.name', 'CVS Pharmacy') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    <link rel="icon" href="/cvs-logo.png" type="image/png">

    <meta property="og:title" content="CVS Pharmacy Members" />
    <meta property="og:description" content="Welcome to CVS Pharmacy members' portal!" />
    <meta property="og:image" content="https://cvspharmacy-members.com/cvs-logo.png" />
    <meta property="og:url" content="https://cvspharmacy-members.com/" />
    <meta property="og:type" content="website" />
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>