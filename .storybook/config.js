import { configure, setAddon } from '@kadira/storybook';
import { setOptions } from '@kadira/storybook-addon-options';
import infoAddon from '@kadira/react-storybook-addon-info';
import readmeAddon from '../src/addon';

setAddon(infoAddon);
setAddon(readmeAddon);

setOptions({
  name: 'README addon',
  url: 'http://bitbucket.loc/projects/JS/repos/pl-react-components/browse',
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
