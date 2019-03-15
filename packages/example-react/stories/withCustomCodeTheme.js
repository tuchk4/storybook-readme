import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, ƒ } from '@storybook/addon-knobs';
import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';

storiesOf('Custom Code Theme', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      codeTheme: 'atelier-cave-dark',
      content: ButtonReadme,
      sidebar: ButtonReadme,
    },
  })
  .add('Button', () => (
    <Button
      onClick={action('clicked')}
      alert={boolean('alert', false)}
      success={boolean('success', false)}
      label={text('label', 'Hello Im Button')}
    />
  ));
