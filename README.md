# Storybook README addon

![Storybook README addon](https://monosnap.com/file/WbXEZxDJfkh4aeg9LfxLflbT03P5ma.png)

[Example Storybook with README addon](https://tuchk4.github.io/storybook-readme/)

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

### Webpack configuration

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

### Usage

Register addon at *.storybook/addons.js*

```js
import 'storybook-readme/register';
```

Then create your stories with the *.addWithReadme* API.

```js
import ButtonReadme from '../components/button/README.md';
import withReadme from 'storybook-readme/with-readme';

storiesOf('Button', module)
  .add('Default', withReadme(ButtonReadme, () => <Button onClick={action('clicked')} label="Hello Button"/>))
```

#### Use as Higher Order Component

*withReadme(readme, story)* accepts README or array of README in markdown format.
Multiple REAMDE is useful when you develop higher order component and want to add its README and original component README.

```js
import OriginalREADME from 'node_modules/component/README.md';
import hocREADME from '../components/component/README.md';

storiesOf('Button', module)
  .add('Default', withReadme([OriginalREADME, hocREADME], () => {
    return <Button onClick={action('clicked')} label="Hello Button"/>;
  }));
```

#### Use as decorator

*withReadme(readme)* Pass only first argument - README or array of README in markdown format.
In this way code of stories is more clean.

```js
import ButtonREADME from 'node_modules/component/README.md';

storiesOf('Button', module)
  .addDecorator(withReadme(ButtonREADME))
  .add('Default', () => {
    return <Button onClick={action('clicked')} label="Hello Button"/>;
  });
```

> Have a look at [this example](example/stories/index.js) stories to learn more about the `addWithReadme` API
