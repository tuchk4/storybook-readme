# Storybook README addon

![Storybook README addon](https://tuchk4.tinytake.com/media/6074cc?filename=1507031891423_03-10-2017-14-58-09.png&sub_type=thumbnail_preview&type=attachment&width=700&height=542&_felix_session_id=53f589ad3ebd6ae15ad9850b6bb20044&salt=MjAwMDAyNF82MzIxMzU2)

This addon is compatible with:

* Storybook for React ([React example storybook](packages/example-react))
* Storybook for Vue ([Vue example storybook](packages/example-vue))

[Live demo](https://tuchk4.github.io/storybook-readme)

Features:

* Does not affect on _story function_. So [Storybook Info](https://github.com/storybooks/storybook/tree/master/addons/info) works correctly now.
* 100% markdown support
* Code highlighting
* Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's README)
* Looks like Github's README
* Supports `<docs/>` tags for vue components ([example-vue/components/MyButton/MyButton.vue](https://github.com/tuchk4/storybook-readme/blob/master/packages/example-vue/components/MyButton/MyButton.vue)).

Also it very useful because most projects and components already have _README.md_ files. Now it is easy to add them into your Storybook.

Stories will be added with _.addWithInfo_ method if [Storybook Info Addon](https://github.com/storybooks/storybook/tree/master/addons/info) is installed.

### Install

`npm install --save-dev storybook-readme`

or

`yarn add --dev storybook-readme`

### Webpack Configuration for React Storybook

**There is no additional webpack configuration if using with `@storybooks/storybook@3.3.0`.**

For lower versions use:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
    ],
  },
};
```

### Webpack Configuration for Vue Storybook

Only if using [Single File Components](https://vuejs.org/v2/guide/single-file-components.html) and want to use `<docs>` tag at storybook documentation.

```js
module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push({
    resourceQuery: /blockType=docs/,
    use: [
      'storybook-readme/env/vue/docs-loader',
      'html-loader',
      'markdown-loader',
    ],
  });
};
```

## Usage

Register addon at _.storybook/addons.js_

```js
import 'storybook-readme/register';
```

Then create your stories with the _withReadme_ or _withDocs_ API (use as story HOC or as Storybook Decorator).

* _withDocs_ - Add README around the story component at the main panel. [Example withDocs](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withDocs%2FAs%20Decorator&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs)
* _withReadme_ - Add README to the storybook panels. [Example withReadme](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withReadme%2F%20As%20Decorator&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel)
* _doc_ - Add README instead of component preview. [Example doc](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=Doc&selectedStory=Common&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs)

It is possible to combine _withDocs_ and _withReadme_ - [Example combined APIs](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withDocs%20and%20withReadme&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel)

```js
import ButtonReadme from '../components/button/README.md';
import { withReadme, withDocs } from 'storybook-readme';
// or import separately
// import withReadme from 'storybook-readme/with-readme';
// import withDocs from 'storybook-readme/with-docs';

storiesOf('Button', module).add(
  'Default',
  withReadme(ButtonReadme, () => (
    <Button onClick={action('clicked')} label="Hello Button" />
  ))
);

storiesOf('Content', module).add(
  'Default',
  withDocs(ButtonReadme, () => <Content>Hello Button</Content>)
);

// with custom preview element
const withCustomPreview = withDocs({
  // it is easy with styled-components
  PreviewComponent: styled.div`
    text-align: center;
    padding: 25px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  `,
  FooterComponent: ({ children }) => {
    return (
      <div
        style={{
          padding: '25px',
          background: 'rgba(246, 255, 0, 0.23)',
          borderTop: '2px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        {children}
      </div>
    );
  },
});

storiesOf('Content', module).add(
  'Default',
  withCustomPreview(ButtonReadme, () => <Content>Hello Button</Content>)
);
```

#### Use as Higher Order Component

* _withReadme(readme, story)_
* _withDocs(readme, story)_ or _withDocs({ PreviewComponent, FooterComponent })(readme, story)_
* _doc(readme)_

> Accepts README or array of README in markdown format. Multiple REAMDE is useful when you develop higher order component and want to add its README and original component README.

**withReadme** example:

```js
import { withReadme } from 'storybook-readme';
import OriginalButtonREADME from 'node_modules/components/button/README.md';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('Button', module)
  // add multiple READMEs (also supports only one)
  .add(
    'Default',
    withReadme([OriginalButtonREADME, ButtonREADME], () => {
      return <Button onClick={action('clicked')} label="Hello Button" />;
    })
  );
```

**withDocs** example:

```js
import { withDocs } from 'storybook-readme';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('Button', module)
  // add only one README (also supports multiple as array)
  .add(
    'Default',
    withDocs(ButtonREADME, () => {
      return <Button onClick={action('clicked')} label="Hello Button" />;
    })
  );
```

**doc** example:

```js
import { doc } from 'storybook-readme';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('ButtonDoc', module).add('Docs', doc(ButtonREADME));
```

#### Use as Decorator

* _withReadme(readme)_
* _withDocs(readme)_ or _withDocs({ PreviewComponent, FooterComponent })(readme)_

> Pass only first argument - README or array of README in markdown format.

In this way code of stories is more clean.

**withReadme** example:

```js
import { withReadme } from 'storybook-readme';
import OriginalButtonREADME from 'node_modules/components/button/README.md';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('Button', module)
  // add multiple READMEs (also supports only one)
  .addDecorator(withReadme([OriginalButtonREADME, ButtonREADME]))
  .add('Default', () => {
    return <Button onClick={action('clicked')} label="Hello Button" />;
  });
```

**withDocs** example:

```js
import { withDocs } from 'storybook-readme';
import ButtonREADME from 'node_modules/component/README.md';

storiesOf('Button', module)
  // add only one README (also supports multiple as array)
  .addDecorator(withDocs(ButtonREADME))
  .add('Default', () => {
    return <Button onClick={action('clicked')} label="Hello Button" />;
  });
```

### `withDocs` - Common Footer

Will appear at all stories that uses `withDocs` api.

> Note: Should be added before all stories initialization.

```js
import { withDocs } from 'storybook-readme';
import DocsFooterReadme from 'components/DOCS_FOOTER.md';

withDocs.addFooterDocs(DocsFooterReadme);
```

### Custom Story Layout

Right now only for React storybooks. Take a look on this [Example].(https://tuchk4.github.io/storybook-readme/?selectedKind=Marked&selectedStory=Marked1&full=0&addons=1&stories=1&panelRight=1&addonPanel=storybooks%2Fstorybook-addon-knobs)

```js
import Marked from 'storybook-readme/components/Marked';
import ButtonReadme from './ButtonReadme.md';

storiesOf('Custom Layout', module).add('Button', () => {
  return (
    <React.Fragment>
      <Button label="Button before intro" />
      <Marked md={'### INTRO '} />

      <Button label="Button after intro" />
      <Marked md={ButtonReadme} />

      <Button label="Button before outro" />
      <Marked md={'### OUTRO '} />
    </React.Fragment>
  );
});
```

### README splitter (only for `withDocs` API)

You can use `<!-- STORY -->` at the README to control component story position. For example:

```md
Docs before story

<!-- STORY -->

Docs after story
```

Have a look on this [README](https://raw.githubusercontent.com/tuchk4/storybook-readme/master/packages/example-react/components/Button/DOCS.md) and [live story exmaple](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=Custom%20Preview%20and%20Footer&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel).

Take a look at more examples at [packages/example-react/stories/index.js](packages/example-react/stories/index.js) to learn more about the `withReadme` and `withDocs` API.
