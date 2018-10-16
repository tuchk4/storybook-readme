import React from 'react';
import ReactDOM from 'react-dom';
import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

import commonHandler from '../common';
import highlight from '../../services/highlite';

class Story extends React.Component {
  ref = null;

  state = {
    asProxy: false,
  };

  highlight() {
    if (this.ref) {
      highlight(this.ref, {
        withJSX: true,
      });
    }
  }

  handleRef = ref => {
    this.ref = ref;
    this.highlight();

    if (this.ref) {
      const childrenReadmeDocs = this.ref.querySelector(
        '.storybook-readme-story'
      );

      if (childrenReadmeDocs) {
        this.setState({
          asProxy: true,
        });
      }
    }
  };

  componentDidUpdate() {
    this.highlight();
  }

  render() {
    const {
      storyFn,
      story,
      kind,
      config,
      docs: { docsAfterPreview, docsBeforePreview },
    } = this.props;

    const PreviewComponent = config.PreviewComponent || StoryPreview;
    const FooterComponent = config.FooterComponent || FooterDocs;

    if (this.state.asProxy) {
      return storyFn({ kind, story });
    }

    return (
      <div
        className={'storybook-readme-story'}
        style={{ padding: '8px' }}
        ref={this.handleRef}
      >
        {docsBeforePreview &&
          docsBeforePreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}

        <PreviewComponent>{storyFn({ kind, story })}</PreviewComponent>

        {docsAfterPreview &&
          docsAfterPreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}

        {config.docsAtFooter && (
          <FooterComponent>
            <div
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: config.docsAtFooter }}
            />
          </FooterComponent>
        )}
      </div>
    );
  }
}

function withDocsCallAsHoc({ docs, config, storyFn }) {
  return ({ kind, story }) =>
    React.createElement(Story, {
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function withDocsCallAsDecorator({ docs, config }) {
  return (storyFn, { kind, story }) =>
    React.createElement(Story, {
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function doc({ docs, config }) {
  return ({ kind, story }) =>
    React.createElement(Story, {
      docs: {},
      config: {
        ...config,
        PreviewComponent: ({ children }) => <div>{children}</div>,
      },
      storyFn: () =>
        docs.map((doc, index) => (
          <div
            key={index}
            className={'markdown-body'}
            dangerouslySetInnerHTML={{ __html: doc }}
          />
        )),
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
