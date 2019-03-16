import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Custom Preview', module)
  .addParameters({
    readme: {
      content: ButtonReadme,
      StoryPreview: ({ children }) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '32px 0',
            border: '2px dashed #eee',
            // boxShadow: '5px 5px 10px #ddd',
            padding: '16px',
          }}
        >
          <div>{children}</div>
        </div>
      ),
      DocPreview: ({ children }) => (
        <div
          style={{
            padding: '8px 32px',
            margin: '0 0 0 32px',
            borderLeft: '4px dashed #eee',
          }}
        >
          {children}
        </div>
      ),
      HeaderPreview: ({ children }) => (
        <div
          style={{
            margin: '0 0 32px 0',
            background: '#ffffab',
          }}
        >
          {children}
        </div>
      ),
      FooterPreview: ({ children }) => (
        <div
          style={{
            margin: '32px 0 0 0',
            background: 'rgba(171, 255, 176, 1)',
          }}
        >
          {children}
        </div>
      ),
    },
  })
  .add('Button', () => <Button label={'Hello Im Button'} />);
