import React from 'react';

import { ADD_DOC_EVENT } from '../constants';
import { setDocs, getDocs } from '../services/docsManager';
import highlight from '../services/highlite';
import '../styles/github-markdown-css';

const markdownContainerStyle = {
  margin: '16px',
};

export default class ReadmePanel extends React.Component {
  state = {
    docs: {},
  };

  waitForDocs = null;
  ref = null;

  constructor(...props) {
    super(...props);

    this.props.channel.on(ADD_DOC_EVENT, ({ kind, storyName, docs }) => {
      setDocs(kind, storyName, docs);

      if (
        this.waitForDocs &&
        this.waitForDocs[0] == kind &&
        this.waitForDocs[1] == storyName
      ) {
        this.showDocs(kind, storyName);
        this.waitForDocs = null;
      }
    });
  }

  componentDidMount() {
    const { onStory } = this.props;
    this.stopListeningOnStory = onStory((kind, storyName) => {
      this.showDocs(kind, storyName);
    });
  }

  componentDidUpdate() {
    if (this.ref) {
      highlight(this.ref, {
        withJSX: true,
      });
    }
  }

  showDocs(kind, storyName) {
    const docs = getDocs(kind, storyName);

    if (!docs.length) {
      this.waitForDocs = [kind, storyName];
    }

    this.setState({
      docs,
    });
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
  }

  handleRef = ref => {
    this.ref = ref;

    if (this.ref) {
      this.ref.parentNode.style.minWidth = '0';

      highlight(this.ref, {
        withJSX: true,
      });
    }
  };

  render() {
    const { docs: { docsAfterPreview, docsBeforePreview } } = this.state;

    if (!docsAfterPreview && !docsBeforePreview) {
      return (
        <div style={{ padding: '10px' }}>
          <div className={'markdown-body'}>
            <p>README.md was not added</p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '10px', minWidth: '0' }} ref={this.handleRef}>
        {docsBeforePreview &&
          docsBeforePreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}
        {docsAfterPreview &&
          docsAfterPreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}
      </div>
    );
  }
}
