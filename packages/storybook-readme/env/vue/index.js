import MarkdownContainer from './components/MarkdownContainer';
import Story from './components/Story';
import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

import commonHandler from '../common';

function renderStory(_ref) {
  var storyFn = _ref.storyFn,
    kind = _ref.kind,
    story = _ref.story,
    docs = _ref.docs,
    config = _ref.config;

  return {
    data: function data() {
      return {
        story: storyFn({ kind: kind, story: story }),
      };
    },
    render: function render(h) {
      return h(
        Story,
        {
          props: {
            docs: docs,
          },
        },
        [
          h(config.PreviewComponent ? config.PreviewComponent : StoryPreview, [
            h(this.story),
          ]),
          h(
            config.FooterComponent ? config.FooterComponent : FooterDocs,
            {
              slot: 'footer',
            },
            [
              h(MarkdownContainer, {
                props: {
                  docs: [config.docsAtFooter],
                },
              }),
            ]
          ),
        ]
      );
    },
  };
}

function withDocsCallAsHoc(_ref2) {
  var docs = _ref2.docs,
    config = _ref2.config,
    storyFn = _ref2.storyFn;

  return function(_ref3) {
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

function withDocsCallAsDecorator(_ref4) {
  var docs = _ref4.docs,
    config = _ref4.config;

  return function(storyFn, _ref5) {
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
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
