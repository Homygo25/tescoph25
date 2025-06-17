# Project Setup

This project is a Laravel + React starter kit. Below are basic instructions to get the application running for local development.

## Requirements
- **PHP** 8.2 or newer
- **Composer**
- **Node.js** and **npm** (Node 18+ recommended)

## Installation
1. **Clone the repository** and change into the project directory.
2. **Install PHP dependencies**
   ```bash
   composer install
   ```
3. **Install Node dependencies**
   ```bash
   npm install
   ```
4. **Create environment file**
   Copy `.env.example` to `.env` and adjust values if necessary.
   ```bash
   cp .env.example .env
   ```
5. **Generate application key**
   ```bash
   php artisan key:generate
   ```
6. **Create the SQLite database** (or configure another driver in `.env`)
   ```bash
   touch database/database.sqlite
   ```
7. **Run database migrations**
   ```bash
   php artisan migrate
   ```

## Running the Development Servers
You can start the backend and frontend together using:
```bash
composer dev
```
This command serves the Laravel application, starts a queue worker, and runs Vite in dev mode. Alternatively, you may run the pieces manually:
```bash
php artisan serve    # starts the PHP server
npm run dev          # starts Vite
```

With the servers running, visit `http://localhost:8000` in your browser.

