# Storybook README addon

NOTE: This README only for version `^5.0.0`. For older versions [LEGACY_README.md](./LEGACY_README.md)

---

![Storybook README addon](https://user-images.githubusercontent.com/5140611/54326373-e8290680-460e-11e9-8d6b-8091a4b63c3c.png)

This addon is compatible with:

- Storybook for React ([React example storybook](packages/example-react))
- Storybook for Vue ([Vue example storybook](packages/example-vue))

[Live demo](https://tuchk4.github.io/storybook-readme)

Features:

- Automatically generate props table (Only for React)
- Does not affect on _story function_. So [Storybook Info](https://github.com/storybooks/storybook/tree/master/addons/info) works correctly now.
- 100% markdown support
- Code highlighting
- Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's README)
- Looks like Github's README
- Supports `<docs/>` tags for vue components ([example-vue/components/MyButton/MyButton.vue](https://github.com/tuchk4/storybook-readme/blob/master/packages/example-vue/components/MyButton/MyButton.vue)).

Also it very useful because most projects and components already have _README.md_ files. Now it is easy to add them into your Storybook.

Stories will be added with _.addWithInfo_ method if [Storybook Info Addon](https://github.com/storybooks/storybook/tree/master/addons/info) is installed.

### Install

`npm install --save-dev storybook-readme`

or

`yarn add --dev storybook-readme`

### Webpack Configuration for React Storybook

Nothing to do :)

### Webpack Configuration for Vue Storybook

Only if using [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) and want to use `<docs>` tag at storybook documentation.

```js
module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: ['storybook-readme/vue/docs-loader', 'html-loader', 'markdown-loader'],
  });
};
```

## Setup

Register addon at _.storybook/addons.js_

```js
import 'storybook-readme/register';
```

Add decorator at _.storybook/config.js_

```js
import { addReadme } from 'storybook-readme';
addDecorator(addReadme);
```

## Usage

Hope it is very simple.

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';
import ButtonReadme from '../components/Button/README.md';

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ButtonReadme,
      // Show readme at the addons panel
      sidebar: ButtonReadme,
    },
  })
  .add('Button', () => <Button />);
```

It is possible to override docs for story

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../components/Button';
import ButtonReadme from '../components/Button/README.md';

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: ButtonReadme,
      sidebar: ButtonReadme,
    },
  })
  .add('Button', () => <Button />)
  .add('Button', () => <Button />)
  .add('Button', () => <Button />, {
    readme: {
      // override docs
      content: CustomButtonReadme,
      sidebar: CustomButtonReadme,
    },
  });
```

## Full list of options

```js
.addParameters({
    readme: {
      /**
       * Accepts string (markdown) or array of strings
       * string | Array<string>
       */
      content: Readme,

      /**
       * Accepts string (markdown) or array of strings
       * string | Array<string>
       */
      sidebar: Readme,

      /**
       * Override theme values
       */
      theme: {},

      /**
       * Highlightjs code theme
       * Import theme at _.storybook/config.js_.
       * Full list of theme https://highlightjs.org/static/demo/.
       */
      codeTheme: 'github',

      /**
       * Wrapper for story. Usually used to set some styles
       * React: React.ReactNode
       * Vue: Vue component
       */
      StoryPreview: ({ children}) => <div>{children}</div>
    },
  })
```

## Readme placeholders

- `<!-- STORY -->` placeholder for story
- `<!-- PROPS -->` placeholder for props table

```md
Button variants could be imported separately.

\`\`\`js import { OutlinedButton, ContainedButton, TextButton } from 'Button'; \`\`\`

<!-- PROPS -->

Example:

<!-- STORY -->

Some docs after story
```
