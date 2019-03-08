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

  componentDidMount() {
    this.props.channel.on(ADD_DOC_EVENT, this.addDoc);

    this.stopListeningOnStory = this.props.onStory(id => {
      this.showDocs(id);
    });
    if (this.props.currentStoryId) {
      this.showDocs(this.props.currentStoryId);
    }
  }

  componentDidUpdate() {
    if (this.ref) {
      highlight(this.ref, {
        withJSX: true,
      });
    }
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
    this.props.channel.removeListener(ADD_DOC_EVENT, this.addDoc);
  }

  showDocs(storyId) {
    const docs = getDocs(storyId);

    if (!docs.length) {
      this.waitForDocs = storyId;
    }

    this.setState({
      docs,
    });
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

  addDoc = ({ kind, storyName, docs }) => {
    const { sanitize } = this.props;
    const storyId = sanitize(kind) + '--' + sanitize(storyName);

    setDocs(storyId, docs);

    if (this.waitForDocs && this.waitForDocs == storyId) {
      this.showDocs(storyId);
      this.waitForDocs = null;
    }
  };

  render() {
    if (!this.props.active) {
      return null;
    }

    const {
      docs: { docsAfterPreview, docsBeforePreview },
    } = this.state;

    if (!docsAfterPreview && !docsBeforePreview) {
      return null;
      // return (
      //   <div style={{ padding: '10px' }}>
      //     <div className={'markdown-body'}>
      //       <p>README.md was not added</p>
      //     </div>
      //   </div>
      // );
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
