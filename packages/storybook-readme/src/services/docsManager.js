const store = new Map();

export const getDocs = id => {
  if (!store.has(id)) {
    return {};
  }

  return store.get(id);
};

export const setDocs = (id, docs = {}) => {
  store.set(id, docs);
};
