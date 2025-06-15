import axios from 'axios';

// Set default headers for axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set CSRF token from meta tag
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.warn('CSRF token not found. Be sure to include <meta name="csrf-token" content="{{ csrf_token() }}"> in your layout.');
}
