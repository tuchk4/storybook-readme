import React from 'react';
import { storiesOf } from '@storybook/react';

// import Button from '../components/Button';

import Multiple from './Multiple.md';

const ButtonReadme = '# hi';

storiesOf('Button', module)
  .addParameters({
    readme: {
      content: Multiple,
    },
  })

  .add('README.md', () => {
    return null;
  });
