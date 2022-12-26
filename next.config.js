/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa"),
  withTM = require("next-transpile-modules")([
    "@pusher/push-notifications-web",
  ]);
const removeImports = require("next-remove-imports")();
const runtimeCaching = require("next-pwa/cache");
runtimeCaching[0].handler = "StaleWhileRevalidate";

module.exports = withPWA(
  withTM(
    removeImports({
      reactStrictMode: true,
      swcMinify: false,
      images: {
        domains: [`${process.env.S3_BUCKET}.${process.env.S3_DOMAIN}`],
      },
      pwa: {
        dest: "public",
        register: true,
        sw: "service-worker.js",
        mode: "production",
        importScripts: ["https://js.pusher.com/beams/service-worker.js"],
        fallbacks: {},
      },
    })
  )
);
