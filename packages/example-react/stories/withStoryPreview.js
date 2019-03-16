import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Story Preview', module)
  .addParameters({
    readme: {
      sidebar: ButtonReadme,
      StoryPreview: ({ children }) => (
        <div
          style={{
            border: '1px dashed #ccc',
            padding: '8px 16px',
            margin: '8px 0',
            textAlign: 'center',
          }}
        >
          {children}
        </div>
      ),
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />, {
    readme: {
      content: `
## StoryPreview

\`StoryPreview\` added with \`addParameters\` will be applied for all stories in the same series.
To override it - define \`StoryPreview\` at \`add\` method.

`,
    },
  })
  .add('Alert Button', () => <Button label={'Hello Im Button'} />)
  .add('Success Button', () => <Button label={'Hello Im Button'} />)
  .add('Override Story Preview', () => <Button label={'Hello Im Button'} />, {
    readme: {
      content: `This \`StoryPreview\` is overriden.`,
      StoryPreview: ({ children }) => (
        <div
          style={{
            textAlign: 'center',
            padding: '25px',
            margin: '25px 0',
            boxShadow: '0 0 40px rgba(0, 0, 0, 0.1)',
          }}
        >
          {children}
        </div>
      ),
    },
  });
