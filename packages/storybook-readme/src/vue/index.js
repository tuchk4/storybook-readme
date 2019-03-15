import Vue from 'vue';
import Vuex from 'vuex';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from '../services/getDocsLayout';
import getParameters from '../services/getParameters';

import ReadmeContent from './components/ReadmeContent';

import { CHANNEL_SET_SIDEBAR_DOCS } from '../const';
import * as config from '../services/config';

export const addHeader = md => {
  config.addHeader(md);
};

export const addFooter = md => {
  config.addFooter(md);
};

Vue.use(Vuex);

export const addReadme = makeDecorator({
  name: 'addReadme',
  parameterName: 'readme',
  wrapper: (getStory, context) => {
    const store = new Vuex.Store({
      state: {
        withPreview: true,
      },
      mutations: {
        notify(state) {
          state.withPreview = false;
        },
      },
    });

    const parameters = getParameters(context);

    return {
      name: 'add-readme-hoc',
      store,
      computed: {
        withPreview() {
          return store.state.withPreview || !!parameters.content;
        },
      },
      data() {
        const story = getStory(context);
        const layout = parameters.layout
          ? parameters.layout
          : getDocsLayout({
              md: parameters.content || '',
              story,
            });

        const channel = addons.getChannel();

        if (parameters.sidebar) {
          const sidebarLayout = getDocsLayout({
            md: parameters.sidebar,
            story,
          });

          channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
            layout: sidebarLayout,
            theme: parameters.theme,
            codeTheme: parameters.codeTheme,
          });
        }

        return {
          layout,
          parameters,
        };
      },
      components: {
        'readme-content': ReadmeContent,
      },
      template: `
        <readme-content 
          v-bind:layout="layout"
          v-bind:withPreview="withPreview"
          v-bind:theme="parameters.theme"
          v-bind:codeTheme="parameters.codeTheme"
          v-bind:HeaderPreview="parameters.HeaderPreview"
          v-bind:StoryPreview="parameters.StoryPreview"
          v-bind:FooterPreview="parameters.FooterPreview"
          v-bind:DocPreview="parameters.DocPreview" />`,
    };
  },
});
