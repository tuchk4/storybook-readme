import addons from '@storybook/addons';
import { ADD_DOC_EVENT } from '../../constants';

function renderStory({ docs, config, storyFn, kind, story }) {
  addons.getChannel().emit(ADD_DOC_EVENT, {
    kind,
    storyName: story,
    docs,
  });

  return storyFn({ kind, story });
}

function withReadmeCallAsDecorator({ docs, config }) {
  return (storyFn, { kind, story }) =>
    renderStory({
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function withReadmeCallAsHoc({ docs, config, storyFn }) {
  return ({ kind, story }) =>
    renderStory({
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

export default {
  withReadme: {
    callAsDecorator: withReadmeCallAsDecorator,
    callAsHoc: withReadmeCallAsHoc,
  },
};
