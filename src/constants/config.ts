// @ts-ignore
import WooCommerceAPI from 'react-native-woocommerce-api';

export const WooCommerce = new WooCommerceAPI({
    url: 'https://siapmart.in', // Your store URL
    ssl: true,
    consumerKey: 'ck_274fc3c3d20eb91d5c0199aaea34395f8d088972', // Your consumer secret
    consumerSecret: 'cs_b4467728f0f4fae8a9796f6c1103f3ddeb96aedc', // Your consumer secret
    wpAPI: true, // Enable the WP REST API integration
    version: 'wc/v3', // WooCommerce WP REST API version
    queryStringAuth: true
});

export const paypalConfig = {
    clientID: 'ASeBJ9bCrvohepuH5VenGv8tjqi_5auLrIZg40-vaOrfPsYjD_93cGzdxaXwS-IKz1gjIjl9xyEfE6W3',
    secret: 'EPTjLlM-KgVxRs0jw8IhGq5u9yNT4J5VvJjHwBS7d9vEWCM6vx0kRq2zo76w91IpzLbBnw0PWNWt92Ca'
}

export const URL = 'https://siapmart.in/api';
export const logoURL = 'https://siapmart.in/wp-content/uploads/2020/05/logo_sia.png';
export const paypal = 'https://api.sandbox.paypal.com';
