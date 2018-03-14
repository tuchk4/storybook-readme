import MarkdownContainer from './components/MarkdownContainer';
import Story from './components/Story';
import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

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

function doc({ docs, config }) {
  return ({ kind, story }) =>
    renderStory({
      docs: {},
      config: {
        ...config,
        PreviewComponent: {
          template: `<div><slot></slot></div>`,
        },
      },
      storyFn: (k, v) => {
        return {
          data() {
            return {
              docs,
            };
          },
          components: {
            MarkdownContainer,
          },
          template: `<markdown-container :docs="docs" />`,
        };
      },
      kind,
      story,
    });
}

export default {
  doc,
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
