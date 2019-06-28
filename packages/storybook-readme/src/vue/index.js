import Vue from 'vue';
import Vuex from 'vuex';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from '../services/getDocsLayout';
import getParameters from '../services/getParameters';

import ReadmeContent from './components/ReadmeContent';

import { CHANNEL_SET_SIDEBAR_DOCS } from '../const';
import * as config from '../services/config';

export const configureReadme = parameters => {
  config.addHeader(parameters.header);
  config.addFooter(parameters.footer);

  config.addStoryPreview(parameters.StoryPreview);
  config.addDocPreview(parameters.DocPreview);
  config.addHedaerPreview(parameters.HeaderPreview);
  config.addFooterPreview(parameters.FooterPreview);
};

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
          return store.state.withPreview; // || !!parameters.content;
        },
      },
      data() {
        const story = getStory(context);
        const layout = parameters.layout
          ? parameters.layout
          : getDocsLayout({
              footer: parameters.footer || '',
              header: parameters.header || '',
              md: parameters.content || '',
              excludePropTables: parameters.excludePropTables || [],
              includePropTables: parameters.includePropTables || [],
              story,
            });

        const channel = addons.getChannel();

        if (parameters.sidebar) {
          const sidebarLayout = getDocsLayout({
            md: parameters.sidebar,
            excludePropTables: parameters.excludePropTables || [],
            includePropTables: parameters.includePropTables || [],
            story,
          });

          channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
            layout: sidebarLayout,
            theme: parameters.theme,
            codeTheme: parameters.highlightSidebar
              ? parameters.codeTheme
              : null,
            config: config.getConfig(),
          });
        }

        return {
          layout,
          parameters: {
            ...parameters,
            codeTheme: parameters.highlightContent
              ? parameters.codeTheme
              : null,
          },
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
