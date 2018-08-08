import marked from './marked';

export const SPLITTER = '<!-- STORY -->';

export function clearSplitter(docs) {
  return docs.map(doc => doc.replace(SPLITTER, ''));
}

export default function(docs) {
  const normalized = Array.isArray(docs) ? [...docs] : [docs];

  const grouped = normalized.reduce(
    (docs, doc) => {
      let [docsBeforePreview, ...docsAfterPreview] = doc.split(SPLITTER);

      if (!docsAfterPreview || docsAfterPreview.length === 0) {
        docs.docsAfterPreview.push(docsBeforePreview);
      } else {
        docs.docsBeforePreview.push(docsBeforePreview);
        docs.docsAfterPreview.push(...docsAfterPreview);
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
      grouped.docsBeforePreview.length === 0
        ? null
        : grouped.docsBeforePreview.map(marked),
    docsAfterPreview:
      grouped.docsAfterPreview.length === 0
        ? null
        : grouped.docsAfterPreview.map(marked),
  };
}
