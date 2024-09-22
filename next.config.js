

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PORT: 4000,
    MONGO_URI:
      "mongodb+srv://ilyes:49f7c5a1@cluster0.9uivabz.mongodb.net/ALMORAFIK?retryWrites=true&w=majority&appName=Cluster0",
  },
  i18n: {
    locales: ["fr", "arab"],
    defaultLocale: "arab",
    localeDetection: false,
  },
});
