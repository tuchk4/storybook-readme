export default function withReadme() {
  throw new Error(`
storybook-readme:
At version ^5.0.0 "withReadme()" is deprectaed and always will throw exception.
Use "addParameters()"

storiesOf('My Component', module)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add('MyComponent story', MyComponent)
  .add('MyComponent story', MyComponent, {
    readme: {
      // will override
      sidebar: CUSTOM_README,
    },
  })
  
  `);
}
