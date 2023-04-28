// webpack.mix.js
// Grabs the package.json file to use our site’s environment/values
const pkg = require("./package.json");

let mix = require('laravel-mix');

const baseUrl = 'https://craft-starter.ddev.site';
const homedir = require('os').homedir();

const moment = require("moment");

// Laravel Mix plugins for additional capabilities
// require("laravel-mix-purgecss");
require("laravel-mix-criticalcss");
require("laravel-mix-banner");

// CSS Plugins
//const tailwindJit = require("@tailwindcss/jit");
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
        tailwindcss,
    ],
    autoprefixer: {
      options: {
          browsers: [
              'last 4 versions',
          ]
      }
    },
    processCssUrls: false,
    hmrOptions: {
      host: baseUrl,
      port: 8080
    },
    devtool: 'eval-cheap-module-source-map'
  })


  // Source maps disabled (temporarily?) to improve build time
  .sourceMaps()

  // combine all our js scripts here
  // when npm run production is run will minimize as well
  .js(
    [
      './node_modules/swiper/swiper-bundle.min.js',
      // Alpine plugins before alpine
      './node_modules/@alpinejs/persist/dist/cdn.min.js',
      './node_modules/@alpinejs/collapse/dist/cdn.min.js',
      './node_modules/@alpinejs/focus/dist/cdn.min.js',
      './node_modules/@alpinejs/intersect/dist/cdn.min.js',

      // Alpine Js
      './node_modules/alpinejs/dist/cdn.min.js',
      // this should go last
      './src/js/app.js'
    ],
    'public/assets/js/scripts.combined.js')

  // combine all our vendor css files here
  .combine(
    [
      './node_modules/plyr/dist/plyr.css',
      './node_modules/swiper/swiper-bundle.min.css'
    ],
    'public/assets/css/vendor.combined.css')

  // for some reason plyr doesn't work when concatenated
  // so we'll copy to assets and add a script tag to
  // layout.html
  .copy('node_modules/plyr/dist/plyr.min.js', 'public/assets/js/plyr.min.js')

  .banner({
    banner: (function () {
        return [
            '/**!',
            ' * @project        Caffeine Creations Website',
            ' * @author         Sean Smith, Caffeine Creations <sean@caffeinecreations.ca>',
            ' * @Copyright      Copyright (c) ' + moment().format("YYYY") + ', Caffeine Creations',
            ' *',
            ' */',
            '',
        ].join('\n');
    })(),
    raw: true,
  })
  .version()


  .browserSync({
    proxy: baseUrl,
    ghostMode: false,
    notify: {
      styles: {
        top: 'auto',
        bottom: '1rem'
      }
    },
    https:true,
    /*
    ? SSL-enabled for DDev. You have to copy the SSL cert to somewhere outside of Docker first. Run this at your project root:
    docker cp ddev-router:/etc/nginx/certs ~/tmp/DOMAIN-WITH-EXTENSION
    (From: https://stackoverflow.com/questions/59730898/cant-connect-browsersync-with-ddev-nginx-server-because-ssl-error):
    */
    https: {
      key: homedir + "/tmp/certs" + "/master.key",
      cert: homedir + "/tmp/certs" + "/master.crt"
    },
    files: ["src/css/*.css","src/js/*.js","templates/*.twig", "templates/**/*.twig", "templates/*.js", "templates/**/*.js"]
  });

mix.disableSuccessNotifications();


// production
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
      }),

    ],
  })

  .criticalCss({
    enabled: mix.inProduction(),
    paths: {
      base: baseUrl,
      templates: './templates/criticalCss/'
    },
    urls: [
      {
        url: '/',
        template: 'index'
      }
    ],
    options: {
      minify: true,
      width: 1300,
      height: 900,
    },
  })

  // copy fonts
  .copyDirectory(pkg.paths.src.fonts, pkg.paths.dist.fonts)

  .version();
}
// end production