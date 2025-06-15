#!/bin/bash

# 1. Update system packages
sudo apt-get update

# 2. Install PHP and required extensions
sudo apt-get install -y php php-cli php-mbstring php-xml php-sqlite3 unzip curl

# 3. Install Composer (if not already installed)
if ! [ -x "$(command -v composer)" ]; then
  curl -sS https://getcomposer.org/installer | php
  sudo mv composer.phar /usr/local/bin/composer
fi

# 4. Install PHP dependencies
composer install

# 5. Install Node.js and npm
sudo apt-get install -y nodejs npm

# 6. Install Node dependencies
npm install

# 7. Generate app key (if not yet generated)
php artisan key:generate

# 8. Create SQLite DB file if it doesn't exist
mkdir -p database
touch database/database.sqlite

# 9. Update .env to use SQLite (safe replace)
sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=sqlite/' .env
sed -i 's|^DB_DATABASE=.*|DB_DATABASE=database/database.sqlite|' .env

# 10. Run migrations and seeders
php artisan migrate:fresh --seed

# 11. Run tests
php artisan test
