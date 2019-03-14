import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from './services/getDocsLayout';
import ReadmeContent from './components/ReadmeContent';

import { CHANNEL_SET_SIDEBAR_DOCS, LAYOUT_TYPE_MD } from './const';

import insertGithubMarkdownCSS from './styles/github-markdown-css';
import insertHighlightJsThemeCSS from './styles/highlightjs-github-css';

export { default as withDocs } from './with-docs';
export { default as withReadme } from './with-readme';

export const addReadme = makeDecorator({
  name: 'addReadme',
  parameterName: 'readme',
  wrapper: (getStory, context, { options, parameters }) => {
    const storyOptions = parameters || options || {};
    const config =
      typeof storyOptions === 'string'
        ? { content: storyOptions }
        : storyOptions;

    const theme = {
      ...(context.parameters
        ? context.parameters.options
          ? context.parameters.options.theme
          : {}
        : {}),
      ...config.theme,
    };

    insertGithubMarkdownCSS(theme);
    insertHighlightJsThemeCSS(theme);

    const story = <React.Fragment>{getStory(context)}</React.Fragment>;
    const layout = storyOptions.layout
      ? storyOptions.layout
      : getDocsLayout({
          md: config.content || '',
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
        theme,
      });
    }

    return <ReadmeContent layout={layout} StoryPreview={config.StoryPreview} />;
  },
});
