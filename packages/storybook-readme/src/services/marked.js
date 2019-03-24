import marked from 'marked';
import { README_CODE_CLASS } from '../const'

marked.setOptions({
  langPrefix: `${README_CODE_CLASS} language-`
})

export default md => marked(md);
