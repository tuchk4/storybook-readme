import React from 'react';
import addons from '@kadira/storybook-addons';
import { ADD_README_EVENT } from './constants';

const withReadme = function(readme, storyFn = null) {

  const emitAddReadme = ({ kind, story }) => {
    addons.getChannel().emit(ADD_README_EVENT, {
      kind,
      storyName: story,
      readme
    });
  };

  // if there is no storyFn - expect hat withReadme is usead as decorator
  // .addDecorator(withReadme(readme))
  // .addStory('Button', () => <Button />)
  if (storyFn === null) {
    return (storyFn, { kind, story }) => {
      emitAddReadme({ kind, story });
      return storyFn();
    }
  } else {
    return ({ kind, story }) => {
      emitAddReadme({ kind, story });
      return storyFn();
    };
  }
};

export default withReadme;
