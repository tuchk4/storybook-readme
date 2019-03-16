import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Custom Code Theme', module)
  .addParameters({
    readme: {
      codeTheme: 'atelier-cave-dark',
      content: ButtonReadme,
      sidebar: ButtonReadme,
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />);
