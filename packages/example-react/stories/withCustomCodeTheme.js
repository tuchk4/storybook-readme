import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';

import GlobalCodeThemeMD from './GlobalCodeTheme.md';
import LocalCodeThemeMD from './LocalCodeTheme.md';

storiesOf('Custom Code Theme', module)
  .addParameters({
    readme: {
      content: GlobalCodeThemeMD,
      sidebar: ButtonReadme,
    },
  })
  .add('Global (all stories)', () => null)
  .addParameters({
    readme: {
      codeTheme: 'dracula',
      content: LocalCodeThemeMD,
      sidebar: ButtonReadme,
    },
  })
  .add('Local (specific story)', () => null);
