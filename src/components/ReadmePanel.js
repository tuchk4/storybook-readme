import React from 'react';
import ReactDOM from 'react-dom';

import { ADD_DOC_EVENT } from '../constants';
import { setDocs, getDocs } from '../services/docsManager';
import highlight from '../../services/highlite';
import '../../styles/github-markdown-css';

const markdownContainerStyle = {
  margin: '16px',
};

export default class ReadmePanel extends React.Component {
  state = {
    docs: {},
  };

  waitForDocs = null;

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
      <div style={{ padding: '10px' }}>
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
