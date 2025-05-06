module.exports = {
  // devServer: {
  //     host: 'localhost',
  //     port: '8080',
  //     public: 'localhost/:8080',
  // },
  transpileDependencies: ["vuetify"],
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
  },
};
