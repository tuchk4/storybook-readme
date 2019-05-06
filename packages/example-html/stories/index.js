import { storiesOf } from '@storybook/html';

storiesOf('Button', module)
  .addParameters({
    readme: {
      sidebar: `
## Hello World  :rocket:

- 1
- 2
- 3 

\`\`\`html
<button>Hello</Button>
\`\`\`
`,
    },
  })
  .add('with text', () => '<button class="btn">Hello World</button>')
  .add('with emoji', () => {
    const button = document.createElement('button');
    button.innerText = '😀 😎 👍 💯';
    return button;
  });
