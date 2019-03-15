import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';

storiesOf('PropsTable', module)
  .addDecorator(withKnobs)
  .add(
    'Button',
    () => (
      <Button
        onClick={action('clicked')}
        alert={boolean('alert', false)}
        success={boolean('success', false)}
        label={text('label', 'Hello Im Button')}
      />
    ),
    {
      readme: {
        content: '<!-- STORY --><!-- PROPS -->',
      },
    },
  );
