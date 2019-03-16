import { addParameters, addDecorator, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';
// import { themes } from '@storybook/theming';

addParameters({
  name: 'README addon',
  url: 'https://github.com/tuchk4/storybook-readme',
  options: {
    addonPanelInRight: true,
  },
  // options: {
  //   theme: themes.dark,
  // },
});

addDecorator(addReadme);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
