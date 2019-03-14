export default function styleFactory(
  name,
  { getStyles, pickValues = t => t, defaultTheme = {} },
) {
  let counter = 0;

  let insertedKey = null;
  let node = null;

  return function insert(theme = {}) {
    const t = {
      ...defaultTheme,
      ...pickValues(theme),
    };

    const key = JSON.stringify(t);

    if (key === insertedKey) {
      return;
    }

    if (!node) {
      node = document.createElement('style');

      const id = `${name}-${++counter}`;
      node.id = id;

      document.head.prepend(node);
    }

    insertedKey = key;
    node.innerHTML = getStyles(t);
  };
}
