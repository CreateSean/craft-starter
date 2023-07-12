# Craft CMS Starter Project

This is an opinionated Craft CMS starter project using DDev for local development, Tailwind CSS, Alpine Js, and Laravel Mix.

### Install Craft 4 version
to install this package run `composer create-project createsean/craft-starter .`

### Install Craft 3 version
To install with Craft 3 version run `composer create-project createsean/craft-starter . --prefer-dist 1.14.0`

---

## Table of Contents

  * [Local Development](#local-development)
  * [To Do](#to-do)
  * [Build Process](#build-process)
  * [Tailwind](#tailwind)
  * [Accessibility](#accessibility)
  * [Dark Mode](#dark-mode)
  * [Fragments](#fragments)
  * [Floated Labels](#floated-labels)
  * [Picture Element](#picture-elements)
  * [Craft Plugins](#craft-plugins)
  * [Redactor](#redactor)
  * [Image Toolbox](#image-toolbox)
  * [Typogrify](#typogrify)
  * [Sprig](#sprig)
  * [contact Form](#contact-form)
  * [MatrixMate](#matrixmate)
  * [Style Guide](#styleguide)
  * [Content](#content)
  * [Composer nuke](#composer-nuke)

---

## Local Development

Set up your local development, if you are using DDev for local development then everything should just work for you. If you are **NOT** using DDEV for local development skip this part and set up local development however you normally do (Valet, Mamp, etc), be sure to import the seed database `db.sql.gz`

1. open .ddev/config.yaml and update line 15 to use the port you want. Must be unique to all ddev sites on your local computer
2. open .ddev/config.yaml and update php version (line 4) and mysql_version (line 11) if needed
3. update dotenv variables, especially SITE_NAME_EN, SITE_NAME_FR, PRIMARY_SITE_URL, SITE_PATH, ASSET_BASE_URL
4. update email settings of dotenv for staging/production. Current settings work with mailhog in ddev. To open mailhog run `ddev launch -m`
5. Run `ddev start` and the site should start up.
6. run `ddev import-db --src=db.sql.gz` this will import the seeder database with settings, channels, etc.
7. run `php craft setup/security-key`
8. run `php craft setup/app-id`
9. run `ddev launch access` will open the Craft CP
10. To access the db from your host machine run `ddev describe` and you'll get the connection details needed

Login: `cc_admin`
Password: `letmein`

10. after logging in be sure to **update your password**

## To Do
-   [ ] Ensure accessibility passes with default templates - aria labels, alt text etc.
-   [x] Set up site search.
-   [x] Contact Form.
-   [ ] Move AlpineJs and plugins from CDN to compiled build process.
-   [X] Add content builder with common content types.
-   [X] Contact page
-   [ ] About/Team page
-   [x] Add hero with different options i.e. slider, no slider, no image just title.
-   [x] Get news categories working using sprig.
-   [ ] Add news _entry template.
-   [x] Add news listing with sprig pagination.
-   [x] Add notice bar option.
-   [x] Add 404 template.
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
    1. To get your SSL working with browsersync and DDEV follow these instructions
    * SSL-enabled for DDev. You have to copy the SSL cert to somewhere outside of Docker first. Run this at your project root [Stack Overflow](https://stackoverflow.com/questions/59730898/cant-connect-browsersync-with-ddev-nginx-server-because-ssl-error):

    ```
    docker cp ddev-router:/etc/nginx/certs ~/tmp/certs
    ```
    2. you may need to create the tmp/certs directory in your OS users directory
    3. You should only need to do this for 1 project and then everything should work on multiple projects.

5. Tailwind Config Viewer is set up and uses the following commands. `npm run tw-config-viewer` will load up the viewer at localhost:4000 and `npm run export-tw-config` will export the viewer to `public/tw-viewer`

6. Tailwind Container Queries plugin is installed. See the (documentation)[https://github.com/tailwindlabs/tailwindcss-container-queries]

Add a `@container` class to the a parent div and then use prefixes to target the container size like this `@lg:bg-pink-400`. Matrix blocks by default have a `@container` so it is easy to use containers out of the box.

```html
<div class="@container">
  <div class="@lg:bg-pink-400">
    This div will have a pink background when the container is larger than 32rem.
  </div>
</div>
```

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

## Accessibility

I aim to ensure default templates pass accessibility tests - except for color contrast as that will need to be taken into account during the design phase.

## Dark Mode

Dark mode toggle buttons are built in and are added via an include on line 101 of _includes/dark-mode. If you are not using dark-mode comment out this file. Dark mode has 3 buttons dark, light, & system as per my article on this [Dark Mode with Alpine.js and Tailwind](https://caffeinecreations.ca/blog/dark-mode-with-alpinejs-and-tailwind/)

update styles to use the dark prefix like this.

```html
<div class="bg-gray-100 dark:bg-gray-800">
  <h2 class="text-black dark:text-white">My title goes here</h2>
  <!-- more code -->
</div>
```
## Main Navigation

The main navigation has 2 options: one with dropdowns activated on click and the other activated on hover. On click dropdowns are the preferred methond for usability and accessibilty reasons. However sometimes clients insist on using hover so there is an option for that.

Template defaults to on click dropdowns to change to hover dropdowns comment line 67 and uncomment line 74 of _layout.twig

```twig67
    {#
      // main nav click dropdown this is better user experience
      // and better for accessibility
      // works with tertiary level dropdowns
    #}
    {% include '_includes/main-nav' %}

    {#
      // main nav hover dropdown
      // we use this when client insists on hover dropdowns
      // does NOT work with tertiary dropdowns
    #}
    {# {% include '_includes/main-nav-hover' %} #}
```

## Fragments

Fragments are a section that is intended for creating reusable content. Often you will need a Call To Action that is duplicated around the site. In this section you create that Call to Action and then using the **fragments** block in the content builder pull it in to that entry.

Other uses may include a block with Related Entries, a Slideshow, or photo gallery that gets featured around the site.

There is one Fragment already added that is a call to action with a button to the Contact page.

## Floated Labels
Floated labels are already added to the css. To use floated labels set your html like this for Input fields

```twig
<div class="relative">
  <input
    type="text"
    id="city"
    class="w-full rounded-lg floating-input"
    name="city"
    value=""
    autocomplete="city"
    aria-label="City Name"
    placeholder="City Name">
  <label for="city" class="floating-label">{{ "City Name"|t }}</label>
</div>
```

And for selects use this:

```twig
<div class="relative">
  <select
    name="country"
    id="country"
    class="rounded-lg floating-select"
    {# on click works with mouse but not keyboard... hmmm #}
    onclick="this.setAttribute('value', this.value);"
    value="">
    <option value=""></option>
    <option value="Canadas">Canada</option>
    <option value="USA">United States</option>
  </select>
  {# <span class="highlight"></span> #}
  <label class="floating-label">Country</label>
</div>
```

## Picture elements

This uses an include to generate a picture element with multiple sources with webp falling back to jpeg. use this example code to add an image to any page

if the image is empty uses a **fallback image** from **placeholder.com**  - this can be update on line 21 of `_includes/responsiveImage.twig`

```twig
{{ include('_includes/responsiveImage', {
  image: image,
  transforms: [
    {
      mq:'(max-width: 767.9px)',
      crop: {
        width: 500,
        height: 200,
        mode: 'crop'
      }
    },
    {
      mq:'(min-width: 768px)',
      crop: {
        width: 500,
        height: 200,
        mode: 'crop'
      }
    },
    {
      mq:'(min-width: 1024px)',
      crop: {
        width: 300,
        height: 100,
        mode: 'crop'
      }
    },
    {
      mq:'(min-width: 1280px)',
      crop: {
        width: 700,
        height: 250,
        mode: 'crop'
      }
    },
  ],
  attributes: {
    alt: image.altText ?? image.title ?? null,
    class: '',
    loading: 'lazy',
    dataAttributes: ''
  },
}, with_context = false) }}
```

## Craft Plugins

The following plugins are installed and ready to be used on the site. I prefer to keep plugin usage to a **minimum** so do **not** install a plugin unless absolutely necessary. If it can be done natively, it should be done natively.

1. Environment Label - adds a color bar across the control panel indicating current environmen
2. Minify - minifies html/css/js on production
3. Redactor - Rich Text Editor
4. Retcon - extra twig filters
5. SEOmatic - used for all SEO.
6. Template Comments - adds template comments in local dev to make finding templates easy
7. Typed Link Field - used for buttons and other linkks
8. ~~User Manual - in CP user manual ~~ removed until a Craft 4 version is available
9. Knock Knock - password protect staging site (pass: **letmein**)
10. MatrixMate
11. Typogrify
11. Sprig - Reactive components
13. AssetRev - link to css and js files with manifest.json file names


## Redactor

Redactor has the [link-attribute plugin installed](https://github.com/simplicate-web/redactor-link-attr) Adding/editing data attribute options is a 2 step process.

1. go to `modules/sitemodule/src/SiteModule.php` line 118 and edit or add another line like this `$def->addAttribute('a', 'data-track', 'Text');`
2. go to `config/redator/site.json` and edit or copy/paste line 20.

## Typogrify

See the [typogrify docs](https://nystudio107.com/docs/typogrify/) for advanced usage. For basic use add the typography fitler to your redactor fields like this

```{{ entry.copy|typogrify }}```

## Sprig

Sprig adds reactive components. See the [documentation](https://putyourlightson.com/plugins/sprig) and/or my article on [Reactive Pagination With Sprig](https://caffeinecreations.ca/blog/reactive-pagination-with-sprig-and-craft/) for examples.

Additionally **NOTE** that sprig will only reload components once when using the `localhost:3000` url that comes with the build process. When building/testing sprig components reload manually using your localhost domain - i.e. `https://site.ddev.com`

## Contact Form

The contact form is powered by the first party [contact form plugin](https://github.com/craftcms/contact-form) and Sprig. be sure to update the Email varaibles in dotenv so that email works correctly. Go to `plugins > contact form` and update the Sender Text and Subject text of your emails.

## MatrixMate

MatrixMate enables you to improve the Matrix authoring experience by sorting block types into groups and block type fields into tabs. See the [documentation](https://github.com/vaersaagod/matrixmate/blob/master/README.md) for full options and feautures.

There is a default config file in `config/matrixmate.php` that is not currently attached to any matrix fields.

## Styleguide

The style guide will automatically create the color palatte from your tailwind config. **Note:** - it only works with custom colors not tailwind colors. Additionally custom colors need to be added before any tailwind colors and be in this format:

```json
  grayBrand: {
    light: '#DADADA',
    DEFAULT: '#373F41',
  },
```
using tailwind dot notation does not work if you have a color that does not have other options be sure to use the above format with `DEFAULT` as the key.

Each time you update the colors you will need to run the following command

```
npm run export-tailwind-config
```

Which will export a json list in `templates/_tw-config`. Also see the **comments** in `templates/styleguide`.

Uncomment block with `.testing` class and then copy/paste the generated classes into the `templates/_whitelist.twig` file.

## Content

### Hero Component

A hero component is available with three options:

- **Standard Hero** - image, Hero Title, Copy, Button
- **Basic Hero** - no image, just a title and a dark background
- **Slider Hero** - same as standard but operates as a slider - maximum 5 slides

## Composer nuke

If you ever need to remove the vender folder and basically reset all things composer run this command

```composer nuke```

This will delete the vendor folder, composer.lock, clear composers cache, and then run composer update. You can find the full command in the scripts section of composer.json