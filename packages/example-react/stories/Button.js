import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Button', module)
  .addParameters({
    readme: {
      codeTheme: 'duotone-sea',
      content: ButtonReadme,
      sidebar: ButtonUsage,
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />)
  .add('Alert Button', () => (
    <Button variant="alert" label={'Hello Im Button'} />
  ))
  .add('Success Button', () => (
    <Button variant="success" label={'Hello Im Button'} />
  ));
