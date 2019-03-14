import React from 'react';

import addons from '@storybook/addons';
import { CHANNEL_SET_SIDEBAR_DOCS } from '../../../const';
import getDocsLayout from '../../../services/getDocsLayout';

function withReadmeCallAsDecorator({ md }) {
  return (story, context) => {
    const storyComponent = <React.Fragment>{story(context)}</React.Fragment>;

    const layout = getDocsLayout({
      md,
      story: storyComponent,
    });

    addons.getChannel().emit(CHANNEL_SET_SIDEBAR_DOCS, {
      layout,
      theme: {},
    });

    return storyComponent;
  };
}

function withReadmeCallAsHoc({ md, story }) {
  return context => {
    const storyComponent = <React.Fragment>{story(context)}</React.Fragment>;

    const layout = getDocsLayout({
      md,
      story: storyComponent,
    });

    addons.getChannel().emit(CHANNEL_SET_SIDEBAR_DOCS, {
      layout,
      theme: {},
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
