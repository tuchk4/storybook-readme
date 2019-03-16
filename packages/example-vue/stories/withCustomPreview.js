import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Custom Preview', module)
  .addParameters({
    readme: {
      content: ButtonReadme,
      StoryPreview: {
        data() {
          return {
            styles: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '32px 0',
              border: '2px dashed #eee',
              padding: '16px',
            },
          };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`,
      },
      DocPreview: {
        data() {
          return {
            styles: {
              padding: '8px 32px',
              margin: '0 0 0 32px',
              borderLeft: '4px dashed #eee',
            },
          };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`,
      },
      HeaderPreview: {
        data() {
          return {
            styles: {
              margin: '0 0 32px 0',
              background: '#ffffab',
            },
          };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`,
      },
      FooterPreview: {
        data() {
          return {
            styles: {
              margin: '32px 0 0 0',
              background: 'rgba(171, 255, 176, 1)',
            },
          };
        },
        template: `<div v-bind:style="styles"><slot></slot></div>`,
      },
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
