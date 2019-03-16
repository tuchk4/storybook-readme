import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Custom Theme', module)
  .addParameters({
    readme: {
      content: ButtonReadme,
      theme: {
        textColor: 'blue',
      },
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />);
