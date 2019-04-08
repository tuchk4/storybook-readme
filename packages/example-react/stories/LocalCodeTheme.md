# Local Code Theme

You can override global code theme by adding \`codeTheme\` value to \`addParameters\`
at story.

```js
storiesOf('Your story name here', module)
  .addParameters({
    readme: {
      codeTheme: 'dracula',
    },
  })
  .add('Your component name', () => <div>Your component</div>);
```

Full lists of themes are at https://highlightjs.org/static/demo/.
To be used with storybook-readme, naming of the code theme should be used in one of these styles. [codeTheme names](https://github.com/tuchk4/storybook-readme/tree/master/packages/storybook-readme/src/styles/codeThemes)

```
'Dracula' -> 'dracula'
'Atelier Sulphurpool Dark' -> 'atelier-sulphurpool-dark'
'Xt 256' -> 'xt256'
```
