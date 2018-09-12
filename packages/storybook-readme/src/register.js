import React from 'react';
import addons from '@storybook/addons';
import ReadmePanel from './components/ReadmePanel';

const ADDON_ID = 'REACT_STORYBOOK/readme';
const PANEL_NAME = 'REACT_STORYBOOK/readme/panel';
const PANEL_TITLE = 'README';

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: ({ active }) => {
      return active ? (
        <ReadmePanel channel={addons.getChannel()} onStory={api.onStory} />
      ) : null;
    },
  });
});
