const fs = require('fs');
const path = require('path');

const dir = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'node_modules',
  'prism-themes',
  'themes'
);

const template = fs
  .readFileSync(path.resolve(__dirname, '_themeTemplate'))
  .toString();

fs.readdirSync(dir).forEach(name => {
  const themePath = path.resolve(dir, name);
  const content = fs.readFileSync(themePath).toString();

  if (path.extname(name) !== '.css') {
    return;
  }

  const theme = template
    .replace(
      '%css%',
      `
  
${content}

  `
    )
    .replace('%name%', name.replace('.css', ''));

  fs.writeFileSync(
    path.resolve(
      __dirname,
      '..',
      'src',
      'styles',
      'prismCodeThemes',
      `${name.replace('prism-', '')}.js`
    ),
    theme
  );
});
