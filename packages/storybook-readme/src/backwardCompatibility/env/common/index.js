import addons from '@storybook/addons';
import { CHANNEL_SET_SIDEBAR_DOCS } from '../../../const';
import getDocsLayout from '../../../services/getDocsLayout';
import getParameters from '../../../services/getParameters';

function withReadmeCallAsDecorator({ md }) {
  return (story, context) => {
    const storyComponent = story(context);

    const layout = getDocsLayout({
      md,
      story: storyComponent,
    });

    const parameters = getParameters(context);
    addons.getChannel().emit(CHANNEL_SET_SIDEBAR_DOCS, {
      layout,
      theme: parameters.theme,
      codeTheme: parameters.codeTheme,
    });

    return storyComponent;
  };
}

function withReadmeCallAsHoc({ md, story }) {
  return context => {
    const storyComponent = story(context);

    const layout = getDocsLayout({
      md,
      story: storyComponent,
    });

    const parameters = getParameters(context);
    addons.getChannel().emit(CHANNEL_SET_SIDEBAR_DOCS, {
      layout,
      theme: parameters.theme,
      codeTheme: parameters.codeTheme,
    });

    return storyComponent;
  };
}

export default {
  withReadme: {
    callAsDecorator: withReadmeCallAsDecorator,
    callAsHoc: withReadmeCallAsHoc,
  },
};
