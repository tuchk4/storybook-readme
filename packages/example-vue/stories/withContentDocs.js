import { storiesOf } from '@storybook/vue';

import MyButton from '../components/MyButton/MyButton.vue';

import ButtonReadme from '../components/MyButton/README.md';
import ButtonUsage from '../components/MyButton/USAGE.md';

storiesOf('Content docs', module)
  .addParameters({
    readme: {
      content: ButtonReadme,
    },
  })
  .add(
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
## Sidebar docs

<!-- STORY -->

\`sidebar\` added with \`addParameters\` will be applied for all stories in the same series.
To override it - define \`sidebar\` at \`add\` method.

\`\`\`js
import README from './README.md';
import CUSTOM_README from './CUSTOM_README.md';

storiesOf('Sidebar docs', module)
  .addParameters({
    readme: {
      content: README,
    },
  })
  .add(..., {
    readme: {
      // will override
      content: CUSTOM_README,
    },
  })
  .add(...)
  .add(...)
\`\`\`
`,
      },
    }
  )
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
  })
  .add(
    'Override Content docs',
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
        content: `This \`md\` is overriden.`,
      },
    }
  );
