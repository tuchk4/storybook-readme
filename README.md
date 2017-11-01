# Storybook README addon

![Storybook README addon](https://tuchk4.tinytake.com/media/6074cc?filename=1507031891423_03-10-2017-14-58-09.png&sub_type=thumbnail_preview&type=attachment&width=700&height=542&_felix_session_id=53f589ad3ebd6ae15ad9850b6bb20044&salt=MjAwMDAyNF82MzIxMzU2)

[Example Storybook with README addon](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=Button&selectedStory=Default&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs)

It is very similar with [Storybook Notes](https://github.com/storybooks/storybook/tree/master/addons/notes) addon but using Storybook Notes there is `<WithNotes notes={...}>` wrapper at each story function and thats why [Storybook Info](https://github.com/storybooks/storybook/tree/master/addons/info) always shows that [wrapper at info screen](http://take.ms/95YnX).

This addon is compatible with:
- Storybook for React

Additional features:

* Does not affect on *story function*. So [Storybook Info](https://github.com/storybooks/storybook/tree/master/addons/info) works correctly now.
* 100% markdown support
* Code highlighting
* Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's README)
* Looks like Github's README

Also it very useful because most projects and components already have *README.md* files. Now it is easy to add them into your Storybook.

Stories will be added with *.addWithInfo* method if [Storybook Info Addon](https://github.com/storybooks/storybook/tree/master/addons/info) is installed.

### Install

`npm install --save-dev storybook-readme`

or

`yarn add --dev storybook-readme`

### Webpack Configuration

```js
module.exports = {
  module: {
    rules: [{
      test: /\.md$/,
      use: "raw-loader"
    }]
  }
};
```

`npm install --save-dev raw-loader`

## Usage

Register addon at *.storybook/addons.js*

```js
import 'storybook-readme/register';
```

Then create your stories with the *withReadme* or *withDocs* API (use as story HOC or as Storybook Decorator).

- *withDocs* - Add README around the story component at the main panel. [Example withDocs](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withDocs%2FAs%20Decorator&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=storybooks%2Fstorybook-addon-knobs)
- *withReadme* - Add README to the storybook panels. [Example withReadme](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withReadme%2F%20As%20Decorator&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel)

It is possible to combine *withDocs* and *withReadme* - [Example combined APIs](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=withDocs%20and%20withReadme&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel)

```js
import ButtonReadme from '../components/button/README.md';
import { withReadme, withDocs }  from 'storybook-readme';
// or import separetaly
// import withReadme from 'storybook-readme/with-readme';
// import withDocs from 'storybook-readme/with-docs';

storiesOf('Button', module)
  .add('Default', withReadme(ButtonReadme, () => <Button onClick={action('clicked')} label="Hello Button"/>))

storiesOf('Content', module)
  .add('Default', withDocs(ButtonReadme, () => <Content>Hello Button<Content/>))

// with custom preview element
const withCustomPreview = withDocs({
  PreviewComponent: styled.div`
    text-align: center;
    padding: 25px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  `,
  FooterComponent: styled.div`
    padding: 25px;
    background: rgba(246, 255, 0, 0.23);
    border-top: '2px solid rgba(0, 0, 0, 0.1);
  `,
});

storiesOf('Content', module)
  .add('Default', withCustomPreview(ButtonReadme, () => <Content>Hello Button<Content/>))
```

#### Use as Higher Order Component

- *withReadme(readme, story)*
- *withDocs(readme, story)* or *withDocs({ PreviewComponent, FooterComponent })(readme, story)*

> Accepts README or array of README in markdown format.
> Multiple REAMDE is useful when you develop higher order component and want to add its README and original component README.

**withReadme** example:
```js
import { withReadme } from 'storybook-readme';
import OriginalButtonREADME from 'node_modules/components/button/README.md';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('Button', module)
  // add multiple READMEs (also supports only one)
  .add('Default', withReadme([OriginalButtonREADME, ButtonREADME], () => {
    return <Button onClick={action('clicked')} label="Hello Button"/>;
  }));
```

**withDocs** example:
```js
import { withDocs } from 'storybook-readme';
import ButtonREADME from '../components/components/button/README.md';

storiesOf('Button', module)
  // add only one README (also supports multiple as array)
  .add('Default', withDocs(ButtonREADME, () => {
    return <Button onClick={action('clicked')} label="Hello Button"/>;
  }));
```

#### Use as Decorator

- *withReadme(readme)*
- *withDocs(readme)* or *withDocs({ PreviewComponent, FooterComponent })(readme)*

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
    return <Button onClick={action('clicked')} label="Hello Button"/>;
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
    return <Button onClick={action('clicked')} label="Hello Button"/>;
  });
```



### `withDocs` - Common Footer

Will appear at all stories that uses `withDocs` api.

> Note: Should be added before all stories initialization.

```js
import { withDocs } from 'storybook-readme';
import DocsFooterReadme from 'components/DOCS_FOOTER.md';

withDocs.addFooter(DocsFooterReadme);
```

### README splitter (only for `withDocs` API)

You can use `<!-- STORY -->` at the README to control component story position.
Instead of this placeholder story will be rendered. For example:

```md
Docs before story

<!-- STORY -->

Docs after story
```

Have a look on this [REAMDE](example/components/Button/DOCS.md) and [live story exmaple](https://tuchk4.github.io/storybook-readme/?knob-alert=false&knob-success=false&knob-label=Hello%20Im%20Button&selectedKind=Custom%20Preview%20and%20Footer&selectedStory=Button&full=0&down=1&left=1&panelRight=1&downPanel=REACT_STORYBOOK%2Freadme%2Fpanel).

Take a look at more examples at [example/stories/index.js](example/stories/index.js) to learn more about the `withReadme` and `withDocs` API.
