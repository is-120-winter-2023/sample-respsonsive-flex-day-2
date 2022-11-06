const sizeOf = require("image-size");
const fs = require("fs");
const { doms, INDEX, ABOUT, CONTACT } = require("./dom-check.js");

const docs = doms.map(dom => dom.window.document);

//load CSS file once
const css = fs.readFileSync("styles/main.css", "utf-8");

// since tests are expected to run synchronously, saving image info
const images = [];

describe("general HTML structure", () => {
  test("<head> has <title>, <meta> description and favicon info, loads normalize, fonts, and main styles in proper order", () => {
    const normalizeRegex = new RegExp(/normalize\..*css/);
    const fontRegex = new RegExp(/fonts.googleapis.com/);

    docs.forEach((doc, i) => {
      expect(doc.querySelector("title")).not.toBeNull();

      expect(doc.querySelector("meta[name=description]")).not.toBeNull();
      expect(doc.querySelector("link[rel='shortcut icon']")).not.toBeNull();

      const stylesheets = doc.querySelectorAll("link[rel='stylesheet']");
      expect(normalizeRegex.test(stylesheets[0].href)).toBe(true);
      expect(fontRegex.test(stylesheets[1].href)).toBe(true);

      let mainFound = false;
      if (i === INDEX) {
        if (stylesheets[2].href === "styles/main.css") {
          mainFound = true;
        }
      } else {
        if (stylesheets[2].href === "../styles/main.css") {
          mainFound = true;
        }
      }
      expect(mainFound).toBe(true);
    });
  });

  test("all HTML files should contain an <h1>, and only one <h1>", () =>
    docs.forEach(doc => expect(doc.querySelectorAll("h1").length).toBe(1)));

  test("all index.html files have <header> containing a <nav> and <ul>", () =>
    docs.forEach(doc => {
      expect(doc.querySelector("header")).not.toBeNull();
      expect(doc.querySelector("header>nav")).not.toBeNull();
      expect(doc.querySelector("header>nav>ul")).not.toBeNull();
    }));
});

describe("tests for main index.html", () => {
  test("main index.html must contain a <picture>, one <main>, at least two <article>, an <aside>, and a <footer>", () => {
    expect(docs[INDEX].querySelector("picture")).not.toBeNull();

    expect(docs[INDEX].querySelector("main")).not.toBeNull();

    const articles = docs[INDEX].querySelectorAll("article");
    expect(articles.length).toBeGreaterThanOrEqual(2);

    expect(docs[INDEX].querySelector("aside")).not.toBeNull();

    expect(docs[INDEX].querySelector("footer")).not.toBeNull();
  });

  test('each <article> must contain an <h2>, at least one <p> and an <a class="button">', () => {
    const articles = docs[INDEX].querySelectorAll("article");
    articles.forEach(article => {
      expect(article.querySelector("h2")).not.toBeNull();
      expect(article.querySelectorAll("p")).not.toBeNull();
      expect(article.querySelector("a.button")).not.toBeNull();
    });
  });
});

describe("image tests", () => {
  test("image paths are all lowercase and contain no spaces", () => {
    // builds the image array used by the other image tests
    let imgs = [];
    docs.forEach(doc => {
      imgs = imgs.concat(Array.from(doc.querySelectorAll("img")));
    });

    // no uppercase or whitespace
    const noUpper = new RegExp(/[A-Z]|\s/);
    const hero = new RegExp(/hero/);
    const svg = new RegExp(/svg$/);

    imgs.forEach(img => {
      const path = img.src.replace(/^..\//, "");
      const dimensions = sizeOf(path);

      images.push({
        img: img,
        dimensions: dimensions,
        path: path,
        checkDimensions: !hero.test(path) && !svg.test(path),
      });
      expect(noUpper.test(path)).toBe(false);
    });
  });

  // TODO: check <picture> source images
  test("images must be 1920px wide or less", () =>
    images.forEach(img =>
      expect(img.dimensions.width).toBeLessThanOrEqual(1920)
    ));

  test("relative paths to images used, and images must be in the images directory", () => {
    const regex = new RegExp(/^images\//);
    images.forEach(image => {
      expect(regex.test(image.path)).toBe(true);
    });
  });

  test("non-SVG and non-<picture> images have the <img> height and width attributes set to the image's intrinsic dimensions", () => {
    images.forEach(image => {
      if (image.checkDimensions) {
        expect(image.img.width).toBe(image.dimensions.width);
        expect(image.img.height).toBe(image.dimensions.height);
      }
    });
  });

  test("<picture> element must contain three <source> elements with media and srcset attributes", () => {
    const sources = docs[INDEX].querySelectorAll("picture > source");
    expect(sources.length).toBeGreaterThanOrEqual(3);
    sources.forEach(source => {
      expect(source.getAttribute("media")).not.toBeNull();
      expect(source.getAttribute("srcset")).not.toBeNull();
    });
  });

  test("contact page loads an SVG file with <img>", () =>
    expect(docs[CONTACT].querySelector("img[src$='.svg']")).not.toBeNull());
});

describe("CSS tests", () => {
  test("global box-sizing rule set to border-box and :root contains CSS variables", () => {
    let regex = new RegExp(/\*\s+\{\s*\n\s+box-sizing:\s+border-box/);
    expect(regex.test(css)).toBe(true);
    regex = new RegExp(/:root\s+\{\s*\n\s+--/);
    expect(regex.test(css)).toBe(true);
  });

  test("font-family, color, and line-height set in body", () => {
    const attr = ["font-family", "color", "line-height"];
    let fail = false;

    attr.forEach(a => {
      const regexStr = `body\\s+{[^}]+${a}:`;
      const regex = new RegExp(regexStr);
      if (!regex.test(css)) {
        fail = true;
      }
    });

    expect(fail).toBe(false);
  });

  test("remove underlines from <a> and add :hover class for all <a> that contain href attribute", () => {
    let regex = new RegExp(/^a\s[^}]+text-decoration:\s+none/, "gm");
    expect(regex.test(css)).toBe(true);
    regex = new RegExp(/^a\[href\]:hover\s+{$/, "gm");
    expect(regex.test(css)).toBe(true);
  });

  test("CSS contains .button style and .button:hover declarations", () => {
    let regex = new RegExp(/\.button\s*\{.*/);
    expect(regex.test(css)).toBe(true);
    regex = new RegExp(/\.button:hover\s*\{.*/);
    expect(regex.test(css)).toBe(true);
  });

  // visual tests (not tested here): overlay working; filter or background color
  test("hero section contains an <h1> and a <p>", () => {
    const hero = docs[INDEX].querySelector("section.hero");
    expect(hero.querySelector("h1")).not.toBeNull();
    expect(hero.querySelector("p")).not.toBeNull();
  });

  test("hero h1 font-size set using clamp()", () => {
    const regex = new RegExp(/\.hero h1\s*\{[^}]+font-size:\s*clamp\(/);
    expect(regex.test(css)).toBe(true);
  });

  test("section with class .cards contains four cards, each with class .card", () => {
    const cards = docs[INDEX].querySelectorAll("section.cards .card");
    expect(cards.length).toBe(4);
  });
});

/******************
 **   new tests  **
 ******************/
describe("new tests", () => {
  test("css contains at least two media queries which use (min-width: ...)", () => {
    const count = (css.match(/@media\s*\(min-width/g) || []).length;
    expect(count).toBeGreaterThanOrEqual(2);
    console.log(count);
  });

  test("body set to display: flex and flex-direction: column", () => {
    const attr = ["display:\\s+flex", "flex-direction:\\s+column"];
    let fail = false;

    attr.forEach(a => {
      const regexStr = `body\\s*{[^}]+${a}`;
      const regex = new RegExp(regexStr, "gm");
      if (!regex.test(css)) {
        fail = true;
      }
    });

    expect(fail).toBe(false);
  });

  test("main has max-width set", () => {
    const regex = new RegExp(/main\s*{[^}]+max-width\s*:/, "gm");
    expect(regex.test(css)).toBe(true);
  });

  test("two articles with class panel", () => {
    const panels = docs[INDEX].querySelectorAll("article.panel");
    expect(panels.length).toBeGreaterThanOrEqual(2);
  });

  test("left class used once inside both panel articles", () => {
    const panels = docs[INDEX].querySelectorAll("article.panel");

    panels.forEach(panel => {
      const lefts = panel.querySelectorAll(".left");
      expect(lefts.length).toBe(1);
    });
  });

  /* visual tests (not tested here):
    - hero overlay flex,
    - panel flex working
    - cards flex working  */
});
