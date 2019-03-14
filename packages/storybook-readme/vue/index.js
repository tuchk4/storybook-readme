// import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from '../services/getDocsLayout';
import ReadmeContent from './components/ReadmeContent';
import { CHANNEL_SET_SIDEBAR_DOCS, LAYOUT_TYPE_MD } from '../const';
export var addReadme = makeDecorator({
  name: 'addReadme',
  parameterName: 'readme',
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    return {
      name: 'add-readme-hoc',
      data: function data() {
        var storyOptions = parameters || options || {};
        var config = typeof storyOptions === 'string' ? {
          md: storyOptions
        } : storyOptions;
        var story = getStory(context);
        var layout = storyOptions.layout ? storyOptions.layout : getDocsLayout({
          md: config.md || '',
          story: story
        });
        var channel = addons.getChannel();

        if (config.sidebar) {
          var sidebarLayout = getDocsLayout({
            md: config.sidebar,
            story: story
          });
          channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
            layout: sidebarLayout
          });
        }

        return {
          layout: layout,
          config: config
        };
      },
      components: {
        'readme-content': ReadmeContent
      },
      template: "\n        <readme-content \n          v-bind:layout=\"layout\"\n          v-bind:StoryPreview=\"config.StoryPreview\"/>"
    };
  }
});