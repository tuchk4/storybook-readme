import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Content docs', module)
  .addParameters({
    readme: {
      content: ButtonReadme,
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />, {
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
  .addParameters({
    readme: {
      content: README,
    },
  })
  .add(..., {
    readme: {
      // will override
      content: CUSTOM_README,
    },
  })
  .add(...)
  .add(...)
\`\`\`
`,
    },
  })
  .add('Alert Button', () => (
    <Button varinat="alert" label={'Hello Im Button'} />
  ))
  .add('Success Button', () => (
    <Button varinat="success" label={'Hello Im Button'} />
  ))
  .add('Override Content docs', () => <Button label={'Hello Im Button'} />, {
    readme: {
      content: `This \`md\` is overriden.`,
    },
  });
