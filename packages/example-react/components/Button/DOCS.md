# Button

Normal application button.

```js
import Button from 'components/Button';
```

<!-- STORY -->

### Flags usage rules

Use **alert** and **success** flags only in these cases:

**alert** - when `onClick` action removes something

```js
<Button alert={true} label="Remove user" />
```

**success** - when `onClick` action adds something

```js
<Button success={true} label="Add user" />
```
