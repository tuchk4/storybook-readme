import styleFactory from './styleFactory';

let insert = styleFactory('highlight-code-theme');

import a11yDark from './prismCodeThemes/a11y-dark.css';
import atomDark from './prismCodeThemes/atom-dark.css';
import base16AteliersulphurpoolLight from './prismCodeThemes/base16-ateliersulphurpool.light.css';
import cb from './prismCodeThemes/cb.css';
import darcula from './prismCodeThemes/darcula.css';
import duotoneDark from './prismCodeThemes/duotone-dark.css';
import duotoneEarth from './prismCodeThemes/duotone-earth.css';
import duotoneForest from './prismCodeThemes/duotone-forest.css';
import duotoneLight from './prismCodeThemes/duotone-light.css';
import duotoneSea from './prismCodeThemes/duotone-sea.css';
import duotoneSpace from './prismCodeThemes/duotone-space.css';
import ghcolors from './prismCodeThemes/ghcolors.css';
import github from './prismCodeThemes/github.css';
import hopscotch from './prismCodeThemes/hopscotch.css';
import pojoaque from './prismCodeThemes/pojoaque.css';
import vs from './prismCodeThemes/vs.css';
import xonokai from './prismCodeThemes/xonokai.css';

// const availableCodeThemes = [
//   'a11y-dark',
//   'atom-dark',
//   'base16-ateliersulphurpool.light',
//   'cb',
//   'darcula',
//   'duotone-dark',
//   'duotone-earth',
//   'duotone-forest',
//   'duotone-light',
//   'duotone-sea',
//   'duotone-space',
//   'ghcolors',
//   'github',
//   'hopscotch',
//   'pojoaque',
//   'vs',
//   'xonokai',
// ];
const availableCodeThemes = {
  'a11y-dark': a11yDark,
  'atom-dark': atomDark,
  'base16-ateliersulphurpool.light': base16AteliersulphurpoolLight,
  cb: cb,
  darcula: darcula,
  'duotone-dark': duotoneDark,
  'duotone-earth': duotoneEarth,
  'duotone-forest': duotoneForest,
  'duotone-light': duotoneLight,
  'duotone-sea': duotoneSea,
  'duotone-space': duotoneSpace,
  ghcolors: ghcolors,
  github: github,
  hopscotch: hopscotch,
  pojoaque: pojoaque,
  vs: vs,
  xonokai: xonokai,
};

export default function insertCodeThemeCss({ codeTheme }) {
  if (!codeTheme) {
    return;
  }

  // if (!availableCodeThemes.includes(codeTheme)) {
  if (!availableCodeThemes[codeTheme]) {
    codeTheme = 'github';

    console.warn(`
storybook-readme: code theme "${codeTheme}" is not available.

NOTE: in 5.0.2 changed highlight library to PrismJS so code theme also changed.  
Available themes:: ${Object.keys(availableCodeThemes).join(', ')}.
https://github.com/PrismJS/prism-themes

`);
  }

  insert({
    styles: availableCodeThemes[codeTheme],
  });
  // import(`./prismCodeThemes/${codeTheme}.css.js`).then(t => {
  //   insert({
  //     styles: t.default,
  //   });
  // });
}
