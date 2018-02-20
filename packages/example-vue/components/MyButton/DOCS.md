# Button

Normal application button.

```js
import MyButton from 'components/MyButton';
```

<!-- STORY -->

### Flags usage rules

Use **alert** and **success** flags only in these cases:

**alert** - when `onClick` action removes something

```js
{
  components: { MyButton },
  template: `<my-buton alert="true">Remove User</my-button>`
}
```

**success** - when `onClick` action adds something

```js
{
  components: { MyButton },
  template: `<my-buton success="true">Add User</my-button>`
}
```
