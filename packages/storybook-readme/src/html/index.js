import addons, { makeDecorator } from '@storybook/addons';
import getDocsLayout from '../services/getDocsLayout';
import getParameters from '../services/getParameters';
import { CHANNEL_SET_SIDEBAR_DOCS } from '../const';

export const addReadme = makeDecorator({
  name: 'addReadme',
  parameterName: 'readme',
  wrapper: (getStory, context) => {
    const parameters = getParameters(context);
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
        footer: parameters.footer || '',
        header: parameters.header || '',
        md: parameters.sidebar,
        excludePropTables: parameters.excludePropTables || [],
        includePropTables: parameters.includePropTables || [],
        story,
      });

      channel.emit(CHANNEL_SET_SIDEBAR_DOCS, {
        layout: sidebarLayout,
        theme: parameters.theme,
        codeTheme: parameters.codeTheme,
      });
    }

    return story;
  },
});
