# React Storybook README addon

![React Storybook README addon](https://monosnap.com/file/Zjasmpfzk0Bc1zhSzbiurGYM0ZjWYa.png)

It is very similar with [Storybook Notes](https://github.com/kadirahq/storybook-addon-notes) addon.
But using Storybook Notes there is *<WithNotes notes={...}* wrapper at each story function and thats why [Storybook Info](https://github.com/kadirahq/react-storybook-addon-info) also shows that [wrapper at info screen](http://take.ms/95YnX).

Additional features:

* Does not affect on *story function*. So [Storybook Info](https://github.com/kadirahq/react-storybook-addon-info) works correctly now.
* 100% markdown support
* Code highliting
* Accept multiple README (useful for [hoc component](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e) - add component's and original component's REAMDE)
* Looks like Github's README
* Works correctly with [Storybook Info](https://github.com/kadirahq/react-storybook-addon-info) addon. There is no `<WithNotes notes={...}>` wrapper at component info screen.

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

Install all webpack loaders:

`npm install --save-dev raw-loader json-loader style-loader css-loader`

If you use [css modules](https://github.com/css-modules/css-modules) make sure you exclude *storybook-readme* from css modules loader. Something like this:

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

Add addon at *.sotrybook/config.js*

```js
import { setAddon } from '@kadira/storybook';
import readmeAddon from 'storybook-readme/addon';

setAddon(readmeAddon);

...

```

Add stories using *addWithReadme* method.
Then create your stories with the *.addWithReadme* API.

```js
import ButtonReadme from '../components/button/README.md';

storiesOf('Button', module)
  .addWithReadme('Default', ButtonReadme, () => (
    <Button onClick={action('clicked')} label="Hello Button"/>
  ))
```

*addWithReadme* accepts README or array of README in markdown format.
It is useful when you wrote higher order component and want to add its README and REAMDE of original component.

```js
import OriginalREADME from 'node_modules/component/README.md';
import hocREADME from '../components/component/README.md';

storiesOf('Button', module)
  .addWithReadme('Default', [OriginalREADME, hocREADME], () => (
    <HocComponent />
  ))
```

> Have a look at [this example](example/stories/index.js) stories to learn more about the `addWithReadme` API
