import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
// import { withReadme, withDocs, doc } from 'storybook-readme';

import MyButton from '../components/MyButton/MyButton.vue';

// import CommonFooterDocs from '../components/COMMON_FOOTER.md';
// import ButtonReadme from '../components/MyButton/README.md';
// import ButtonDocs from '../components/MyButton/DOCS.md';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: 'asdsa',
    },
  })
  .add(
    'Button',
    () => {
      const warning = boolean('Warning', false);
      const success = boolean('Success', false);

      return {
        components: {
          MyButton,
        },
        template: `<my-button
      :alert="${warning}"
      :success="${success}">My Button</my-button>`,
      };
    },
    {
      readme: {
        md: `
### EXAMPLE YO <!-- STORY --> ### END HERE
\`\`\`\js
function foo() {}
\`\`\`

`,
      },
    }
  );
