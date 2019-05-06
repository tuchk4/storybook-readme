import { addParameters, addDecorator, configure } from '@storybook/html';
import { addReadme } from 'storybook-readme/html';
import { themes, create } from '@storybook/theming';

const basicTheme = create({
  base: 'light',
  brandTitle: 'README addon',
  brandUrl: 'https://github.com/tuchk4/storybook-readme',
  brandImage: null,
});

addParameters({
  options: {
    showPanel: true,
    panelPosition: 'right',
    theme: basicTheme,
    // theme: themes.dark,
  },
  readme: {
    // You can set the global code theme here.
    codeTheme: 'github',
  },
});

addDecorator(addReadme);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
