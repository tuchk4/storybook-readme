import stringRaw from 'string-raw';
import styleFactory from './styleFactory';

export default styleFactory('props-table', {
  getStyles: () => stringRaw`
  .markdown-props-table {
    margin: 16px 0;
  }
`,
});
