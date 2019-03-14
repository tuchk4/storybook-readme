# Button

### :smile: Usage

Buttons allow users to take actions, and make choices, with a single tap. Supports all default HTML Button properties. See Material Design Button for UI/UX information.

Button variants could be imported separately.

```js
import { OutlinedButton, ContainedButton, TextButton } from 'Button';
```

<!-- PROPS -->

<!-- STORY -->

#### Icons

```js
import Button from 'components/button';

render() {
  return (
    <Button icon="mail">Send mail</Button>
    <Button icon="trash">Remove</Button>
  );
}
```

#### Button types

Means `OutlinedButton`, `ContainedButton`, `TextButton`. It is possible to import as standalone component or pass `variant` property. Defautl value is `contained`.

```js
<Button variant="outlined" />
<Button variant="contained" />
<Button variant="text" />
```

Which one does @torvalds like most?

- [ ] tiger \#
- [ ] whale \*
- [x] octocat \!

> Stay hungry; stay foolish.
>
> > Quality is better than quantity.
> >
> > > Life is not fair; get used to it.
