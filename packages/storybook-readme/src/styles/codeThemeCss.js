import styleFactory from './styleFactory';

let insert = styleFactory('highlight-code-theme');

const availableCodeThemes = [
  'a11y-dark',
  'atom-dark',
  'base16-ateliersulphurpool.light',
  'cb',
  'darcula',
  'duotone-dark',
  'duotone-earth',
  'duotone-forest',
  'duotone-light',
  'duotone-sea',
  'duotone-space',
  'ghcolors',
  'github',
  'hopscotch',
  'pojoaque',
  'vs',
  'xonokai',
];

export default function insertCodeThemeCss({ codeTheme }) {
  if (!codeTheme) {
    return;
  }

  if (!availableCodeThemes.includes(codeTheme)) {
    codeTheme = 'github';

    console.warn(`
storybook-readme: code theme "${codeTheme}" is not available.

NOTE: in 5.0.2 changed highlight library to PrismJS so code theme also changed.  
Available themes:: ${availableCodeThemes.join(', ')}.
https://github.com/PrismJS/prism-themes

`);
  }
  // import(`./codeThemes/${codeTheme}.css.js`).then(t => {
  import(`./prismCodeThemes/${codeTheme}.css.js`).then(t => {
    insert({
      styles: t.default,
    });
  });
}
