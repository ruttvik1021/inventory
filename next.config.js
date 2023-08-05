/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  // Enable CSS modules for global styles
  cssModules: true,
  // Add your Tailwind CSS configuration as a postcss plugin
  postcss: {
    plugins: [require("tailwindcss")],
  },
  images: {
    domains: ["logopond.com"],
  },
};
