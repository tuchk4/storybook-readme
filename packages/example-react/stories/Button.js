import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

import './withStoryPreview';

storiesOf('Button', module)
  .addParameters({
    readme: {
      content: ButtonUsage,
      sidebar: `<!-- PROPS -->`,
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />)
  .add('Alert Button', () => (
    <Button variant="alert" label={'Hello Im Button'} />
  ))
  .add('Success Button', () => (
    <Button variant="success" label={'Hello Im Button'} />
  ));
