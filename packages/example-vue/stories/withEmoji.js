import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Emoji', module).add(
  'Button',
  () => {
    return {
      components: {
        MyButton,
      },
      template: `<my-button>My Button</my-button>`,
    };
  },
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
  }
);
