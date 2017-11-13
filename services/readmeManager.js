var store = new Map();
var getDocId = function getDocId(kind, storyName) {
  return kind + '.' + storyName;
};

export var getDocs = function getDocs(kind, storyName) {
  var id = getDocId(kind, storyName);

  if (!store.has(id)) {
    return [];
  }

  return store.get(id);
};

export var setDoc = function setDoc(kind, storyName) {
  var docs =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var id = getDocId(kind, storyName);
  store.set(id, docs);
};
