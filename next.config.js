/** @type {import('next').NextConfig} */
const 
withPWA = require('next-pwa'),
withTM = require('next-transpile-modules')(['@pusher/push-notifications-web']);
const removeImports = require('next-remove-imports')();

module.exports = withPWA(withTM(removeImports({
  reactStrictMode: true,
  swcMinify: false,
  pwa: {
    dest: 'public',
    register: true,
    sw: 'service-worker.js',
    mode: 'production',
    importScripts:["https://js.pusher.com/beams/service-worker.js"],
    fallbacks: {
    }
  }
})));
