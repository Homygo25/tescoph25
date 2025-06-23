# Development Setup

This project is a Laravel application with a React frontend built using Vite. To run it locally and troubleshoot issues such as a 500 error, install PHP, Composer and Node dependencies, and run the development server.

## Requirements

- PHP 8.2 or later
- Composer
- Node.js and npm
- SQLite (for running the test suite)

## Installation

1. Install PHP and common extensions:
   ```bash
   sudo apt-get update -y
   sudo apt-get install -y php php-cli php-fpm php-mysql php-xml php-mbstring php-curl php-zip php-gd sqlite3 php8.3-sqlite3
   ```

2. Install Composer:
   ```bash
   sudo apt-get install -y composer
   ```

3. Install project dependencies:
   ```bash
   composer install
   npm install
   ```

4. Copy the example environment file and generate an application key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. Create a SQLite database for local development:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

6. Start the development server:
   ```bash
   php artisan serve
   ```
   Visit `http://localhost:8000` in your browser.

## Troubleshooting 500 Errors

A 500 error typically means the application encountered an exception. Check the log files in `storage/logs/laravel.log` for details. Make sure your environment variables are correct in `.env` and that the database has been migrated. Running `php artisan migrate` will ensure required tables exist.

To run the automated tests locally, use:
```bash
./vendor/bin/pest
```
The tests require the SQLite extension. If you see `could not find driver`, ensure `php-sqlite3` is installed.

