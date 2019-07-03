# Button :star:

Application button.

```js
import Button from 'components/Button';
```

<!-- Brief summary of what the component is, and what it's for. -->

<!-- STORY -->

#### Story Source

<!-- SOURCE -->

<!-- STORY HIDE START -->

The content here won't be shown in stories.

<!-- STORY HIDE END -->

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
