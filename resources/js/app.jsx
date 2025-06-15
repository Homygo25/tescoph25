import axios from 'axios';

// Set default headers for axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Try to load the CSRF token from the meta tag
const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.warn('CSRF token not found: Please ensure <meta name="csrf-token" content="{{ csrf_token() }}"> is included in your HTML.');
}
