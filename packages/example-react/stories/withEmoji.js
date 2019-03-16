import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../components/Button';

import ButtonReadme from '../components/Button/README.md';
import ButtonUsage from '../components/Button/USAGE.md';

storiesOf('Emoji', module).add(
  'Button',
  () => <Button label={'Hello Im Button'} />,
  {
    readme: {
      content: `
### Emoji

Use shortcodes between colon to insert emoji into the docs. For example 

Here is rocket &#58;rocket&#58;

Here is rocket :rocket:

List of all shortcodes could be found at [Emojipedia](https://emojipedia.org) or at [Gist/rxaviers](https://gist.github.com/rxaviers/7360908)

- :rocket: 
- :grinning:
- :monkey:
`,
    },
  },
);
