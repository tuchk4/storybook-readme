import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonDocs from '../components/Button/DOCS.md';

storiesOf('Sidebar docs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: ButtonReadme,
    },
  })
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
        content: `
## Sidebar docs

<!-- STORY -->

\`sidebar\` added with \`addParameters\` will be applied for all stories in the same series.
To override it - define \`sidebar\` at \`add\` method.

\`\`\`js
import README from './README.md';
import CUSTOM_README from './CUSTOM_README.md';

storiesOf('Sidebar docs', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add(..., {
    readme: {
      // will override
      sidebar: CUSTOM_README,
    },
  })
  .add(...)
  .add(...)
\`\`\`
`,
      },
    },
  )
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
  ))
  .add(
    'Override Sidebar docs',
    () => (
      <Button
        onClick={action('clicked')}
        success={true}
        label={text('label', 'Hello Im Button')}
      />
    ),
    {
      readme: {
        content: `This \`sidebar\` is overriden.`,
        sidebar: `
## SuccesButton

Use \`SuccessButton\` for form / filters submit actions only.
        `,
      },
    },
  );
