import { addParameters, addDecorator, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';
// import { themes } from '@storybook/theming';

import 'highlight.js/styles/shades-of-purple.css';

addParameters({
  name: 'README addon',
  url: 'https://github.com/tuchk4/storybook-readme',
  addonPanelInRight: true,
  // options: {
  //   theme: themes.dark,
  // },
});

addDecorator(addReadme);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
