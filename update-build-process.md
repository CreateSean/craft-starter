# Upgrading From Mix to NPM Scripts & TW4

1. Set Node to 20+
2. rename `package.json` and `package.lock` to `package.json.bak` and `package.lock.bak` .
3. use this package.json file: **update name and any scripts needed for site**

```json
{
  "name": "Craft-Starter",
  "version": "2.0.0",
  "description": "Craft Starter Website",
  "author": "Sean Smith, Caffeine Creations <sean@caffeinecreations.ca>",
  "copyright": "",
  "license": "UNLICENSED",
  "private": true,
  "devDependencies": {
    "@babel/preset-env": "^7.15.6",
    "@tailwindcss/aspect-ratio": "^0.4.2",
    "@tailwindcss/forms": "^0.5.3",
    "@tailwindcss/line-clamp": "^0.4.4",
    "@tailwindcss/typography": "^0.5.16",
    "cpy": "^11.1.0",
    "cpy-cli": "^5.0.0",
    "nodemon": "^3.0.2",
    "tailwindcss": "^4.0.7",
    "terser": "^5.39.0"
  },
  "dependencies": {
    "@alpinejs/collapse": "^3.14.1",
    "@alpinejs/focus": "^3.14.1",
    "@alpinejs/intersect": "^3.14.1",
    "@alpinejs/persist": "^3.14.1",
    "alpinejs": "^3.14.1",
    "browser-sync": "^3.0.3",
    "concat": "^1.0.3",
    "npm-run-all": "^4.1.5",
    "plyr": "^3.7.8",
    "swiper": "^11.2.4"
  },
  "browserslist": [
    "> .5% or last 2 versions"
  ],
  "scripts": {
    "copy": "npx cpy-cli ./node_modules/plyr/dist/plyr.min.js ./public/assets/js/ --flat",
    "concat:js": "concat ./node_modules/swiper/swiper-bundle.min.js ./node_modules/@alpinejs/persist/dist/cdn.min.js ./node_modules/@alpinejs/collapse/dist/cdn.min.js ./node_modules/@alpinejs/focus/dist/cdn.min.js ./node_modules/@alpinejs/intersect/dist/cdn.min.js ./node_modules/alpinejs/dist/cdn.min.js src/js/app.js  > ./public/assets/js/app.js && npx terser ./public/assets/js/app.js -o ./public/assets/js/app.min.js",
    "concat:css": "concat ./node_modules/plyr/dist/plyr.css ./node_modules/swiper/swiper-bundle.min.css  > ./public/assets/css/vendor.combined.css",
    "compile:css": "npx @tailwindcss/cli -i ./src/css/app.css -o ./public/assets/css/app.css --watch --minify",
    "watch:manifest": "nodemon --watch public/assets/js --watch public/assets/css -e js,css src/js/generate-manifest.js",
    "serve": "browser-sync start --config browsersync.config.js",
    "build": "npm-run-all copy concat:js concat:css \"watch:css -- --no-watch --minify\" && node src/js/generate-manifest.js",
    "start": "npm-run-all --parallel compile:css watch:manifest copy concat:js concat:css serve"
  }
}
```


1. run `npm install`.
2. delete or rename `/assets/mix-manifest.json` so that it is not picked up anymore.
3. delete or rename `assets/js/*.js` and `assets/css/*.css` so we can confirm the build process is working. At this time, check the `templates/layout.twig`  and remove/comment out any references to alpineJs as Alpine is now part of the build and doesn’t need to call the CDN.
4. Some files may be renamed - update references in layout file to correct **css** and **javascript** files
5. create `browsersync.config.js` and add this, **updating** the `proxy url`:

```json
const homedir = require('os').homedir();

/*
  everything works fine, but https is not working and nothing I do seems to fix it. But since there is no security risk locally I'll work with it until I have time to solve.
*/

module.exports = {
  proxy: 'https://craft-starter.ddev.site',
  host: '0.0.0.0',
  files: [
    './templates/**/*.{html,twig}',
    './src/**/*.{css,js}',
    './public/**/*.{css,js}'
  ],
  // https:true,
  /*
  ? SSL-enabled for DDev. You have to copy the SSL cert to somewhere outside of Docker first. Run this at your project root:
  docker cp ddev-router:/etc/nginx/certs ~/tmp/DOMAIN-WITH-EXTENSION
  (From: https://stackoverflow.com/questions/59730898/cant-connect-browsersync-with-ddev-nginx-server-because-ssl-error):
  */
  https: {
    key: homedir + "/tmp/certs/master.key",
    cert: homedir + "/tmp/certs/master.crt"
  },
  secure: true,
  ui: false,
  open: 'local',
  notify: false,
};
```

1. run `npm run start`. and check the expected files are built.

Assuming all is good, the site is now working with Tailwind 3.x and NPM scripts. Make a commit, grab a snack, and proceed to the next step.

## Tailwind 4

1. DDEV, add this to `config.yaml` to get the upgrade tool to work: `webimage_extra_packages: [build-essential]`
2. run `ddev restart`.
3. Remove or comment out `content` and `safelist` keys from `tailwind.config.js` (it stops the migration tool from working)
4. Remove  or comment out `plugins: [require('@tailwindcss/typography)],` from `tailwind.config.js` - it stops the upgrade tool from working (it should still add `@plugin '@tailwindcss/typography';` to `app.css` afterwards though)
5. remove   `"tailwind-config-viewer": "^1.7.2",` and `"@tailwindcss/container-queries": "^0.1.1",` from package.json
6.  Commit changes (the upgrade tool requires a clean repository)
7. run `ddev exec npx @tailwindcss/upgrade@next`  may need to add the `--force` flag
8. run `npm install`.
9. Add `@source '../../';` to `app.css` so it picks up on classes used in template files
10. add     `"nodemon": "^3.0.2"`, to `package.json` .
11. run `npm install`.
12. Replace the scripts section with the following and adjust as needed in the concat scripts for js or css specific to this project

```json
  "scripts": {
    "copy": "npx cpy-cli ./node_modules/plyr/dist/plyr.min.js ./public/assets/js/ --flat",
    "concat:js": "concat ./node_modules/swiper/swiper-bundle.min.js ./node_modules/@alpinejs/persist/dist/cdn.min.js ./node_modules/@alpinejs/collapse/dist/cdn.min.js ./node_modules/@alpinejs/focus/dist/cdn.min.js ./node_modules/@alpinejs/intersect/dist/cdn.min.js ./node_modules/alpinejs/dist/cdn.min.js src/js/app.js  > ./public/assets/js/app.js",
    "concat:css": "concat ./node_modules/plyr/dist/plyr.css ./node_modules/swiper/swiper-bundle.min.css  > ./public/assets/css/vendor.combined.css",
    "watch:css": "npx @tailwindcss/cli -i ./src/css/app.css -o ./public/assets/css/app.css --watch",
    "watch:manifest": "nodemon --watch public/assets/js --watch public/assets/css -e js,css src/js/generate-manifest.js",
    "serve": "browser-sync start --config browsersync.config.js --https",
    "build": "npm-run-all copy concat:js concat:css \"watch:css -- --no-watch\" && node src/js/generate-manifest.js",
    "start": "npm-run-all --parallel watch:css watch:manifest copy concat:js concat:css serve"
  }
```

13. add this javascript file to `/src/js/generate-manifest.js`.

```jsx
// src/js/generate-manifest.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function generateHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex').slice(0, 8);
}

function generateManifest() {
  const publicDir = path.join(__dirname, '../../public/assets');
  const manifest = {};

  // Process JS files
  const jsFiles = fs.readdirSync(path.join(publicDir, 'js'))
    .filter(file => file.endsWith('.js'));

  jsFiles.forEach(file => {
    const filePath = path.join(publicDir, 'js', file);
    const hash = generateHash(filePath);
    manifest[`js/${file}`] = `js/${file}?v=${hash}`;
  });

  // Process CSS files
  const cssFiles = fs.readdirSync(path.join(publicDir, 'css'))
    .filter(file => file.endsWith('.css'));

  cssFiles.forEach(file => {
    const filePath = path.join(publicDir, 'css', file);
    const hash = generateHash(filePath);
    manifest[`css/${file}`] = `css/${file}?v=${hash}`;
  });

  // Write manifest file
  fs.writeFileSync(
    path.join(publicDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
}

generateManifest();
```

14. Add this `@plugin "@tailwindcss/typography";`  and other plugins from the original `tailwind.config.js` to the top of the CSS file below any `@source` .
15. add the following to the top of the css to get dark mode to continue to work:

```css
/* https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually */
@custom-variant dark (&:where(.dark, .dark *));
```
16. If there are errors in tailwind migrate colors, fonts etc to css file and out of tailwind.config.js into the theme option like this:

```css
@theme {
  /* fonts */
  --font-default: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif';

  /* colors */
  --color-grayBrand: #373F41;
  --color-gray-light: #DADADA;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-transparent: transparent;
  --color-current:currentColor;
}
```

17. open `config/assetrev.php` and update line 27 to this:  `'manifestPath' => 'public/assets/manifest.json',`.
17. run `npm run start`.
18. **Note** some buttons may need to have the `cursor-pointer` class added.
19. Note about container padding: See [https://tailwindcss.com/docs/upgrade-guide#container-configuration](https://tailwindcss.com/docs/upgrade-guide#container-configuration) look at `tailwind.config.js` theme container key and replicate in `src/app.css` like this:

```css
/* center container and add padding. */
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
}
```

21. Any components in your `src/app.css` file may need to be moved into `@layer components { insert classes here }` in order for template overrides to work. Like this:

```css
@layer components {
  .btn {
    @apply inline-block px-6 py-1 text-white transition duration-200 bg-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-gray-700;
  }
  .btn-green {
    @apply px-12 py-4 bg-greenBrand-dark hover:bg-purpleBrand font-medium tracking-[1px] uppercase text-white hover:text-gray-100 inline-flex flex-row relative;
  }
```

22. **Double check**  for any CSS that gets removed such as and re-add to the `@layer components block`.

```css
h1, h2, h3, h4, h5, h6, .h4, .h5 {
	@apply leading-tight font-archivo;
}
```

23. if the Skip to main content accessibility button is visible on the front end, open src/app.css and move the block starting `@utility skip-main { more code here }`. into `@layer components { more styles here}` and remove `@utlity`.
24. Typography plugin customizations requires the tailwind.config.js file to not be commented out.