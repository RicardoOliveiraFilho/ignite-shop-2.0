/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      'files.stripe.com'
    ]
  },

  experimental: {
    newNextLinkBehavior: true, // Ainda experimental o lance do 'Link' não precisar do elemento 'a' como filho!
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
