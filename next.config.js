

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  env: {
    PORT: 4000,
    GOOGLE_CLIENT_ID: "972332900134-338eeichg29hk6bbh4gckdevf7hsme2n.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    NEXTAUTH_SECRET: "secret",
    MONGO_URI:
      "mongodb+srv://ilyes:49f7c5a1@cluster0.9uivabz.mongodb.net/ALMORAFIK?retryWrites=true&w=majority&appName=Cluster0",
  },
  i18n: {
    locales: ["fr", "arab"],
    defaultLocale: "arab",
    localeDetection: false,
  },
});
