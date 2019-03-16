# Storybook README addon

NOTE: This README only for version `^5.0.0`. For older versions [LEGACY_README.md](./LEGACY_README.md)

---

![Storybook README addon](https://user-images.githubusercontent.com/5140611/54478027-86d38400-4816-11e9-96a0-aecef64e3ea7.png)

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

## Install

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

Define `<docs>` tag inside vue module:

```vue
<docs>
Docs inside vue module 
</docs>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>
```

Use it to defone docs at story:

```js
import MyButton from '../components/MyButton/MyButton.vue';

storiesOf('Vue <docs>', module).addParameters({
  readme: {
    content: MyButton.__docs,
  },
});
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

Will be applied for series of stories.

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
       *
       * All theme values https://github.com/tuchk4/storybook-readme/blob/master/packages/storybook-readme/src/styles/githubMarkdownCss.js#L436
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
       * NOTE: will be applied only for content docs (docs around the story)
       *
       * React: React.ReactNode
       * Vue: Vue component
       */
      StoryPreview: ({ children}) => <div>{children}</div>

      /**
       * Wrapper for hedaer docs. Usually used to set some styles
       * NOTE: will be applied only for content docs (docs around the story)
       *
       * React: React.ReactNode
       * Vue: Vue component
       */
      HeaderPreview: ({ children}) => <div>{children}</div>

      /**
       * Wrapper for footer docs. Usually used to set some styles
       * NOTE: will be applied only for content docs (docs around the story)
       *
       * React: React.ReactNode
       * Vue: Vue component
       */
      FooterPreview: ({ children}) => <div>{children}</div>

      /**
       * Wrapper for content and sidebar docs. Usually used to set some styles
       * NOTE: will be applied only for content docs (docs around the story)
       *
       * React: React.ReactNode
       * Vue: Vue component
       */
      DocPreview: ({ children}) => <div>{children}</div>
    },
  })
```

## Global configuration

Will be applied for all stories.
NOTE: that `global configuration` is applied only for content docs (docs around the story).

```js
import { configureReadme } from 'storybook-readme';

configureReadme({
  /**
   * Wrapper for story. Usually used to set some styles
   * React: React.ReactNode
   * Vue: Vue component
   */
  StoryPreview: ({ children }) => <div>{children}</div>,

  /**
   * Wrapper for content and sidebar docs. Usually used to set some styles
   * React: React.ReactNode
   * Vue: Vue component
   */
  DocPreview: ({ children }) => (
    <div style={{ background: '#000' }}> {children}</div>
  ),

  /**
   * Wrapper for hedaer docs. Usually used to set some styles
   * React: React.ReactNode
   * Vue: Vue component
   */
  HeaderPreview: ({ children }) => (
    <div style={{ background: 'red' }}>{children}</div>
  ),

  /**
   * Wrapper for footer docs. Usually used to set some styles
   * React: React.ReactNode
   * Vue: Vue component
   */
  FooterPreview: ({ children }) => <div>{children}</div>,

  /**
   * Header docs in markdown format
   */
  header: '',

  /**
   * Footer docs in markdown format
   */
  footer: '',
});
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

## Emoji

Use shortcodes between colon to insert emoji into the docs. For example

Here is rocket &#58;rocket&#58;

Here is rocket :rocket:

List of all shortcodes could be found at [Emojipedia](https://emojipedia.org) or at [Gist/rxaviers](https://gist.github.com/rxaviers/7360908)

- :rocket:
- :grinning:
- :monkey:

Fell free to suggest new features or report bugs :)
