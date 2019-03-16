import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Custom Code Theme', module)
  .addParameters({
    readme: {
      codeTheme: 'atelier-cave-dark',
      content: ButtonReadme,
      sidebar: ButtonReadme,
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
