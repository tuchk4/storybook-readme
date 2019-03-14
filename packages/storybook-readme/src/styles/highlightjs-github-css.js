import stringRaw from 'string-raw';

const getStyles = theme => stringRaw`
/*
  github.com style (c) Vasily Polovnyov <vast@whiteants.net>
*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #333;
  background: #f8f8f8;
}

.hljs-comment,
.hljs-quote {
  color: #998;
  font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-subst {
  color: #333;
  font-weight: bold;
}

.hljs-number,
.hljs-literal,
.hljs-variable,
.hljs-template-variable,
.hljs-tag .hljs-attr {
  color: #008080;
}

.hljs-string,
.hljs-doctag {
  color: #d14;
}

.hljs-title,
.hljs-section,
.hljs-selector-id {
  color: #900;
  font-weight: bold;
}

.hljs-subst {
  font-weight: normal;
}

.hljs-type,
.hljs-class .hljs-title {
  color: #458;
  font-weight: bold;
}

.hljs-tag,
.hljs-name,
.hljs-attribute {
  color: #000080;
  font-weight: normal;
}

.hljs-regexp,
.hljs-link {
  color: #009926;
}

.hljs-symbol,
.hljs-bullet {
  color: #990073;
}

.hljs-built_in,
.hljs-builtin-name {
  color: #0086b3;
}

.hljs-meta {
  color: #999;
  font-weight: bold;
}

.hljs-deletion {
  background: #fdd;
}

.hljs-addition {
  background: #dfd;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}
`;

function pickValues(theme) {
  return {};
}

const DEFAULT_THEME = {};

let counter = 0;
const inserted = {};

export default function insert(theme = {}) {
  const t = pickValues({ ...DEFAULT_THEME, ...theme });

  const key = JSON.stringify(t);

  if (inserted[key]) {
    return inserted[key];
  }

  const styleNode = document.createElement('style');
  const id = `highlightjs-github-css-${++counter}`;

  inserted[key] = id;
  styleNode.id = id;

  styleNode.innerHTML = getStyles(t);

  document.head.prepend(styleNode);

  return inserted[key];
}
