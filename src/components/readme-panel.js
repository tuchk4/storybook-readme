import React, { PropTypes } from 'react';
import Markdown from './markdown';
import { setReadme, getReadme } from '../readme-manager';
import ReadmeContainer from './readme-container';
import { ADD_README_EVENT } from '../constants';

export default class ReadmePanel extends React.Component {
  static propTypes = {
    getReadme: PropTypes.func,
    onStory: PropTypes.func,
    channel: PropTypes.object
  };

  state = {
    readme: []
  };

  waitForReadme = null;

  constructor(...props) {
    super(...props);

    this.props.channel.on(ADD_README_EVENT, ({ kind, storyName, readme }) => {
      setReadme(kind, storyName, readme);

      if (this.waitForReadme
          && this.waitForReadme[0] == kind
          && this.waitForReadme[1] == storyName) {

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
      readme
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
        <ReadmeContainer>
          README.md was not added
        </ReadmeContainer>
      );
    }

    // const renderers = {
    //   CodeBlock
    // };

    return (
      <div>
        {
          readme.map((md, index) => {
            return (
              <ReadmeContainer key={index}>
                <Markdown source={md} />
              </ReadmeContainer>
            )
          })
        }
      </div>
    );
  }
}
