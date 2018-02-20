# Button

### Usage

```js
import Button from 'components/button';
```

<!-- STORY -->

### Properties

* `onClick` - click callback
* `label` - button text

| propName | propType | defaultValue | isRequired |
| -------- | -------- | ------------ | ---------- |
| onClick  | func     | -            |            |
| label    | string   | -            | +          |
| alert    | boolean  | false        | -          |
| success  | boolean  | false        | -          |

### Roadmap

#### Icons

```js
import Button from 'components/button';

render() {
  return (
    <Button icon="mail">Send mail</Button>
    <Button icon="trash" iconPosition="right">Remove</Button>
  );
}
```

#### Value

Add `value` property that will be available at all event callback. Helps to prevent numbers of bind usage

For example:

```js
<ListItem key={item.id}>
  <Button onClick={this.remove} value={item.id}>
    Remove
  </Button>
</ListItem>
```

Instead of

```js
<ListItem key={item.id}>
  <Button onClick={this.remove.bind(this, item.id)}>Remove</Button>
</ListItem>
```
