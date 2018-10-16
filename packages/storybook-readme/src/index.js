import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import vueHandler from './env/vue';
import reactHandler from './env/react';
import normalizeDocs from './services/normalizeDocs';
import marked from './services/marked';
import './styles/github-markdown-css';

let handler = null;

switch (window.STORYBOOK_ENV) {
  case 'vue':
    handler = vueHandler;
    break;
  case 'react':
    handler = reactHandler;
    break;
  default:
    handler = reactHandler;
}

const WITH_README = 'WITH_README';
const WITH_DOCS = 'WITH_DOCS';
const DOC = 'DOC';

const DEFAULT_CONFIG = {
  FooterComponent: null,
  PreviewComponent: null,
  docsAtFooter: null,
};

const WITH_DOCS_COMMON_CONFIG = {};
const WITH_README_COMMON_CONFIG = {};

function getCommonConfig(type) {
  switch (type) {
    case WITH_README:
      return WITH_README_COMMON_CONFIG;

    case WITH_DOCS:
      return WITH_DOCS_COMMON_CONFIG;

    default:
      throw new Error('storybook-readme: wrong type (getCommonConfig)');
  }
}

function withCallType({ type, config }) {
  if (type === DOC) {
    return (...args) =>
      handler.doc({
        docs: args,
        config,
      });
  }

  let typeHandler = null;

  switch (type) {
    case WITH_README:
      typeHandler = handler.withReadme;
      break;
    case WITH_DOCS:
      typeHandler = handler.withDocs;
      break;
    default:
      throw new Error('storybook-readme: wrong type (withCallType)');
  }

  return (...args) => {
    switch (true) {
      /**
       * withDocs({
       *  preview: props => {}
       *  footer: props => {}
       * })(README)
       */
      case args.length === 1 && isPlainObject(args[0]):
        return withCallType({
          type,
          config: {
            ...config,
            ...args[0],
          },
        });

      /**
       * .addDecorator(
       *  withDocs(README)
       * )
       *
       * .addDecorator(
       *  withDocs([README1, README2])
       * )
       */
      case args.length === 1 && (isString(args[0]) || isArray(args[0])):
        return typeHandler.callAsDecorator({
          docs: normalizeDocs(args[0]),
          storyFn: null,
          config: {
            ...config,
            ...getCommonConfig(type),
          },
        });

      /**
       * withDocs(README, storyFn)
       * withDocs([README1, README2], storyFn)
       */
      case args.length === 2:
        return typeHandler.callAsHoc({
          docs: normalizeDocs(args[0]),
          storyFn: args[1],
          config: {
            ...config,
            ...getCommonConfig(type),
          },
        });

      default:
        throw new Error('storybook-readme: wrong arguments');
    }
  };
}

export const withReadme = (...args) => {
  return withCallType({ type: WITH_README, config: DEFAULT_CONFIG })(...args);
};

export const withDocs = (...args) => {
  return withCallType({ type: WITH_DOCS, config: DEFAULT_CONFIG })(...args);
};

export const doc = (...args) => {
  return withCallType({
    type: DOC,
    config: DEFAULT_CONFIG,
  })(...args.map(d => marked(d)));
};

withDocs.addFooterDocs = docsAtFooter => {
  WITH_DOCS_COMMON_CONFIG.docsAtFooter = marked(docsAtFooter);
};

withReadme.addFooterDocs = docsAtFooter => {
  WITH_README_COMMON_CONFIG.docsAtFooter = marked(docsAtFooter);
};
