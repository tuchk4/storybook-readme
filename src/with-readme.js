import React from 'react';
import addons from '@storybook/addons';
import { ADD_README_EVENT } from './constants';

const withReadme = function(readme, storyFn = null) {
  const emitAddReadme = ({ kind, story }) => {
    addons.getChannel().emit(ADD_README_EVENT, {
      kind,
      storyName: story,
      readme,
    });
  };

  if (storyFn === null) {
    return (storyFn, { kind, story }) => {
      emitAddReadme({ kind, story });
      return storyFn();
    };
  } else {
    return ({ kind, story }) => {
      emitAddReadme({ kind, story });
      return storyFn();
    };
  }
};

export default withReadme;
