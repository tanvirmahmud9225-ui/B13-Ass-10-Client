const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
  },

  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
