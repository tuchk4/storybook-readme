# Button

### Usage

```js
import MyButton from 'components/MyButton';
```

<!-- STORY -->

### Properties

* `onClick` - click callback
* `label` - button text

| propName | propType | defaultValue | isRequired |
|----------|----------|--------------|------------|
| onClick  | func     | -            |            |
| alert    | boolean   | false           | -          |
| success    | boolean   | false           | -          |


### Roadmap

#### Icons

```js
{
  components: { MyButton },
  template: `<my-buton icon="mail">Send mail</my-button>`
}

{
  components: { MyButton },
  template: `<my-buton icon="trash" iconPosition="right">Send mail</my-button>`
}
```

#### Value

Add `value` property that will be available at all event callback. Helps to prevent numbers of bind usage

For example:

```js
{
  components: { MyButton },
  template: `<my-buton v-on:click=={remove} value={item.id}>Remove</my-button>`
}
```
