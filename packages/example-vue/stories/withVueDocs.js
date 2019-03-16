import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Vue <docs>', module)
  .addParameters({
    readme: {
      content: MyButton.__docs,
    },
  })
  .add('Button', () => {
    return {
      components: {
        MyButton,
      },
      template: `<my-button>My Button</my-button>`,
    };
  });
