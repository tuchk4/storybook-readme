import { configure, setAddon } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';
import infoAddon from '@kadira/react-storybook-addon-info';

setAddon(infoAddon);

setOptions({
  name: 'README addon',
  url: 'https://github.com/tuchk4/storybook-readme',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true
});

function loadStories() {
  require('../example/stories');
}

configure(loadStories, module);
