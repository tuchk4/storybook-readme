# React Storybook README addon

![React Storybook README addon](https://monosnap.com/file/WbXEZxDJfkh4aeg9LfxLflbT03P5ma.png)

[Example Storybook with README addon](https://tuchk4.github.io/storybook-readme/)

It is very similar with [Storybook Notes](https://github.com/kadirahq/storybook-addon-notes) addon but using Storybook Notes there is `<WithNotes notes={...}>` wrapper at each story function and thats why [Storybook Info](https://github.com/kadirahq/react-storybook-addon-info) always shows that [wrapper at info screen](http://take.ms/95YnX).

Additional features:

* Does not affect on *story function*. So [Storybook Info](https://github.com/kadirahq/react-storybook-addon-info) works correctly now.
* 100% markdown support
* Code highliting
* Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's REAMDE)
* Looks like Github's README

Also it very useful because most projects and components already have *README.md* files. Now it is easy to add them into your Storybook.

Stories will be added with *.addWithInfo* method if [React Storybook Info Addon](https://github.com/kadirahq/react-storybook-addon-info) is installed.

### Install

`npm install --save-dev storybook-readme`

### Webpack configuration

```js
module.exports = {
  module: {
    loaders: [{
      test: /\.md$/,
      loader: "raw"
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};
```

`npm install --save-dev raw-loader json-loader style-loader css-loader`

If [css modules](https://github.com/css-modules/css-modules) are using make sure to exclude *storybook-readme* from css modules loader. Something like this:

```js
module: {
  loaders: [{
    test: /\.css$/,
    exclude: 'storybook-readme',
    loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
  }]
}
```

### Usage

Register addon at *.sotrybook/addons.js*

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

*addWithReadme* accepts README or array of README in markdown format.
It is useful when you develop higher order component and want to add its README and original component REAMDE.

```js
import OriginalREADME from 'node_modules/component/README.md';
import hocREADME from '../components/component/README.md';

storiesOf('Button', module)
  .add('Default', withReadme([OriginalREADME, hocREADME], () => {

    return <Button onClick={action('clicked')} label="Hello Button"/>;
  }));
```

> Have a look at [this example](example/stories/index.js) stories to learn more about the `addWithReadme` API
