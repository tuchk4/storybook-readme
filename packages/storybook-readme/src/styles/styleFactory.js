export default function styleFactory(
  name,
  { getStyles = () => '', pickValues = t => t, defaultTheme = {} } = {}
) {
  let counter = 0;

  let insertedKey = null;
  let node = null;

  function injectStyle(content) {
    try {
      node = document.createElement('style');

      node.id = `${name}-${++counter}`;
      node.innerHTML = content;

      document.head.appendChild(node);
    } catch (e) {
      // assume we're not in a browser env, just abort
      return;
    }
  }

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
      injectStyle(styles || getStyles(t));
    }

    insertedKey = key;
  };
}
