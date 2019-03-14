import stringRaw from 'string-raw';

const styles = stringRaw`
    .markdown-props-table {
      margin: 16px 0;
    }
`;

const styleNode = document.createElement('style');
styleNode.id = 'props-table';
styleNode.innerHTML = styles;

document.head.appendChild(styleNode);
