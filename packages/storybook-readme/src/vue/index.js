// import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from '../services/getDocsLayout';
import ReadmeContent from './components/ReadmeContent';

import { CHANNEL_SET_SIDEBAR_DOCS, LAYOUT_TYPE_MD } from '../const';

export const addReadme = makeDecorator({
  name: 'addReadme',
  parameterName: 'readme',
  wrapper: (getStory, context, { options, parameters }) => {
    return {
      name: 'add-readme-hoc',
      data() {
        const storyOptions = parameters || options || {};
        const config =
          typeof storyOptions === 'string'
            ? { md: storyOptions }
            : storyOptions;

        const story = getStory(context);
        const layout = storyOptions.layout
          ? storyOptions.layout
          : getDocsLayout({
              md: config.md || '',
              story,
            });

        const channel = addons.getChannel();

        if (config.sidebar) {
          const sidebarLayout = getDocsLayout({
            md: config.sidebar,
            story,
          });

          channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
            layout: sidebarLayout,
          });
        }

        return {
          layout,
          config,
        };
      },
      components: {
        'readme-content': ReadmeContent,
      },
      template: `
        <readme-content 
          v-bind:layout="layout"
          v-bind:StoryPreview="config.StoryPreview"/>`,
    };
  },
});
