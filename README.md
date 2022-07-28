# Storybook README addon

NOTE: This README is only for version `^5.0.0`. For older versions [README_V4.md](./README_V4.md)

All previous api should work correctly at `^5.0.0` and above. **But vue users will need to change their import path, as vue commands have been moved to their own folder.**

---

![Storybook README addon](https://user-images.githubusercontent.com/5140611/54478027-86d38400-4816-11e9-96a0-aecef64e3ea7.png)

This addon is compatible with:

- [React Storybook](https://storybook.js.org/docs/guides/guide-react/) ([React example storybook](packages/example-react))
- [Vue Storybook](https://storybook.js.org/docs/guides/guide-vue/) ([Vue example storybook](packages/example-vue))
- Particularly [HTML Storybook](https://storybook.js.org/docs/guides/guide-html/)

[Live demo](https://tuchk4.github.io/storybook-readme)

Features:

- Automatically generate props table (only for React)
- 100% markdown support
- Code highlighting
- Possible to add docs to addons panel or around the story
- Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's README)
- Looks like Github's README
- Supports `<docs/>` tags for vue components ([example-vue/components/MyButton/MyButton.vue](https://github.com/tuchk4/storybook-readme/blob/master/packages/example-vue/components/MyButton/MyButton.vue)).

Also it is very useful because most projects and components already have _README.md_ files. Now it is easy to add them into your Storybook.

Stories will be added with _.addWithInfo_ method if [Storybook Info Addon](https://github.com/storybooks/storybook/tree/master/addons/info) is installed.

## Install

`npm install --save-dev storybook-readme`

or

`yarn add --dev storybook-readme`

#### Webpack Configuration for React Storybook

Nothing to do :)

But if you are using Typescript with React you need to add [markdown-loader](https://www.npmjs.com/package/markdown-loader) in your webpack config

```js
{
  test: /\.md$/,
  use: [
    {
      loader: 'markdown-loader',
    }
  ]
}
```

#### Webpack Configuration for Vue Storybook

Only for [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) with `<docs>` tag used for documentation.

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

Use it to define docs at story:

```js
import MyButton from '../components/MyButton/MyButton.vue';

storiesOf('Vue <docs>', module).addParameters({
  readme: {
    content: MyButton.__docs,
  },
});
```

## Setup

#### Register addon at _.storybook/addons.js_

```js
import 'storybook-readme/register';
```

NOTE: It is possible to set addon's panel title

```js
import registerWithPanelTitle from 'storybook-readme/registerWithPanelTitle';

registerWithPanelTitle('Docs');
```

#### Add decorator at _.storybook/config.js_

```js
import { addDecorator, configure } from '@storybook/react';
import { addReadme } from 'storybook-readme';

// for Vue storybook
import { addReadme } from 'storybook-readme/vue'; // <---- vue subpackage

// for HTML storybook
import { addReadme } from 'storybook-readme/html'; // <---- html subpackage

addDecorator(addReadme);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);
```

> NOTE: for html storybook only sidebar docs are available.

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
       * Enable / disable code highlighting for sidebar. true by default
       */
      highlightSidebar: true,

      /**
       * Enable / disable code highlighting for content. true by default
       */
      highlightContent: true,

      /**
       * Override theme values
       *
       * All theme values https://github.com/tuchk4/storybook-readme/blob/master/packages/storybook-readme/src/styles/githubMarkdownCss.js#L436

       */
      theme: {},

      /**
       * Prism code theme
       * Full list of theme https://github.com/PrismJS/prism-themes
       * To be used with storybook-readme, naming of the code theme should be used in one of these styles. https://github.com/tuchk4/storybook-readme/tree/master/packages/storybook-readme/src/styles/prismCodeThemes
       */
      codeTheme: 'github',

      /**
       * You can include prop tables locally here. See `propTables` example
       * for more information
       */
      includePropTables: [YourImportedReactComponent],

      /**
       * Wrapper for story. Usually used to set some styles
       * NOTE: will be applied only for content docs (docs around the story)
       *
       * React: React.ReactNode
       * Vue: Vue component
       */
      StoryPreview: ({ children}) => <div>{children}</div>

      /**
       * Wrapper for header docs. Usually used to set some styles
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
import { addParameters } from '@storybook/react'; // or @storybook/vue for vuejs
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
   * Wrapper for header docs. Usually used to set some styles
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

addParameters({
  readme: {
    // You can set a code theme globally.
    codeTheme: 'github',

    // You can exclude prop tables globally here. See `propTables` example
    // for more information
    excludePropTables: [YourImportedReactComponent],
  },
});
```

## Readme placeholders

- `<!-- STORY -->` placeholder for story
- `<!-- SOURCE -->` placeholder for story source
- `<!-- STORY_SOURCE -->` placeholder for story source
- `<!-- PROPS -->` placeholder for props table. There are some issue with props parsing. Clarification [issue#137](https://github.com/tuchk4/storybook-readme/issues/137#issuecomment-481307652)
- `<!-- STORY HIDE START -->`, `<!-- STORY HIDE END -->` content enclosed by the tags won't be shown in stories

```md
Button variants could be imported separately.

\`\`\`js import { OutlinedButton, ContainedButton, TextButton } from 'Button'; \`\`\`

<!-- PROPS -->

Example:

<!-- STORY -->
<!-- SOURCE -->

<!-- STORY HIDE START -->

content here won't be shown in stories

<!-- STORY HIDE END -->

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

Feel free to suggest new features or report bugs :)

## Api from v4.

Full docs for previous api are at [README_V4.md](./README_V4.md)

TL;DR:

> Accepts README or array of README in markdown format. Multiple README is useful when you develop higher order components and want to add multiple READMEs along with the original component docs.

#### withReadme

Renders README at the addons panel.

```js
import { withReadme } from 'storybook-readme';
import withReadme from 'storybook-readme/with-readme';

// as HigherOrder Component
storiesOf('Button', module).add(
  'Default',
  withReadme(ButtonReadme, () => <Button />),
);
// as Decorator
storiesOf('Button', module)
  .addDecorator(withReadme(ButtonReadme))
  .add('Default', () => <Button />);
```

#### withDocs

Renders README around the story.

```js
import { withDocs } from 'storybook-readme';
import withDocs from 'storybook-readme/with-docs';

// as HigherOrder Component
storiesOf('Button', module).add(
  'Default',
  withDocs(ButtonReadme, () => <Button />),
);
// as Decorator
storiesOf('Button', module)
  .addDecorator(withDocs(ButtonReadme))
  .add('Default', () => <Button />);
```

#### doc

Renders README in main frame without story.

```js
import { doc } from 'storybook-readme';

storiesOf('Button', module).add('Default', () => doc(ButtonReadme));
```
