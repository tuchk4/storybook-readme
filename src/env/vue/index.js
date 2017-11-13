import MarkdownContainer from './components/MarkdownContainer.vue';
import Story from './components/Story.vue';
import StoryPreview from './components/StoryPreview.vue';
import FooterDocs from './components/FooterDocs.vue';

import commonHandler from '../common';

function renderStory({ storyFn, kind, story, docs, config }) {
  return {
    data() {
      return {
        story: storyFn({ kind, story }),
      };
    },

    render(h) {
      return h(
        Story,
        {
          props: {
            docs,
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

function withDocsCallAsHoc({ docs, config, storyFn }) {
  return ({ kind, story }) =>
    renderStory({
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function withDocsCallAsDecorator({ docs, config }) {
  return (storyFn, { kind, story }) =>
    renderStory({
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

export default {
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
