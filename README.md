# Craft CMS Starter Project (Boilerplate)

This is an opinionated Craft CMS starter project using DDev for local development, Tailwind CSS, Alpine Js, and NPM Build Scripts.

### Install Craft 5 version
to install this package run `composer create-project createsean/craft-starter .`

### Install Craft 4 version
to install this package run `composer create-project createsean/craft-starter . --prefer-dist 4.2.31`

### Install Craft 3 version
To install with Craft 3 version run `composer create-project createsean/craft-starter . --prefer-dist 1.14.0`

---

## Table of Contents

  * [Local Development](#local-development)
  * [To Do](#to-do)
  * [Build Process](#build-process)
  * [Updating build process on an existing site](#build-process)
  * [Tailwind](#tailwind)
  * [Accessibility](#accessibility)
  * [Dark Mode](#dark-mode)
  * [Fragments](#fragments)
  * [Floated Labels](#floated-labels)
  * [Sticky header](#sticky-header)
  * [Picture Element](#picture-elements)
  * [Craft Plugins](#craft-plugins)
  * [Typogrify](#typogrify)
  * [Sprig](#sprig)
  * [Contact Form](#contact-form)
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
6. run `ddev import-db --file=db.sql.gz` this will import the seeder database with settings, channels, etc.
7. run `ddev launch access` will open the Craft CP
8. To access the db from your host machine run `ddev describe` and you'll get the connection details needed

if you clone the starter instead of using composer to create the package you will need to run additional commands

1. `php craft setup/security-key`
2. `php craft setup/app-id`
3. `ddev composer install`
4. `npm run install`

Login: `cc_admin`
Password: `letmein`

10. after logging in be sure to **update your password**

## To Do
-   [ ] Ensure accessibility passes with default templates - aria labels, alt text etc.
-   [x] Set up site search.
-   [x] Contact Form.
-   [X] Move AlpineJs and plugins from CDN to compiled build process.
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
-   [ ] Replace matrix content builder with CKEditor longform
-   [ ] update templates to use `.eagerly()` where possible

## Build Process

Tailwind for compiles with the `npm run start` command along with the entire build process. If you want to only compile tailwind run `npm run watch`

Have removed this when migrating from Laravel Mix. ~~Images and svg files should be copied to src/img and src/img/svg. When running `npm run production` these will then be optimized and copied to /public/assets/images and /public/assets/images/svg respectively (if you don't want to run production, copy files to both locations)~~

You will need [NodeJS](https://nodejs.org/en/) version 20+. YOu can either update to 20+ or if you need multiple versions of node install the Node Version Manager [Windows](https://github.com/nvm-sh/nvm) / [Mac](https://github.com/coreybutle/nvm-windows).

1. run `npm install` or `npm i`

Add any scripts or css you need by running `npm install <package-name> --save-dev`
You can then have the required javascript or css files combined and minimized by adding paths to the correct files in `package.json` In the scripts section for `concat:js` or `concat:css`. When you run `npm run start` everything will be combined and output to `/public/assets/js` or `public/assets/css`

2. in `browsersync.config.js` update line 8  `const baseUrl = 'https://craft-starter.ddev.site'` with your local domain


4. run `npm run start` to tailwind, set up browser sync and combine scripts.

5. run `npm run build` when ready for production. This will minify css.

4. Tailwind Container Queries are now native and do not need a plugin. See the (documentation)[https://tailwindcss.com/docs/responsive-design#container-queries]

Add a `@container` class to the a parent div and then use prefixes to target the container size like this `@lg:bg-pink-400`. Matrix blocks by default have a `@container` so it is easy to use containers out of the box.

## Updating build process on an existing site

If you have a site built with an earlier version of this starter project and want to update the build process to use the new approach. Follow the [instructions here](update-build-process.md).


```html
<div class="@container">
  <div class="@lg:bg-pink-400">
    This div will have a pink background when the container is larger than 32rem.
  </div>
</div>
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

## Sticky Header

The layout template has a commented out header tag with that when enabled will make the navigation sticky. When scrolling down will disappear and re-appear when scrolling up.

## Picture elements

This uses an include to generate a picture element with multiple sources with webp falling back to jpeg. use this example code to add an image to any page

if the image is empty uses a **fallback image** from **placeholder.com**  - this can be update on line 5 of `_includes/responsiveImage.twig`

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
  figureClass: null,
  figureStyle: null,
  pictureClass: null,
  caption: null,
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

1. AssetRev - link to css and js files with manifest.json file names
2. CKEditor - Rich Text Editor
3. Contact Form
4. Control Panel CSS - add custom styles to the CP
5. Environment Label - adds a color bar across the control panel indicating current environment
6. Hyper - used for buttons and other links
7. Knock Knock - password protect staging site (pass: **letmein**)
8. Minify - minifies html/css/js on production
9. Retcon - extra twig filters
10. SEOmatic - used for all SEO.
11. Sprig - Reactive components
12. Typogrify
13. ~~User Manual - in CP user manual~~ removed until a Craft 5 version is available


## Typogrify

See the [typogrify docs](https://nystudio107.com/docs/typogrify/) for advanced usage. For basic use add the typography filter to your redactor fields like this

```{{ entry.copy|typogrify }}```

## Sprig

Sprig adds reactive components. See the [documentation](https://putyourlightson.com/plugins/sprig) and/or my article on [Reactive Pagination With Sprig](https://caffeinecreations.ca/blog/reactive-pagination-with-sprig-and-craft/) for examples.

Additionally **NOTE** that sprig will only reload components once when using the `localhost:3000` url that comes with the build process. When building/testing sprig components reload manually using your localhost domain - i.e. `https://site.ddev.com`

## Contact Form

The contact form is powered by the first party [contact form plugin](https://github.com/craftcms/contact-form) and Sprig. be sure to update the Email varaibles in dotenv so that email works correctly. Go to `plugins > contact form` and update the Sender Text and Subject text of your emails.

## Content

### Hero Component

A hero component is available with three options:

- **Standard Hero** - image, Hero Title, Copy, Button
- **Basic Hero** - no image, just a title and a dark background
- **Slider Hero** - same as standard but operates as a slider - maximum 5 slides

There is also a basic matrix field for a content builder. Once I have more time I will create a longform content CKEditor field to replace the matrix content builder.

## Composer nuke

If you ever need to remove the vender folder and basically reset all things composer run this command

```composer nuke```

This will delete the vendor folder, composer.lock, clear composers cache, and then run composer update. You can find the full command in the scripts section of composer.json