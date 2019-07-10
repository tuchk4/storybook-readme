// import marked from 'marked';
import React, { createElement } from 'react';
import * as buble from 'buble';
import { Parser } from 'acorn';

import marksy from 'marksy/jsx';

const unsemicolon = s => s.replace(/;\s*$/, '');

function processCode(code) {
  const ast = Parser.parse(code, {
    ecmaVersion: 2019,
    sourceType: 'module',
  });

  if (!ast) {
    return code;
  }

  const firstExpression = ast.body
    .reverse()
    .find(({ type }) => type === 'ExpressionStatement');

  if (!firstExpression) {
    return code;
  }

  const { start, end } = firstExpression;

  const firstExpressionCode = unsemicolon(code.substring(start, end));
  return `
${unsemicolon(code.substring(0, start))};

return (${firstExpressionCode});
`;
}

const getStoryComponent = code => {
  return new Function('require', 'state', 'setState', 'React', code);
};

export default md => {
  const compile = marksy({
    createElement,
    elements: {
      code({ language, code, ...props }) {
        const transformedCode = processCode(buble.transform(code).code);
        const story = getStoryComponent(transformedCode);

        // find initial state variable at AST ans set in here
        const initialState = {};
        const [state, setState] = React.useState({
          ...initialState,
        });

        return <div>{story(require, state, setState, React)}</div>;
      },
    },
  });

  const compiled = compile(md);

  return compiled.tree;
};
