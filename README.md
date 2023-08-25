<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Tailwind CSS Pluralsight](#tailwind-css-pluralsight)
  - [Intro](#intro)
    - [Demo](#demo)
  - [Using TailwindCSS](#using-tailwindcss)
    - [Building Your CSS](#building-your-css)
    - [Using Layers](#using-layers)
    - [Adding Reusable Classes](#adding-reusable-classes)
  - [TailwindCSS Styles](#tailwindcss-styles)
    - [Layout](#layout)
    - [Units](#units)
    - [Colors](#colors)
    - [Other Utility Classes](#other-utility-classes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Tailwind CSS Pluralsight

My notes from Pluralsight course on [TailwindCSS Fundamentals](https://app.pluralsight.com/library/courses/tailwind-css-3-fundamentals/table-of-contents)

Running the exercises, from Module 3 onwards:

```bash
# terminal 1
cd module3
npm run dev

# terminal 2
cd module3/public
npx live-server
```

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

Example, might want to use h1, h2 tags in various places, add one within header element:

```htm
<header>
  <h1>Testing H1 in Header</h1>
  <div id="site-name" class="text-2xl font-bold text-amber-300 p-2 whitespace-nowrap">
    <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
  </div>
```

Renders very small relative to everything else:

![h1 small](doc-images/h1-small.png "h1 small")

It's small because tailwind automatically added a css reset.

We can add our own basic styles for some elements in `app/src/css`:

```css
/* module3/src/app.src.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
  font-weight: bold;
  font-size: 2rem;
}
```

Now header looks like this using our styles.

![h1 large](doc-images/h1-large.png "h1 large")

Could repeat the definitions for h2 through 4:

```css
/* module3/src/app.src.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

h1 {
  font-weight: bold;
  font-size: 2rem;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
}

h3 {
  font-weight: bold;
  font-size: 2rem;
}

h4 {
  font-weight: bold;
  font-size: 2rem;
}
```

Then check what tailwind generated, it just appended our header styles at the end:

```css
/* module3/public/css/app.css */

/* tailwind reset including headers */
/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/* Out custom header styles */
h1 {
  font-weight: bold;
  font-size: 2rem;
}

h2 {
  font-weight: bold;
  font-size: 2rem;
}

h3 {
  font-weight: bold;
  font-size: 2rem;
}

h4 {
  font-weight: bold;
  font-size: 2rem;
}
```

But what we really want is to tell tailwind that these styles are part of the `base`, which allows us to *inject* these classes in the correct location within the css:

```css
/* module3/src/app.src.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    font-weight: bold;
    font-size: 2rem;
  }

  h2 {
    font-weight: bold;
    font-size: 1.5rem;
  }

  h3 {
    font-weight: bold;
    font-size: 1.2rem;
  }

  h4 {
    font-weight: bold;
    font-size: 1.1rem;
  }
}
```

Now the generated file has these in the middle, at the base section.

However, how to make use of this wrt tailwind classes?

### Adding Reusable Classes

`@apply` directive allows for re-use of tailwindcss classes in our custom definitions. i.e. we can use the same design language as tailwind, when developing our own custom styles.

Notice tailwindcss vscode extension intellisense:

![intellisense](doc-images/intellisense.png "intellisense")

```css
/* module3/src/app.src.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply font-bold text-2xl;
  }

  h2 {
    @apply font-bold text-xl;
  }

  h3 {
    @apply font-bold text-lg;
  }

  h4 {
    @apply text-lg;
  }
}
```

Looking at what tailwind generated, let's focus on h1:

```css
/* module3/public/css/app.css */

/* ~line 91: reset */
/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/* ~line 318: reset */
/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

/* ~line 437: our custom base */
h1 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
}
```

Notice tailwind css class `text-2xl` translates to specifying both a line-height and font-size.

**When to use this technique of building custom classes vs simply using tailwind classes in html?** Should be the exception, not the rule.

If using framework like React, Vue, etc - tailwind creator suggests building a component (eg: button) in those tools rather than using apply.

## TailwindCSS Styles

Continue with code examples in `module3`.

### Layout

For example, can add inline-block to h1:

```htm
<h1 class="inline-block">Testing H1 in Header</h1>
```

Could add any "flex-..." or "grid..." class, eg:

![flex classes](doc-images/flex-classes.png "flex classes")
![grid classes](doc-images/grid-classes.png "grid classes")

Now would like to improve display of header and main section:

![html structure](doc-images/html-structure.png "html structure")

Add a new div to wrap header and main section, then add class flex:

![flex](doc-images/flex.png "flex")

Now sections are in flex container displayed in columns:

![site columns](doc-images/site-columns.png "site columns")

Tailwind added:

```css
.flex {
  display: flex;
}
```

To get more space between columns, use `gap-{n}` classes (works with both flex and grid).

![gap classes](doc-images/gap-classes.png "gap classes")

For example, use `gap-1`:

```htm
<div class="flex gap-1">
  <header>...</header>
  <section>...</section>
</div>
```

Adds a row-gap and column-gap of 0.25rem

```css
.gap-1 {
  gap: 0.25rem;
}

.flex {
  display: flex;
}
```

Can see a small space between the columns now:

![site column gap](doc-images/site-column-gap.png "site column gap")

Now let's work on main section that displays all the movies. Has a div that displays the results, where each child has a class of film currently. Want to get the films laid out in a grid. Use `grid` class, together with helpers to define how many columns, in this case `grid-cols-2`:

![grid cols 2](doc-images/grid-cols-2.png "grid cols 2")

Tailwind adds:

```css
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid {
  display: grid;
}
```

Now movies display in a two column grid:

![movies grid](doc-images/movies-grid.png "movies grid")

Easy enough to change it to `grid-cols-5` to increase number of columns from 2 to 5. Can also use `gap-{n}` to space things out:

```htm
<div id="results" class="grid grid-cols-5 gap-2">
```

![movies col 5](doc-images/movies-col-5.png "movies col 5")

Now leave it at three columns with no gap:

```htm
<div id="results" class="grid grid-cols-3">
```

Note that since the grid classes are defined on the parent element, could have JavaScript swap out the child elements (eg: select a different year for movies), and the grid layout is still maintained.

### Units

Tailwind is consistent with units, eg: `gap-1` is 0.25rem (aka 4px).

Anytime there's a dash followed by a number, there's going to be consistent units

Frequently used are padding `p-{n}` and margin `m-{n}`.

`m1` and `p1` are `margin: 0.25rem;` and `padding: 0.25rem;` respectively.

Width `w-{n}` and `h-{n}` works the same way, eg: `w-1` is `width: 0.25rem;` and `h-1` is `height: 0.25rem;`

Available numbers are 0 - 12, then it starts skipping some numbers:

![numbers](doc-images/numbers.png "numbers")

Largest available number is `m-96` (24rem, 384px, given a root font size of 16px).

Units are 1/4 rem per number. i.e. 96/4 = 24.

Padding and margin also support cardinal directions.

Eg `pl-1` generates `padding-left: 0.25rem;`, `pr-1` is for padding-right, `pt-1` for padding-top, and `pb-1` for padding-bottom.

Also have `px-1`, which generates: (i.e. control the x-axis)

```css
.px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
```

and `py-1`, which generates: (i.e. control the y-axis)

```css
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
```

Margin has the same x/y variations.

Update `<header>` element to have `p-2`, i.e. `padding: 0.5rem` (8px given 16px root font size), space it out so its not right up at top right corner of container:

```htm
<header class="p-2">
  <!-- ... -->
</header>
```

![header-p2](doc-images/header-p2.png "header-p2")

If you want the top padding to be a different value than the rest, first specify top padding value, then the rest. IMPORTANT: first the top value that should be different, then the rst:

```htm
<header class="pt-1 p-2">
  <!-- ... -->
</header>
```

Generates:

```css
.pt-1 {
  padding-top: 0.25rem;
}

.p-2 {
  padding: 0.5rem;
}
```

Expanding the `padding` in dev tools, can see that the padding-top is overridden by earlier definition of pt-1:

![padding top override](doc-images/padding-top-override.png "padding top override")

More common would be to specify x and y (i.e. consisting padding for left and right, and consistent padding for top and bottom):

```htm
<header class="py-1 px-2">
  <!-- ... -->
</header>
```

Generates:

```css
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
```

Recall the Tailwind config is also looking at JavaScript files (configured in `content` section):

```javascript
// module3/tailwind.config.js
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

Looking at `results.js` (already provided by instructor as part of exercise files), it has a template that outputs html for each film:

```javascript
// module3/src/results.js
// ...
function formatFilm(film) {
  return `<div class="film">
    <img src="${film.posterUrl}" alt="${film.title}" />
    <div class="title">${film.title}</div>
    <div class="info">${film.year}</div>
    <div class="info">${film.rating}</div>
    <div class="info">Passed: ${film.passed}</div>
    <div class="info">Reason: ${film.reason}</div>
    <div class="info">Budget: $${film.budget.toLocaleString("en-US")}</div>
    <div class="info">Domestic Gross: $${film.domesticGross.toLocaleString(
      "en-US"
    )}</div>
    <div class="info">International Gross: $${film.internationalGross.toLocaleString(
      "en-US"
    )}</div>
    <p>${film.overview}</p>
  </div>`;
}
```

This markup can also be edited to use TailwindCSS classes, and the Tailwind build will generate corresponding css.

Eg: Remove the `film` class from old sass build, replace with `h-72` for a height of 72 * 0.25 = 18rem;

```javascript
// module3/src/results.js
// ...
function formatFilm(film) {
  return `<div class="h-72">`
  // ...
}
```

Other height options are `h-full` for full height (relative to its parent element), generates:

```css
.h-full {
  height: 100%;
}
```

`h-screen` for full viewport height, generates:

```css
.h-screen {
  height: 100vh;
}
```

vh units: Viewport height - relative unit that represents percentage of viewport's height, so 100vh is full height of user's viewport.

Also have `min-h-screen` which generates:

```css
.min-h-screen {
  min-height: 100vh;
}
```

This ensures element takes up at least the full height of the viewport, but can also expand further if content inside the element requires more space.

Add wrapper div around image to make it quite large, then wrap all the other information so it can appear to the right of the image.

Note use of `flex-none` and `relative` (`absolute` is also available), `overflow-hidden`:

```javascript
// module3/src/results.js
function formatFilm(film) {
  return `<div class="h-72 overflow-hidden">
    <div class="w-48 flex-none relative">
      <img src="${film.posterUrl}" alt="${film.title}" class="absolute"/>
    </div>
    <div class="ml-48 p-2">
      <div class="title">${film.title}</div>
      <div class="info">${film.year}</div>
      <div class="info">${film.rating}</div>
      <div class="info">Passed: ${film.passed}</div>
      <div class="info">Reason: ${film.reason}</div>
      <div class="info">Budget: $${film.budget.toLocaleString("en-US")}</div>
      <div class="info">Domestic Gross: $${film.domesticGross.toLocaleString(
        "en-US"
      )}</div>
      <div class="info">International Gross: $${film.internationalGross.toLocaleString(
        "en-US"
      )}</div>
      <p>${film.overview}</p>
    </div>
  </div>`;
}
```

### Colors

Update header to have a different color.

Tailwind ships with a standard set of colors that appear consistently across classes, eg: amber, blue, grey, stone, slate, etc.

![amber color](doc-images/amber-color.png "amber color")

![blue color](doc-images/blue-color.png "blue color")

Each number has a variation for depth of that color, eg: text-slate-50, text-slate-100, ...text-slate-900:

![slate color](doc-images/slate-color.png "slate color")

(later will learn how to specify our own colors)

Example: `text-slate-300` would generate:

```css
.text-slate-300 {
  --tw-text-opacity: 1;
  color: rgb(203 213 225 / var(--tw-text-opacity));
}
```

Note that white and black don't have have depth variations, so it would just be `class="text-white"` or `class="text-black"`, going with text-white for header:

```htm
<!-- module3/public/index.html -->
<body class="bg-amber-800">
    <div id="container" class="container bg-gray-100 mx-auto">
      <div class="flex gap-1">
        <header class="py-1 px-2 text-white">
          <div id="site-name" class="text-2xl font-bold text-amber-300 p-2 whitespace-nowrap">
            <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
          </div>
          <section id="menu">
```

Generates:

```css
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
```

We can also set the background color (need contrast for the white text), example: bg-amber-400 (to distinguish from existing background bg-amber-800 on body element):

```htm
<!-- module3/public/index.html -->
<body class="bg-amber-800">
    <div id="container" class="container bg-gray-100 mx-auto">
      <div class="flex gap-1">
        <header class="py-1 px-2 text-white bg-amber-400">
          <div id="site-name" class="text-2xl font-bold text-amber-800 p-2 whitespace-nowrap">
            <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
          </div>
          <section id="menu">
```

Can start to see distinguishing of sections based on different background colors

![section colors](doc-images/section-colors.png "section colors")

Adjust header text to dark grey so its easier to read against amber background:

```htm
<body class="bg-amber-800">
    <div id="container" class="container bg-gray-100 mx-auto">
      <div class="flex gap-1">
        <header class="py-1 px-2 text-gray-600 bg-amber-400">
          <div id="site-name" class="text-2xl font-bold text-amber-800 p-2 whitespace-nowrap">
            <a href="/"><i class="fas fa-film"></i> The Bechdel Test</a>
          </div>
          <section id="menu">
```

![header text grey](doc-images/header-text-grey.png "header text grey")

Background cover: `bg-cover` together with inline style for background-image. If only need something once, not worth making a custom class for it:

```htm
<!-- module3/public/index.html -->
<section id="main" class="bg-cover" style="background-image: url(img/bg-seats.jpg);">
```

Generates:

```css
element.style {
  background-image: url(img/bg-seats.jpg);
}

.bg-cover {
  background-size: cover;
}
```

![bg img](doc-images/bg-img.png "bg img")

But having background image makes movie text descriptions harder to read. Fix this in results javascript that renders template for each movie. Add light grey background `bg-gray-100` for each movie section, but use `/` syntax to specify some percent of transparency so that the background image will still show through:

![transp](doc-images/transp.png "transp")

```javascript
function formatFilm(film) {
  return `<div class="h-72 overflow-hidden bg-gray-100/70">
  ...
}
```

Generates:

```css
.bg-gray-100\/70 {
  rgb(243 244 246 / 0.7);
}
```

![movie transp](doc-images/movie-transp.png "movie transp")

Now the background image of movie seats shows through enough to give an idea of a movie website, but it doesn't get in the way of reading the text of movie descriptions.

### Other Utility Classes
