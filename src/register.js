import React from 'react';
import addons from '@storybook/addons';
import ReadmePanel from './components/readme-panel';

const ADDON_ID = 'tuhck4/readme';
const PANEL_NAME = 'tuchk4/readme/panel';
const PANEL_TITLE = 'README';

addons.register(ADDON_ID, api => {
  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: () =>
      <ReadmePanel channel={addons.getChannel()} onStory={api.onStory} />,
  });
});
