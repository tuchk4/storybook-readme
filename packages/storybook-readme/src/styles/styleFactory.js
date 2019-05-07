export default function styleFactory(
  name,
  { getStyles = () => '', pickValues = t => t, defaultTheme = {} } = {}
) {
  let counter = 0;

  let insertedKey = null;
  let node = null;

  return function insert({ theme = {}, styles }) {
    const t = {
      ...defaultTheme,
      ...pickValues(theme),
    };

    const key = JSON.stringify({
      ...t,
      styles,
    });

    if (key === insertedKey) {
      return;
    }

    if (!node) {
      node = document.createElement('style');

      node.id = `${name}-${++counter}`;

      document.head.appendChild(node);
    }

    insertedKey = key;
    node.innerHTML = styles || getStyles(t);
  };
}
