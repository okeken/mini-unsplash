//vue.config.js
module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/_shared.scss"; `,
      },
    },
  },
};
