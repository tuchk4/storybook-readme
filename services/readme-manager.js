function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var store = new Map();
var getReadmeId = function getReadmeId(kind, storyName) {
  return kind + '.' + storyName;
};

export var SPLITTER = '<!-- STORY -->';

export function clearSplitter(readme) {
  return readme.map(function(source) {
    return source.replace(SPLITTER, '');
  });
}

export function normalize(readme) {
  return Array.isArray(readme)
    ? [].concat(_toConsumableArray(readme))
    : [readme];
}

export var getReadme = function getReadme(kind, storyName) {
  var id = getReadmeId(kind, storyName);

  if (!store.has(id)) {
    return [];
  }

  return clearSplitter(store.get(id));
};

export var setReadme = function setReadme(kind, storyName) {
  var readme =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var id = getReadmeId(kind, storyName);
  store.set(id, Array.isArray(readme) ? readme : [readme]);
};
