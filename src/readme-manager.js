const store = new Map();
const getReadmeId = (kind, storyName) => `${kind}.${storyName}`;

export const SPLITTER = '<!-- STORY -->';

export function clearSplitter(readme) {
  return readme.map(source => source.replace(SPLITTER, ''));
}

export function normalize(readme) {
  return Array.isArray(readme) ? [...readme] : [readme];
}

export const getReadme = (kind, storyName) => {
  const id = getReadmeId(kind, storyName);

  if (!store.has(id)) {
    return [];
  }

  return clearSplitter(store.get(id));
};

export const setReadme = (kind, storyName, readme = []) => {
  const id = getReadmeId(kind, storyName);
  store.set(id, Array.isArray(readme) ? readme : [readme]);
};
