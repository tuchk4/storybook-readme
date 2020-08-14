import React from 'react';
import { Placeholder, Link } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';

import ReadmeContent from '../ReadmeContent';

import {
  CHANNEL_SET_SIDEBAR_DOCS,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY_SOURCE,
} from '../../const';

const SIDEBAR_LAYOUT_TYPES = [
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY_SOURCE,
];

export default class ReadmeSidebar extends React.Component {
  state = {
    theme: {},
    codeTheme: null,
    layout: [],
  };

  mounted = false;
  stopListeningOnStory = null;

  componentDidMount() {
    this.mounted = true;

    const { channel, api } = this.props;
    channel.on(CHANNEL_SET_SIDEBAR_DOCS, this.setLayout);

    this.stopListeningOnStory = api.on(STORY_CHANGED, () => {
      if (this.mounted) {
        this.setLayout({ layout: [] });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;

    const { channel } = this.props;

    channel.removeListener(CHANNEL_SET_SIDEBAR_DOCS, this.setLayout);
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }
  }

  setLayout = ({ layout, theme, codeTheme }) => {
    this.setState({
      theme,
      layout,
      codeTheme,
    });
  };

  render() {
    if (!this.props.active) {
      return null;
    }

    if (this.state.layout.length === 0) {
      return (
        <Placeholder>
          <React.Fragment>No README found</React.Fragment>
          <React.Fragment>
            Learn how to{' '}
            <Link
              href="https://github.com/tuchk4/storybook-readme"
              target="_blank"
              withArrow={true}
            >
              add component's docs
            </Link>
          </React.Fragment>
        </Placeholder>
      );
    }

    return (
      <div style={{ padding: '8px' }}>
        <ReadmeContent
          types={SIDEBAR_LAYOUT_TYPES}
          layout={this.state.layout}
          codeTheme={this.state.codeTheme}
          theme={this.state.theme}
        />
      </div>
    );
  }
}
