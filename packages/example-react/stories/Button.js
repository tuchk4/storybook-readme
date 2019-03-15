import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';

import './withStoryPreview';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: ButtonDocs,
      sidebar: `<!-- PROPS -->`,
    },
  })
  .add('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ))
  .add('Alert Button', () => (
    <Button
      onClick={action('clicked')}
      alert={true}
      label={text('label', 'Hello Im Button')}
    />
  ))
  .add('Success Button', () => (
    <Button
      onClick={action('clicked')}
      success={true}
      label={text('label', 'Hello Im Button')}
    />
  ));
