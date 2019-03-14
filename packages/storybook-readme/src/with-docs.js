export default function withDocs() {
  throw new Error(`
storybook-readme:
At version ^5.0.0 "withDocs()" is deprectaed and always will throw exception.
Use "addParameters()"

storiesOf('My Component', module)
  .addParameters({
    readme: {
      content: README,
    },
  })
  .add('MyComponent story', MyComponent)
  .add('MyComponent story', MyComponent, {
    readme: {
      // will override
      content: CUSTOM_README,
    },
  })

`);
}
