import React from 'react';
import addons from '@kadira/storybook-addons';
import { ADD_README_EVENT } from './constants';

const withReadme = function(readme, storyFn) {
  const channel = addons.getChannel();

  return function({ kind, story}) {
    channel.emit(ADD_README_EVENT, {
      kind,
      storyName: story,
      readme
    });

    return storyFn();
  }
};

export default withReadme;
