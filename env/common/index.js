import addons from '@storybook/addons';
import { ADD_DOC_EVENT } from '../../constants';

function renderStory(_ref) {
  var docs = _ref.docs,
    config = _ref.config,
    storyFn = _ref.storyFn,
    kind = _ref.kind,
    story = _ref.story;

  addons.getChannel().emit(ADD_DOC_EVENT, {
    kind: kind,
    storyName: story,
    docs: docs,
  });

  return storyFn({ kind: kind, story: story });
}

function withReadmeCallAsDecorator(_ref2) {
  var docs = _ref2.docs,
    config = _ref2.config;

  return function(storyFn, _ref3) {
    var kind = _ref3.kind,
      story = _ref3.story;
    return renderStory({
      docs: docs,
      config: config,
      storyFn: storyFn,
      kind: kind,
      story: story,
    });
  };
}

function withReadmeCallAsHoc(_ref4) {
  var docs = _ref4.docs,
    config = _ref4.config,
    storyFn = _ref4.storyFn;

  return function(_ref5) {
    var kind = _ref5.kind,
      story = _ref5.story;
    return renderStory({
      docs: docs,
      config: config,
      storyFn: storyFn,
      kind: kind,
      story: story,
    });
  };
}

export default {
  withReadme: {
    callAsDecorator: withReadmeCallAsDecorator,
    callAsHoc: withReadmeCallAsHoc,
  },
};
