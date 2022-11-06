<!-- cSpell:enable  -->

# Responsive flexboxes

**Objectives**: Learn how to use flexbox and media queries to create responsive layouts.

**Concepts covered**: Flexbox, flex property, determining breakpoints, media queries, responsive design using the _mobile-first_ design strategy.

In this assignment you will add flexboxes to your `<body>` element, hero overlay, menu, articles, and cards using mobile-first design and media queries.

| :warning: This assignment builds on your _Overlays and cards_ assignment                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| After cloning this repo and opening it in VSCode, copy the following files and folders from your _Overlays and cards_ assignment into this repo.<br><br><ul><li>📄 index.html</li><li>📄 favicon.ico</li><li>📁styles</li><li>📁images</li><li>📁about</li><li>📁contact</li></ul><br>**Make sure that you don't copy any other folders or files, including the `test` folder, the hidden `.git` and `.github` folders, and the `package.json` files** |

## Mobile-first design

We will be converting our websites to responsive websites using the _mobile-first_ design strategy. This means that we will start by designing our website for mobile devices, and then add media queries to layout our websites for progressively larger screens.

One of the main reasons to use the mobile-first design strategy is that the mobile layout is usually the simplest. Your main CSS provides the mobile layout, and then media queries are added provide more complex layouts for larger screens.

When writing media queries, remember that they are overriding previous CSS, so you need to place them _after_ the CSS that they are overriding. I recommend placing all media queries at the end of your CSS file so they are sure to override previous CSS, and they are easy to find.

### Determining breakpoints

You must create a minimum of three layouts, one for mobile phones, one for tablets, and one for desktops.

When designing a responsive website, you need to decide where to place breakpoints. A breakpoint is a point in your CSS where you change the layout of your website. It's common to see breakpoints at 320px, 480px, 768px, and 1024px. These are based on dimensions of older iPhones and iPads. With so many devices on the market there're no "set in stone" breakpoints, and while these may be good starting points, it's better base your breakpoints on content, not device, and to test your website on a variety of devices to determine the breakpoints that work best for your website.

I recommend checking out [mydevice.io](https://www.mydevice.io/) to view your devices metrics and to view common device screen sizes (scroll to the bottom of the page to see the device list).

| :bulb: Device width vs CSS width                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| When determining width, you base it on the CSS width, not the physical device width. This is because many devices use more than one pixel (pixel ratio) to display a single pixel on the screen. For example, the iPhone 6 has a pixel ratio of 2, meaning that it uses two pixels to display a single pixel. This means that the iPhone 6 has a CSS width of 375px and a CSS height of 667px, but a physical width of 750px and a physical height of 1334px. |

For simplicity, you can use the following breakpoints for this assignment (but you are free to adjust the widths to accommodate your design):

| device  | CSS width       |
| :------ | :-------------- |
| mobile  | 300px - 400px   |
| tablet  | 401px - 800px   |
| desktop | 801px and wider |

We will use the `min-width` media query, which means that the CSS inside the media query will be applied when the screen is at least as wide as the specified width. The media queries for these breakpoints are:

```css
@media (min-width: 401px) {
  /* tablet CSS */
}

@media (min-width: 801px) {
  /* desktop CSS */
}
```

Make sure to use this order. A device with a width of 1000px will match both the tablet and desktop media queries, so it will apply CSS from both media queries. The tablet media query must come first so the desktop media query can override any of its declarations.

## `<body>` layout

It's common to use a flexbox with flex direction set to column for the `<body>` element. This allows you to easily center the content of your website. Add the following to your body CSS:

```css
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  ...;
}
```

| :bulb: `align-items: stretch` and `align-items: center`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <p>Many beginners struggle with understanding the how differently `align-items: stretch` and `align-items: center` display elements.</p><p>The default value of `align-items` is `stretch`, which means that the flex items with `flex-direction: column` will stretch to fill the width of the flex container. This is similar to the behavior of block elements in standard _flow_ layout.</p><p>However, the behavior changes when `align-items: center` is used. Flex items set with `align-items: center` will be centered in the flex container, but they will behave similar to inline-elements. If their width is less than the width of the flex container, they will not expand to fill the width of the flex container. I often refer to this as "snapping" to fit the contents.</p> |

You will want some of your elements, such as your hero image, to fill the width of the screen. To force this you can use `align-self: stretch` to override the default `align-items: center` behavior set in the `.body` CSS.

```css
.hero {
  align-self: stretch;
  ...;
}
```

Finally, if you used `margin: 0 auto` to center any elements, remove it. The flexbox will center the elements for you.

## Hero image overlay

Use a flexbox to align the text in your hero image overlay. Remove any positioning like margins/paddings that you were using to position the text before flexbox. Also, make sure that the text doesn't run up to the edge of the screen. Use paddings or margins to leave a gutter around the text. I usually use a variable `--gutter` set to `1rem` that I reuse on all elements that span the width of the viewport.

Since you used the `clamp()` function to dynamically resize your `<h1>` text in the overlay, you may not need a media query for you hero image overlay. Check that your overlay looks good (including adequate whitespace) on all three screen widths.

## Menu

Use a flexbox to display your menu horizontally. Since your menu items are in a `<ul>`, you need to remove the bullets and the unordered list's default padding and margin. Also, since you want a large "tap target", if you add space to the menu items, add it to the `<a>` elements, but remember, `<a>` elements are inline elements, and will not take top and bottom padding or margins unless you set them to `display: block` or `display: inline-block`.

Menus are simple enough that you can use `justify-content` to space the menu items evenly. If you use `justify-content` you will need to set `align-self: stretch` on the _menu container that is a direct child of_ `<body>` so that the menu won't collapse to its minimum width, which is a behavior of `align-items: center` . You may need to set a `max-width` on a menu container to prevent the menu from stretching too wide on larger screens.

Don't worry if your menu does not display properly on mobile devices. We will fix that in the next assignment by converting it to a dropdown menu. Finally, make sure that your menu items are still styled and have hover effects.

## Main

Your `<main>` element should contain two `<article>` elements. Since we don't want a line of text to be too long to read comfortably, you should set a maximum width for your `<main>` element. We will be formatting our articles with images on the left or right of the text, so if you have set a `max-width` on your `<main>` element, you will need to increase it to accommodate the article images. You can adjust it after you finish your article layouts, but I'd recommend setting it to `max-width: 70rem` while you layout your articles, and then adjust it, if needed, when your articles are styled. Also, make sure your main has a gutter around it, so it doesn't run up to the edge of the screen.

## Responsive article `.panel` class

We will create a `.panel` class that will be used to format our articles. Before we set it up, you need to have two images, one for each article.

### Article images

You want to use the smallest image size possible for your article images. If your `<main>` element is set to `max-width: 70rem`, that's a default of `70 x 16px` or `1120px` wide. Your image will take up at most 50% of that width. So your article images should have a physical width of 560px (resize them before adding them, and don't forget to add HTML `height` and `width` attributes).

_I am simplifying here, and not taking device pixel ratios into account. If you were looking at device pixel ratios, you would need a max-width of 1120px for devices with a pixel ratio of 2, and 2240px for devices with a pixel ratio of 3. You could use an `<img>` with `srcset` to provide different image sizes for different devices pixel ratios, but that's beyond the scope of this assignment._

You want all your images to be responsvie, so make sure to check that your `img` elements don't have any `width` or `max-width` properties set. This is the CSS you need for your `img` elements:

```css
img {
  display: block;
  width: 100%;
  height: auto;
}
```

### Article HTML

You want your article heading, text, and link "button" to be grouped together. Wrap them in a `<div>` to do this. Also, because of some image resizing issues with browsers, it's best to also wrap your image in a `<div>`. Here's some markup (with the panel class) that your final HTML should be similar too. You can name the classes whatever you want, but I tend to use "-wrapper" or "-content" for the class names of the wrapper `<div>`s.

```html
<article class="panel">
  <div class="text-wrapper">
    <h2>...</h2>
    <p>...</p>
    <p>...</p>
    <a class="button" href="">Donate</a>
  </div>
  <div class="image-wrapper">
    <img src="..." alt="..." height="..." width="..." />
  </div>
</article>
```

### `.panel` flexbox mobile layout

Use a flexbox to format your article for display on a mobile device. The image should be above the text. Instead of moving the `<img>` in the HTML, use the `order` property to have the image appear above the text. Your image must span the width of the article. Images must maintain their aspect ratio when resized (not appear stretched or squished). If this happens to your images, look into the `object-fit` property.

Here's a sample mobile-styled article:
![sample mobile-styled article](readme-assets/article-mobile.png)

### `.panel` flexbox tablet / desktop layout

Add a media query at the end of your CSS file to format your `.panel` to display as a row on a tablet or desktop device. Notice how the `max-width` on `<main>` limits the width of the article, and it's centered in the viewport.

![sample row-styled article](readme-assets/article-desktop.png)

Make sure to

- reset the `order` property so that the images don't display on the left
- use the `flex` property to set up a display ratio for the images and text. For example, you can have the image take up 40% of the article and the text take up 60%, or use another ratio such as 30%/70%.
- set a gap between the image and text
- remove any top margin on the article h2 so that it aligns with the top of the image

### `.left` class

Create a `.left` class that, when added to an article text-wrapper or image-wrapper will cause it to display on the left side of the article. Set up your articles so that the image on one is on the left and the image on the other is on the right. Assume there's no guarantee that text and images will be in the correct order in the HTML, which means you should use the `order` property on the flex-items, not `row-reverse` on the flex container.

![left class example](readme-assets/article-left.png)

## Responsive cards

Use a flexbox and media queries to make your cards responsive.

Create three layouts:

- 1x4 column for mobile
- 2x2 grid for tablet
- 4x1 row for laptop

![cards example](readme-assets/card-layouts.png)

**Make sure that**

- you use mobile-first design in your CSS
- images and cards resize (no fixed widths)
- if you have visible text, the images and text have equal heights on all cards (if you need help on this, look into setting an [aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) and [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) on your images)
- fonts sizes are appropriate for each layout
- each layout has proper and proportional whitespace
- hover effects are still functional

If your cards are inside `<main>`, you may want to move them outside `<main>` so that they are not limited by `<main>`'s `max-width`.

## :rocket: Publish on Github Pages

When your assignment is finished, check that you don't have any warnings or errors in VS Code, then sync it to Github and publish it on Github Pages. Remember to paste the Github pages URL in the repo _About_ section.

Make sure to test your website on [validator.nu](https://validator.nu/). If you have any errors, fix them before submitting your URL to Learning Suite.

## :rocket: Publish on Github Pages

When your assignment is finished, check that is doesn't have any warnings or errors in VS Code (fix them if you find any), then sync it to Github and publish it on Github Pages. Remember to paste the Github pages URL in the repo _About_ section.

Make sure to test your website on [validator.nu](https://validator.nu/). If you have any errors, fix them before submitting your URL to Learning Suite.

## ⬆️ Post repo URL on Learning Suite

Review the tests below and make sure your repo passes them. If you kept your website consistent with the previous assignments, you should pass most of them.

When you are ready for you assignment to be graded, submit a link to your Github repo on Learning Suite for the **Responsive flexboxes** assignment
<br><br><br>

### :star: Assignment tests

_All but the last three tests are from previous assignments._

General HTML structure

- `<head>` has `<title>`, `<meta>` description and favicon info, loads normalize, fonts, and main styles in proper order
- all HTML files should contain an `<h1>`, and only one `<h1>`
- all index.html files have `<header>` containing a `<nav>` and `<ul>`

Tests for main index.html

- main index.html must contain a `<picture>`, one `<main>`, at least two `<article>`, an `<aside>`, and a `<footer>`
- each `<article>` must contain an `<h2>`, at least one `<p>` and an `<a class="button">`

Image tests

- image paths are all lowercase and contain no spaces
- images must be 1920px wide or less
- relative paths to images used, and images must be in the images directory
- non-SVG and non-`<picture>` images have the `<img>` height and width attributes set to the image's intrinsic dimensions
- `<picture>` element must contain three `<source>` elements with media and srcset attributes
- contact page loads an SVG file with `<img>`

CSS tests

- global box-sizing rule set to border-box and :root contains CSS variables
- font-family, color, and line-height set in body
- remove underlines from `<a>` and add :hover class for all `<a>` that contain href attribute
- CSS contains .button style and .button:hover declarations
- hero `h1` font-size set using `clamp()`
- section with class `.cards` contains four cards, each with class `.card`

:sparkles: **new tests**

- css contains at least two media queries which use `(min-width: ...)`
- `body` set to `display: flex` and `flex-direction: column`
- `main` has `max-width` set
- two articles with class `panel`
- `left` class used once inside both panel articles

| :heavy_check_mark: You will also be graded on the following items from the rubric:                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li>`.hero` overlay text positioned with a flexbox</li><li>`.panel` flexbox functional</li><li>`.cards` flexbox functional</li><li>The general appearance of your web page – proper spacing, font size, etc. </li></ul> |
