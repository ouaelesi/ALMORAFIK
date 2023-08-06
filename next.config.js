module.exports = {
  reactStrictMode: true,
  env: {
    PORT: 4000,
    MONGO_URI:
      "mongodb+srv://ouaelSahbi:esi123aze123aze@cluster0.swcln.mongodb.net/myFirstDatabase?retryWrites=true&w=majority&ssl=true",
  },
  i18n: {
    locales: ["fr", "arab"],
    defaultLocale: "arab",
    localeDetection: false,
  },
};
