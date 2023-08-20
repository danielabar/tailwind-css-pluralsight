<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tailwind CSS Pluralsight](#tailwind-css-pluralsight)
  - [Intro](#intro)
    - [Demo](#demo)
  - [Using TailwindCSS](#using-tailwindcss)
    - [Building Your CSS](#building-your-css)
    - [Using Layers](#using-layers)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tailwind CSS Pluralsight

My notes from Pluralsight course on [TailwindCSS Fundamentals](https://app.pluralsight.com/library/courses/tailwind-css-3-fundamentals/table-of-contents)

## Intro

CSS becomes difficult to maintain as project grows:
* writing css rules is time consuming
* difficult to debug css
* cascading rules hard to understand
* copy/pasting css around makes the problem worse
* selector syntax is hard to grasp

There are no best practices that work generally well:
* Semantic class names do not work
* Designing for re-use leads to dogma
* Block Element Modifiers are clumsy and hard to maintain
* CSS based on structure of web site leads to bloat, and eventually affects performance
* Separation of concerns is a red herring, keeping designs in a separate file isn't practical for a large project
* Component-based CSS is hard to manage

[CSS Utility Classes and Separation of Concerns](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)

Projects like Bootstrap, Bulma, Foundation can help with pre-built design esthetics.

Tailwind CSS is different: Utility class library

Course using TailwindCSS 3

Node???

**Utility Classes**

* Single-responsibility design classes, eg: showing a border, specifying the width or padding.
* End up with multiple classes that just change the design of a single part of the UI.
* Can design components with utility classes, speeds up development.
* Can still enable re-use, but only when you really need it (won't need it as often as you'd think)
* Better than inline styles, they promote consistency

**What is Tailwind CSS?**

Consists of:
* A set of known utility classes
* Efficient CSS build - only builds css that's actually needed for the project
* Extensible theming - can modify existing theme that comes with the utility classes or make your own from scratch

**Features**

* Consistent design system, eg: units
* Powerful API for extensibility and configuration: Tool to allow you to build your own design system, with sensible defaults.
* Eliminates unused CSS
* Responsive throughout - every element has its own notion of responsiveness
* States and variants (eg: hover, disabled, responsive breakpoints)
* Easy SPA integration

**What about component frameworks?**

Tailwind is *not* a component framework. It's a set of utility classes and a build system.

But if you're already using something like Bootstrap, Bulma, etc. these can co-exist with Tailwind, but there will be some work.

**Editor Integration**

Install extension for your editor - look for authored by: Tailwind Labs, [VS Marketplace](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - supports intellisense.

### Demo

Starting with app provided in course Exercise Files. Displays movie info. All movie data comes from API provided by instructor: https://bechdel.azurewebsites.net/api/films

Start with website not built with Tailwind:

```bash
cd module2/public
npx live-server
```

`css/site.css` has all the styles that have been built "by hand".

`index.html` links to the css in the `<head>...</head>` section:

```htm
<link rel="stylesheet" href="css/site.css" />
```

Original website looks like this:

![original website](doc-images/original-website.png)

Comment out the css from index, we'll rebuild it with Tailwind.

With no site.css, it looks like this:

![no css](doc-images/nocss.png)

Add link to tailwind from cdn in index header. Normally would use a build system but for quick demo here, will use cdn:

```htm
<!-- module2/public/index.html -->
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Bechdel Test</title>

    <!-- Comment out original css as we will rebuild this with Tailwind -->
    <!-- <link rel="stylesheet" href="css/site.css" /> -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Other stuff... -->
</head>
```

Site looks subtly different, just adding tailwind script has changed a few things:

![tailwind](doc-images/tailwind.png)

Tailwind has removed default browser styling - css reset - start fresh. It also set a standard font (we could change that later).

Add utility class to body tag: (note: not yet getting intellisense support from vs code extension because haven't installed tailwind via package.json and don't yet have a tailwind config file)

```htm
<!-- bg: background -->
<!-- amber: one of the standard colors -->
<!-- 900: level of the color (from 50 - 900) -->
<body class="bg-amber-800">
```

Now website looks like this:

![bg amber 800](doc-images/bg-amber-800.png)

Look at this style in dev tools:

```css
.bg-amber-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(146 64 14 / var(--tw-bg-opacity));
}
```

Update div just inside the body to tell it its a container, give it a gray background:

```htm
<body class="bg-amber-800">
  <div id="container" class="container bg-gray-50">
```

`container` class has responsive styling: 100% width on small screens, then varying sizes on larger screens, look at dev tools:

```css
@media (min-width: 1536px)
.container {
  max-width: 1536px;
}
```

Large:
![grey container](doc-images/grey-container.png)

Then use "toggle device" in Chrome dev tools to simulate small phone:

```css
.container {
  width: 100%;
}
```

![container 100](doc-images/container-100.png)

Medium width (Surface Pro 7):

```css
@media (min-width: 768px)
.container {
  max-width: 768px;
}
```

![medium width](doc-images/medium-width.png)

But we want container centered, normally would write this css by hand such as:

```css
.container {
  margin: 0 auto;
}
```

To get this effect, use utility class starting with `m` for margin, `x` means set left and right (i.e. along the x-axis) (y for y-axis, b for bottom, t for top, l for left, r for right):

```htm
<body class="bg-amber-800">
  <div id="container" class="container bg-gray-50 mx-auto">
```

Here's how it looks now on a medium width screen:

![mx auto](doc-images/mx-auto.png)

Where tailwind css generated:

```css
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
```

Update the gray background on centered container to 100 for light, but 50 was too light:

```htm
<body class="bg-amber-800">
  <div id="container" class="container bg-gray-100 mx-auto">
```

Update site name to update site title styles.

`text-lg` would set the text to "large", `text-xl` - larger, `text-xs` - extra small. Goes up to 5xl.

```htm
<body class="bg-amber-800">
  <div id="container" class="container bg-gray-100 mx-auto">
    <header>
      <div id="site-name" class="text-2xl">
        <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
      </div>
```

Also specify the font should be bold. Note we do not say `text-bold`, but `font-bold` because font weights are handled differently than the text.

Also specify text color with `text-amber-800`:

```htm
<div id="site-name" class="text-2xl font-bold text-amber-800">
```

![title](doc-images/title.png)

Finally, add some padding around the title text with `p-4`:

(could also specify px for x-axis, pl for left, eg: `pl-4`, top, right bottom with t r b respectively).

```htm
<div id="site-name" class="text-2xl font-bold text-amber-800 p-4">
```

Generated styles for this element from dev tools:

```css
.text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}

.font-bold {
  font-weight: 700;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.p-4 {
  padding: 1rem;
}
```

Can also specify no wrapping for whitespace, class name is very similar to css:

```htm
<div id="site-name" class="text-2xl font-bold text-amber-800 p-2 whitespace-nowrap">
```

## Using TailwindCSS

### Building Your CSS

* Start with a source file, eg: `style.src.css`
* "Something" scans for web content files for TailwindCSS classes (eg: html, js, ts,vue, etc)
* Then an output css file `styles.css` is built containing only the tailwind classes you're actually using, plus a css reset (built into library)

Add it to project, working with `module3`

Initialize project with a config file, from terminal:

```bash
cd module3
npx tailwindcss init
```

```
Need to install the following packages:
  tailwindcss@3.3.3
Ok to proceed? (y) y

Created Tailwind CSS config file: tailwind.config.js
```

Generated file:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `content` array to tell Tailwind where to look to find css classes it needs to process:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/*.{html,js}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Create new file - naming it `.src` because we won't be using this file directly in project, rather it will get generated.

Tailwind needs "directives" in this file so it knows where it should generate its css.

These are also called layers so Tailwind knows the order in which they should be constructed

```css
/* module3/src/app.src.css */
```

Back in terminal, use `-i` to specify input file and `-o` for output file, this tells tailwind to generate an output file from the given input:

```bash
npx tailwindcss -i ./src/app.src.css -o ./public/css/app.css
```

[Generated app.css](module3/public/css/app.css)

Bunch of reset css and variables defined at the top, towards the bottom, there are the classes we started using in `index.html`` from earlier course section:

```css
! tailwindcss v3.3.3 | MIT License | https://tailwindcss.com
*/

/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

/* other tailwind stuff... */

/* classes we specified in public/index.html */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.hidden {
  display: none;
}

.w-full {
  width: 100%;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.bg-amber-800 {
  --tw-bg-opacity: 1;
  background-color: rgb(146 64 14 / var(--tw-bg-opacity));
}

.bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}

.p-2 {
  padding: 0.5rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-bold {
  font-weight: 700;
}

.text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
```

So the generated css file will be smaller than the entire tailwind library because it only includes the css classes that are needed in the project.

Now update `public/index.html` - remove the cdn script for tailwind and instead use a stylesheet link for our generated css:

```htm
<!-- module3/public/index.html -->
<!-- Using generated css from tailwind -->
<link rel="stylesheet" href="css/app.css">
```

Then view the project with:

```bash
cd module3/public
npx live-server
```

Now let's update the site name to be slightly ligher color:

```htm
<!-- BEFORE -->
<div id="site-name" class="text-2xl font-bold text-amber-800 p-2 whitespace-nowrap">
  <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
</div>

<!-- AFTER -->
<div id="site-name" class="text-2xl font-bold text-amber-700 p-2 whitespace-nowrap">
  <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
</div>
```

Now the title "The Bechdel Test" turns black (default color) because `text-amber-700` is not defined in the generated `css/app.css`. We need to run the tailwind command to generate it again:

```bash
npx tailwindcss -i ./src/app.src.css -o ./public/css/app.css
```

That will update the generated file to now have the 700 variant of amber text color rather than 800 we had before:

```css
/* module3/public/css/app.css */
.text-amber-700 {
  --tw-text-opacity: 1;
  color: rgb(180 83 9 / var(--tw-text-opacity));
}
```

But it's tedious to have to run this each time, use `-w` flag to leave it running watching for changes:

```bash
npx tailwindcss -i ./src/app.src.css -o ./public/css/app.css -w
```

Now as you make changes to `module3/public/index.html`, tailwind will watch it and auto re-generate `public/css/app.css`. This together with `live-server` will auto reload the page in the browser.

Now stop the tailwindcss watch command, and put it in package.json scripts, replace the sass command that was being used to build this site before:

```json
// module3/package.json
"dev:css": "npx tailwindcss -i ./src/app.src.css -o ./public/css/app.css -w",
```

Now run in terminal (from `module3` directory):

```bash
npm run dev:css
```

Even better, can simply do:

```bash
npm run dev
```

Because the `dev` script specifies "run everything that starts with `dev`, using `run-p` which means run all in parallel:

```json
// module3.package.json
{
  // ...
  "scripts": {
    "dev": "run-p dev:*",
    "dev-js": "rollup --config -w",
    "dev:css": "npx tailwindcss -i ./src/app.src.css -o ./public/css/app.css -w",
    "build": "run-p build-*",
    "build-js": "rollup --config rollup.config.prod.js",
    "build-css": "sass --style=compressed ./src/site.scss ./public/css/site.css"
  },
  // ...
}
```

For me fails: `sh: run-p: command not found`, need [npm-run-all](https://www.npmjs.com/package/npm-run-all):

```bash
npm install npm-run-all --save-dev
```

### Using Layers
