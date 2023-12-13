const path = require("path");

module.exports = {
  // Vaše postojeće webpack postavke ovdje...

  resolve: {
    fallback: {
      fs: false,
      dns: false,
      net: false,
      crypto: require.resolve("crypto-browserify"), // Dodajte 'crypto' polyfill
      tls: false, // Dodajte 'tls' polyfill
      path: require.resolve("path-browserify"), // Dodajte 'path' polyfill
      stream: require.resolve("stream-browserify"), // Dodajte 'stream' polyfill
      buffer: require.resolve("buffer/"), // Dodajte 'buffer' polyfill
    },
  },
};
