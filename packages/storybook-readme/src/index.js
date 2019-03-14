import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from './services/getDocsLayout';
import * as config from './services/config';
import ReadmeContent from './components/ReadmeContent';

import { CHANNEL_SET_SIDEBAR_DOCS, LAYOUT_TYPE_MD } from './const';

export { default as withDocs } from './with-docs';
export { default as withReadme } from './with-readme';
export { doc } from './backwardCompatibility';

export const addHeader = md => {
  config.addHeader(md);
};

export const addFooter = md => {
  config.addFooter(md);
};

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

    const story = <React.Fragment>{getStory(context)}</React.Fragment>;
    const layout = storyOptions.layout
      ? storyOptions.layout
      : getDocsLayout({
          md: config.content || '',
          story,
        });

    const channel = addons.getChannel();

    const codeTheme = config.codeTheme || 'github';

    if (config.sidebar) {
      const sidebarLayout = getDocsLayout({
        md: config.sidebar,
        story,
      });

      channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
        layout: sidebarLayout,
        theme,
        codeTheme,
      });
    }

    return (
      <ReadmeContent
        layout={layout}
        theme={theme}
        codeTheme={codeTheme}
        StoryPreview={config.StoryPreview}
        withPreview={config.content}
      />
    );
  },
});
