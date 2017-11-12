import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';

import MyButton from '../components/MyButton/MyButton.vue';

storiesOf('withDocs', module).add('Button', () => {
  const warning = boolean('Warning', false);
  const success = boolean('Sucess', false);

  return {
    components: {
      MyButton,
    },
    template: `<my-button :alert="${warning}" :success="${
      success
    }">My Button</my-button>`,
  };
});
