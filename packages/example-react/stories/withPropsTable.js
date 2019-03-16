import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('PropsTable', module).add(
  'Button',
  () => <Button label={'Hello Im Button'} />,
  {
    readme: {
      content: '<!-- STORY --><!-- PROPS -->',
    },
  },
);
