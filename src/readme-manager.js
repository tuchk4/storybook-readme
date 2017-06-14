const store = new Map();
const getReadmeId = (kind, storyName) => `${kind}.${storyName}`;

export const getReadme = (kind, storyName) => {
  const id = getReadmeId(kind, storyName);

  if (!store.has(id)) {
    return [];
  }

  return store.get(id);
};

export const setReadme = (kind, storyName, readme = []) => {
  const id = getReadmeId(kind, storyName);
  store.set(id, Array.isArray(readme) ? readme : [readme]);
};
