# Craft CMS Starter Project

This is an opinionated Craft CMS starter project using DDev for local development, Tailwind CSS, Alpine Js, and Laravel Mix.

to install this package run `composer create-project createsean/craft-starter .`

---

  * [Local Development](#local-development)
  * [To Do](#to-do)
  * [Build Process](#build-process)
    + [Production](#production)
  * [Tailwind](#tailwind)
  * [Craft Plugins](#craft-plugins)
  * [Templates](#templates)
  * [Redactor](#redactor)
  * [Image Toolbox](#image-toolbox)
  * [Image Optimize Plugin](#image-optimize-plugin)
  * [Typogrify](#typogrify)
  * [Sprig](#sprig)
  * [MatrixMate](#matrixmate)
  * [composer nuke](#composer-nuke)

---

## Local Development

Set up your local development, if you are using DDev for local development then everything should just work for you. If you are **NOT** using DDEV for local development skip this part and set up local development however you normally do (Valet, Mamp, etc), be sure to import the seed database `db.sql.gz`

1. open .ddev/config.yaml and update line 15 to use the port you want. Must be unique to all ddev sites on your local computer
2. open .ddev/config.yaml and update php version (line 4) and mysql_version (line 11) if needed
3. update dotenv variables, especially SITE_NAME, PRIMARY_SITE_URL, SITE_PATH, ASSET_BASE_URL and fill in the missing details
4. Run `ddev start` and the site should start up.
5. run `ddev import-db --src=db.sql.gz` this will import the seeder database with settings, channels, etc.
6. run `php craft setup/security-key`
7. run `php craft setup/app-id`
8. run `ddev launch access` will open the Craft CP
9. To access the db from your host machine run `ddev describe` and you'll get the connection details needed

Login: `cc_admin`
Password: `letmein`

10. after logging in be sure to **update your password**

## To Do
-   [ ] Set up site search.
-   [ ] Move AlpineJs and plugins from CDN to compiled build process.
-   [ ] Add content builder with common content types.
-   [ ] Get news categories working using sprig.
-   [x] Add news listing with sprig pagination.
-   [x] Add notice bar option.
-   [x] Add installation instructions.

## Build Process

Tailwind is compiled using [Tailwind-jit](https://github.com/tailwindlabs/tailwindcss-jit) which is much faster than previously. it also ensures a small file size during `watch` builds. However I still recommend running the [production](#production) task before deployment.

Images and svg files should be copied to src/img and src/img/svg. When running `npm run production` these will then be optimized and copied to /public/assets/images and /public/assets/images/svg respectively (if you don't want to run production, copy files to both locations)

You will need [NodeJS](https://nodejs.org/en/) version 14+. YOu can either update to 14+ or if you need multiple versions of node install the Node Version Manager [Windows](https://github.com/nvm-sh/nvm) / [Mac](https://github.com/coreybutle/nvm-windows).

1. run `npm install` or `npm i`

Add any scripts or css you need by running `npm install <package-name> --save-dev`
You can then have the required javascript or css files combined and minimized by adding paths to the correct files in `webpack.mix.js` on line 64-70(js) or line 74-78(css). when you run `npx mix watch` everything will be combined and output to `/public/assets/js` or `public/assets/css`

2. update the banner text that gets prepended to css on lines 75-85 of `webpack.mix.js` with your project info
3. in `webpack.mix.js` update line 12  `const baseUrl = 'https://craft-starter.ddev.site'` with your local domain

```javascript
  .banner({
    banner: (function () {
        return [
            '/**!',
            ' * @project        Craft Starter Website',
            ' * @author         Sean Smith, Caffeine Creations',
            ' * @Copyright      Copyright (c) ' + moment().format("YYYY") + ', Caffeine Creations',
            ' *',
            ' */',
            '',
        ].join('\n');
    })(),
    raw: true,
  })
```

4. run `npx mix watch` to have laravel mix compile tailwind, set up browser sync. and combine scripts.
5. Tailwind Config Viewer is set up and uses the following commands. `npm run tw-config-viewer` will load up the viewer at localhost:4000 and `npm run export-tw-config` will export the viewer to `public/tw-viewer`

### Production

when you are ready to deploy your code run `npx mix -p` to optimize images in `/src/img/` optimized images will be output in `/public/assets/images`

this will also run the critical css task which you can configure at line 143 by adding in an array of urls and templates

```javascript
  urls: [{
      url: '',
      template: 'home'
    },
    {
      url: 'contact',
      template: 'singles/contact'
    },
  ],

```

---

## Tailwind

There is an empty tailwind.config.js file at the root of the repository. Add config settings as necessary but I do have some conventions that I use on all projects

For colors use `colornameBrand` where colorname is `red`, `blue`, or whatever the color is. and for font family use the name of the font. Below you can seen an example taken from another project in the extend key.


```javascript
colors: {
  redBrand: {
    light: '#fce9e8',
    default: '#de242b',
    dark: '#990e3d',
  },
  grayBrand: {
    light: '#f2f2f2',
    default: '#637a84',
  },
  textBrand: {
    light:'#334960',
    default: '#3a4250',
  },
  blackBrand: '#041e26',
},
fontFamily: {
  karla: ['Karla', 'sans-serif'],
  montserrat: ['Montserrat', 'serif'],
},
```


## Craft Plugins

The following plugins are installed and ready to be used on the site. I prefer to keep plugin usage to a **minimum** so do **not** install a plugin unless absolutely necessary. If it can be done natively, it should be done natively.

1. Environment Label - adds a color bar across the control panel indicating current environment
2. Image Toolbox - image transforms, webp support, and more
3. Minify - minifies html/css/js on production
4. Redactor - Rich Text Editor
5. Retcon - extra twig filters
6. SEOmatic - used for all SEO.
7. Template Comments - adds template comments in local dev to make finding templates easy
8. Typed Link Field - used for buttons and other linkks
9. User Manual - in CP user manual
10. Knock Knock - password protect staging site (pass: **letmein**)
11. MatrixMate
12. Typogrify
13. Sprig - Reactive components


## Templates

Create the static templates in templates/static and then link to each template in the index.twig file.

* You can see an example template set up already.
* add any partials to the templates/_includes

## Redactor

Redactor has the [link-attribute plugin installed](https://github.com/simplicate-web/redactor-link-attr) Adding/editing data attribute options is a 2 step process.

1. go to `modules/sitemodule/src/SiteModule.php` line 118 and edit or add another line like this `$def->addAttribute('a', 'data-track', 'Text');`
2. go to `config/redator/site.json` and edit or copy/paste line 20.

## Image Toolbox

**Responsive picture elements with Image Toolbox**

Read the full documentation for [Image Toolbox](https://github.com/craft-snippets/Craft-image-toolbox). Image Toolbox uses a fallback from a placeholder image service. This image can be customized in `/config/image-toolbox.php`.


To use with an image that won't have multiple sizes at different breakpoints use this code:

```twig
{% set image = entry.imageField.one() %}
{% set thumb = {
    mode: 'crop',
    width: 120,
    height: 120,
    quality: 75,
    position: 'center, center',
} %}
{% set attributes = {
  class: [
      'add classes here',
  ],
  loading:'lazy',
  alt: image.altText ?? image.title,
} %}
{{craft.images.picture(image, thumb, attributes) }}
```

For a responsive image with multiple sizes applied at different breakpoints use this code where you can add as many breakpoints as needed:

```
{% set transforms = {
  '(max-width: 767px)': {
    width: 576,
    height:225,
    mode: 'crop',
    quality: 80,
  },
  '(max-width: 1199px)': {
    width: 960,
    height:375,
    mode: 'crop',
    quality: 80,
  },
  '(min-width: 1200px)': {
    width: 1370,
    height:530,
    mode: 'crop',
    quality: 80,
  },
} %}
{% set attributes = {
    class: [
        '',
    ],
    loading:'lazy',
    alt: image.altText ?? image.title,
} %}
{{ craft.images.pictureMedia(image, transforms, null, attributes) }}
```
## Image Optimize Plugin

The Image Optimize plugin is not officially part of this repo, but if you are using it, see this github issue, [Config for ImageOptimize Plugin](https://github.com/CreateSean/craft-starter/issues/2) for instructions on getting it to work correctly.

## Typogrify

See the [typogrify docs](https://nystudio107.com/docs/typogrify/) for advanced usage. For basic use add the typography fitler to your redactor fields like this

```{{ entry.copy|typogrify }}```

## Sprig

Sprig adds reactive components. See the [documentation](https://putyourlightson.com/plugins/sprig) and/or my article on [Reactive Pagination With Sprig](https://caffeinecreations.ca/blog/reactive-pagination-with-sprig-and-craft/) for examples.

## MatrixMate

MatrixMate enables you to improve the Matrix authoring experience by sorting block types into groups and block type fields into tabs. See the [documentation](https://github.com/vaersaagod/matrixmate/blob/master/README.md) for full options and feautures.

There is a default config file in `config/matrixmate.php` that is not currently attached to any matrix fields.

## composer nuke

If you ever need to remove the vender folder and basically reset all things composer run this command

```composer nuke```

This will delete the vendor folder, composer.lock, clear composers cache, and then run composer update. YOu can find the full command in the scripts section of composer.json