import React from 'react';
import PropTypes from 'prop-types';
import ReadmeContainer from './readme-container';
import { ADD_README_EVENT } from '../constants';
import { setReadme, getReadme } from '../readme-manager';

const markdownContainerStyle = {
  margin: '16px',
};

export default class ReadmePanel extends React.Component {
  static propTypes = {
    getReadme: PropTypes.func,
    onStory: PropTypes.func,
    channel: PropTypes.object,
  };

  state = {
    readme: [],
  };

  waitForReadme = null;

  constructor(...props) {
    super(...props);

    this.props.channel.on(ADD_README_EVENT, ({ kind, storyName, readme }) => {
      setReadme(kind, storyName, readme);

      if (
        this.waitForReadme &&
        this.waitForReadme[0] == kind &&
        this.waitForReadme[1] == storyName
      ) {
        this.showReadme(kind, storyName);
        this.waitForReadme = null;
      }
    });
  }

  componentDidMount() {
    const { onStory } = this.props;
    this.stopListeningOnStory = onStory((kind, storyName) => {
      this.showReadme(kind, storyName);
    });
  }

  showReadme(kind, storyName) {
    const readme = getReadme(kind, storyName);

    if (!readme.length) {
      this.waitForReadme = [kind, storyName];
    }

    this.setState({
      readme,
    });
  }

  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
  }

  render() {
    const { readme } = this.state;

    if (!readme.length) {
      return (
        <ReadmeContainer
          style={markdownContainerStyle}
          markdown={['README.md was not added']}
        />
      );
    }

    return <ReadmeContainer style={markdownContainerStyle} markdown={readme} />;
  }
}
