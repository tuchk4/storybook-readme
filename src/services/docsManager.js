const store = new Map();
const getDocId = (kind, storyName) => `${kind}.${storyName}`;

export const getDocs = (kind, storyName) => {
  const id = getDocId(kind, storyName);

  if (!store.has(id)) {
    return {};
  }

  return store.get(id);
};

export const setDocs = (kind, storyName, docs = {}) => {
  const id = getDocId(kind, storyName);
  store.set(id, docs);
};
