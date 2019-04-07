import { addParameters, addDecorator, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';
// import { themes } from '@storybook/theming';

addParameters({
  options: {
    name: 'README addon',
    url: 'https://github.com/tuchk4/storybook-readme',
    showPanel: true,
    panelPosition: 'right',
    // theme: themes.dark,
  },
  readme: {
    // You can set the global code theme here. 
    codeTheme: 'dracula'
  }
});

addDecorator(addReadme);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
