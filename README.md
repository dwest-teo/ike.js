# Ike.js
[![Ike.js on NPM](https://img.shields.io/npm/v/ike.js.svg)](https://www.npmjs.com/package/third-partay.js)

A small, dependency-free library that asynchronously loads SVG sprites and saves them to local storage.

## About
Work with SVG symbol-based icon systems without having to include a bulky SVG file inline.  Ike.js improves page loading speeds by retrieving your icon file asynchronously and inserting it into your markup on the fly.

To make the deal even sweeter, Ike.js stores your icons in the client's local storage on the initial download, and will fetch them automatically on subsequent page views.  Service workers can handle much of this functionality for you these days, but browser support is still spotty (I'm looking at you, Apple).  Ike.js is a great, lightweight service worker alternative or fallback for SVG icon systems.

## Usage
To use Ike.js, you'll need a modern JavaScript workflow and build system with ES6 module bundling and transpiling capabilities.  [Here's](https://github.com/callmecavs/outset) a great example.

### Install
Install Ike.js via NPM and add to your dependencies:

```bash
$ npm install ike.js --save
```

### Initialize

Import the Ike.js module, then instantiate it.  The constructor takes the URL of your SVG icon sprite and a revision identifier as arguments.

```es6
// import Ike.js
import Ike from 'ike.js'

// create an instance
const Icons = new Ike('/icons/sprite.svg', 14)
```

The revision identifier is used to control the version of the icons stored in local storage, and can follow any convention you like.  If your icons change, just update this revision argument and Ike.js will know to fetch a fresh copy of the file.

Assuming your SVG sprite file contains symbol elements with defined viewBoxes, you can use them in your HTML like so:

```html
<svg class="my-awesome-icons">
  <use xlink:href="#prancing-unicorn" />
</svg>
```

That's it, you're now equipped with a lightning-fast, non-render blocking icon system.  Have a cold one and bask in the glow of your asynchronous magnificence!

## License

[MIT](https://opensource.org/licenses/MIT). © 2016 Donny West

[![Built With Swag](http://forthebadge.com/images/badges/built-with-swag.svg)](http://forthebadge.com)
