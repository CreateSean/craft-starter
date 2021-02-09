/*
// copied and modified from
// https://github.com/CityofOakland/oaklandca.gov
*/

// Grabs the package.json file to use our site’s environment/values
var pkg = require("./package.json");

const mix = require("laravel-mix");

// Laravel Mix plugins for additional capabilities
// require("laravel-mix-purgecss");
require("laravel-mix-criticalcss");
require("laravel-mix-banner");

// CSS Plugins
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const presetenv = require("postcss-preset-env");
const hexrgba = require('postcss-hexrgba');

// Image plugins for compression from src folder
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");

mix.setPublicPath('./public/assets/')
  .postCss(pkg.paths.src.css + "app.css", "css")
  .options({
    postCss: [
      tailwindcss(),
      autoprefixer({
        cascade: false
      }),
      presetenv({
        stage: 0
      }),
      hexrgba
    ],
    processCssUrls: false,
    hmrOptions: {
      host: 'https://craft-starter.ddev.site',
      port: 8080
    },
    devtool: 'eval-cheap-module-source-map'
  })

 // place scripts here to be transpiled to ES2015
/*
  .js(pkg.paths.src.js + "app.js", "js")
  .js(pkg.paths.src.js + "algoliafilter.js", "js")
  .js(pkg.paths.src.js + "search.js", "js")
  .js(pkg.paths.src.js + "lightgallery.js", "js")
*/
  // Source maps disabled (temporarily?) to improve build time
  //.sourceMaps()

  // copy js file
  // don't need this now that we're combining files further down
  // .copy("./node_modules/lightpick/lightpick.js", "public/assets/js")

  // combine all our js scripts here
  // when npm run production is run will minimize as well
  .combine(
      [
      // './node_modules/flickity/dist/flickity.pkgd.min.js',
      // './node_modules/swiper/swiper-bundle.min.js',
      // this should go last
      './src/js/app.js'
      ],
      'public/assets/js/scripts.combined.js')

  // combine all our vendor css files here
  .combine(
    [
      // './node_modules/flickity/dist/flickity.min.css',
      // './node_modules/swiper/swiper-bundle.min.css'
    ],
    'public/assets/css/vendor.combined.css')

  .browserSync({
    proxy: "https://craft-starter.ddev.site",
    ghostMode: false,
    notify: {
      styles: {
        top: 'auto',
        bottom: '1rem'
      }
    },
    files: ["src/css/*.css","templates/*.twig", "templates/**/*.twig", "templates/*.js", "templates/**/*.js"]
  });

mix.disableSuccessNotifications();



if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      //Compress images
      new CopyWebpackPlugin([{
        from: "./src/img",
        to: "./images",
      }]),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
          quality: "65-80"
        },
        plugins: [
          imageminMozjpeg({
            quality: 65,
            //Set the maximum memory to use in kbytes
            maxMemory: 1000 * 2048
          })
        ]
      })
    ],
  })
  .criticalCss({
    enabled: mix.inProduction(),
    paths: {
      base: 'https://craft-starter.ddev.site',
      templates: './templates/criticalCss/'
    },
    urls: [{
        url: '',
        template: 'home'
      }
    ],
    options: {
      minify: true,
      width: 1300,
      height: 900,
    },
  })
  .copyDirectory(pkg.paths.src.fonts, pkg.paths.dist.fonts)
  .version();
}