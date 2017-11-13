import React from 'react';
import ReactDOM from 'react-dom';
import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

import commonHandler from '../common';
import highlight from '../../services/highlite';

class Story extends React.Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);

    highlight(el, {
      withJSX: true,
    });
  }

  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this);

    highlight(el, {
      withJSX: true,
    });
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

    return (
      <div style={{ padding: '10px' }}>
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

export default {
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
