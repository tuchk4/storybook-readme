import React from 'react';
import addons from '@storybook/addons';
import ReadmePanel from './components/ReadmePanel';

var ADDON_ID = 'REACT_STORYBOOK/readme';
var PANEL_NAME = 'REACT_STORYBOOK/readme/panel';
var PANEL_TITLE = 'README';

addons.register(ADDON_ID, function(api) {
  addons.addPanel(PANEL_NAME, {
    title: PANEL_TITLE,
    render: function render() {
      return React.createElement(ReadmePanel, {
        channel: addons.getChannel(),
        onStory: api.onStory,
      });
    },
  });
});
