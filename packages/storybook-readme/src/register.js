import React from 'react';
import addons from '@storybook/addons';
import ReadmeSidebar from './components/ReadmeSidebar';

const ADDON_ID = 'REACT_STORYBOOK/readme';
const PANEL_NAME = 'REACT_STORYBOOK/readme/panel';
const PANEL_TITLE = 'README';

addons.register(ADDON_ID, api => {
  const channel = addons.getChannel();

  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: props => {
      // compatibility with storybook@3.x
      const active = !props || props.active;

      return (
        <ReadmeSidebar
          key={'ReadmeSidebar'}
          api={api}
          active={active}
          channel={channel}
          onStory={api.onStory}
        />
      );
    },
  });
});
