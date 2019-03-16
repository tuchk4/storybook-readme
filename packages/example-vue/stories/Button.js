import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Button', module)
  .addParameters({
    readme: {
      content: ButtonUsage,
      sidebar: `<!-- PROPS -->`,
    },
  })
  .add('Button', () => {
    return {
      components: {
        MyButton,
      },
      template: `<my-button>My Button</my-button>`,
    };
  })
  .add('Alert Button', () => {
    return {
      components: {
        MyButton,
      },
      template: `<my-button variant="alert">My Button</my-button>`,
    };
  })
  .add('Success Button', () => {
    return {
      components: {
        MyButton,
      },
      template: `<my-button variant="success">My Button</my-button>`,
    };
  });
