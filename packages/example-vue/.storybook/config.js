import Vue from 'vue';
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { addReadme } from 'storybook-readme/vue';
import { themes } from '@storybook/theming';

addParameters({
  name: 'README addon',
  url: 'https://github.com/tuchk4/storybook-readme',
  addonPanelInRight: true,
  options: {
    theme: themes.dark,
  },
});

addDecorator(addReadme);

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
