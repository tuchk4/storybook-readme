import { configure, setAddon } from '@storybook/vue';
import { setOptions } from '@storybook/addon-options';
import infoAddon from '@storybook/addon-info';
// import Vue from 'vue';

// import MyButton from '../components/MyButton/MyButton.vue';
setAddon(infoAddon);

// Vue.component('my-button', MyButton);

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
