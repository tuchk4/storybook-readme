import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { withReadme, withDocs } from '../../src';

import MyButton from '../components/MyButton/MyButton.vue';

storiesOf('withDocs', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(MyButton.__docs))
  .add('Button', () => {
    const warning = boolean('Warning', false);
    const success = boolean('Success', false);

    return {
      components: {
        MyButton,
      },
      template: `<my-button :alert="${warning}" :success="${
        success
      }">My Button</my-button>`,
    };
  });
