import { configure, setAddon } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: 'README addon',
  url: 'https://github.com/tuchk4/storybook-readme',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
});

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
