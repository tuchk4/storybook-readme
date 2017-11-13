import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import vueHandler from './env/vue';
import reactHandler from './env/react';
import normalizeDocs from './services/normalizeDocs';
import './styles/github-markdown-css';

var handler = null;

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

var WITH_README = 'WITH_README';
var WITH_DOCS = 'WITH_DOCS';

var DEFAULT_CONFIG = {
  FooterComponent: null,
  PreviewComponent: null,
  docsAtFooter: null,
};

var WITH_DOCS_COMMON_CONFIG = {};
var WITH_README_COMMON_CONFIG = {};

function getCommonConfig(type) {
  switch (type) {
    case WITH_README:
      return WITH_README_COMMON_CONFIG;

    case WITH_DOCS:
      return WITH_DOCS_COMMON_CONFIG;

    default:
      throw new Error('wrong type');
  }
}

function withCallType(_ref) {
  var type = _ref.type,
    config = _ref.config;

  var typeHandler = null;

  switch (type) {
    case WITH_README:
      typeHandler = handler.withReadme;
      break;
    case WITH_DOCS:
      typeHandler = handler.withDocs;
      break;
    default:
      throw new Error('wrong type');
  }

  return function() {
    switch (true) {
      /**
       * withDocs({
       *  preview: props => {}
       *  footer: props => {}
       * })(README)
       */
      case arguments.length === 1 &&
        isPlainObject(arguments.length <= 0 ? undefined : arguments[0]):
        return withCallType({
          type: type,
          config: Object.assign(
            {},
            config,
            arguments.length <= 0 ? undefined : arguments[0]
          ),
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
      case arguments.length === 1 &&
        (isString(arguments.length <= 0 ? undefined : arguments[0]) ||
          isArray(arguments.length <= 0 ? undefined : arguments[0])):
        return typeHandler.callAsDecorator({
          docs: normalizeDocs(arguments.length <= 0 ? undefined : arguments[0]),
          storyFn: null,
          config: Object.assign({}, config, getCommonConfig(type)),
        });

      /**
       * withDocs(README, storyFn)
       * withDocs([README1, README2], storyFn)
       */
      case arguments.length === 2:
        return typeHandler.callAsHoc({
          docs: normalizeDocs(arguments.length <= 0 ? undefined : arguments[0]),
          storyFn: arguments.length <= 1 ? undefined : arguments[1],
          config: Object.assign({}, config, getCommonConfig(type)),
        });

      default:
        throw new Error('wrong arguments');
    }
  };
}

// withCallType.addFooter = footer => {
//   common.footer = footer;
// };

export var withReadme = function withReadme() {
  return withCallType({ type: WITH_README, config: DEFAULT_CONFIG }).apply(
    undefined,
    arguments
  );
};

export var withDocs = function withDocs() {
  return withCallType({ type: WITH_DOCS, config: DEFAULT_CONFIG }).apply(
    undefined,
    arguments
  );
};

withDocs.addFooterDocs = function(docsAtFooter) {
  WITH_DOCS_COMMON_CONFIG.docsAtFooter = docsAtFooter;
};

withReadme.addFooterDocs = function(docsAtFooter) {
  WITH_README_COMMON_CONFIG.docsAtFooter = docsAtFooter;
};
