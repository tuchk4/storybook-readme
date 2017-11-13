function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

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

export var SPLITTER = '<!-- STORY -->';

export default function(docs) {
  var normalized = Array.isArray(docs)
    ? [].concat(_toConsumableArray(docs))
    : [docs];

  var grouped = normalized.reduce(
    function(docs, doc) {
      var _doc$split = doc.split(SPLITTER),
        _doc$split2 = _toArray(_doc$split),
        docsBeforePreview = _doc$split2[0],
        docsAfterPreview = _doc$split2.slice(1);

      if (!docsAfterPreview || docsAfterPreview.length === 0) {
        docs.docsAfterPreview.push(docsBeforePreview);
      } else {
        var _docs$docsAfterPrevie;

        docs.docsBeforePreview.push(docsBeforePreview);
        (_docs$docsAfterPrevie = docs.docsAfterPreview).push.apply(
          _docs$docsAfterPrevie,
          _toConsumableArray(docsAfterPreview)
        );
      }

      return docs;
    },
    {
      docsBeforePreview: [],
      docsAfterPreview: [],
    }
  );

  return {
    docsBeforePreview:
      grouped.docsBeforePreview.length === 0 ? null : grouped.docsBeforePreview,
    docsAfterPreview:
      grouped.docsAfterPreview.length === 0 ? null : grouped.docsAfterPreview,
  };
}
