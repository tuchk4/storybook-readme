import React from 'react';
import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from './services/getDocsLayout';
import * as config from './services/config';
import getParameters from './services/getParameters';
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
  wrapper: (getStory, context) => {
    const parameters = getParameters(context);

    const story = <React.Fragment>{getStory(context)}</React.Fragment>;
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

    return (
      <ReadmeContent
        layout={layout}
        withPreview={!!parameters.content}
        theme={parameters.theme}
        codeTheme={parameters.codeTheme}
        StoryPreview={parameters.StoryPreview}
        HeaderPreview={parameters.HeaderPreview}
        DocPreview={parameters.DocPreview}
        FooterPreview={parameters.FooterPreview}
      />
    );
  },
});
