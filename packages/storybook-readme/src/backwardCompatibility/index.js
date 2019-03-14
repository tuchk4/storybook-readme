import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import vueHandler from './env/vue';
import reactHandler from './env/react';

import marked from '../services/marked';

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

function withCallType({ type }) {
  if (type === DOC) {
    return (...args) => {
      return handler.doc({
        md: args,
      });
    };
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
      case args.length === 1 && isPlainObject(args[0]): {
        console.log(`
storybook-readme:

"withDocs()" as configurable function call is deprecated and do nothing at v5.0.0:

withDocs({
  preview: props => {}
  footer: props => {}
})(README);
      
`);
        return withCallType({
          type,
        });
      }
      /**
       * .addDecorator(
       *  withDocs(README)
       * )
       *
       * .addDecorator(
       *  withDocs([README1, README2])
       * )
       */
      case args.length === 1 && (isString(args[0]) || isArray(args[0])): {
        return typeHandler.callAsDecorator({
          md: args[0],
        });
      }

      /**
       * withDocs(README, story)
       * withDocs([README1, README2], story)
       */
      case args.length === 2: {
        return typeHandler.callAsHoc({
          md: args[0],
          story: args[1],
        });
      }

      default: {
        throw new Error(
          'storybook-readme: wrong arguments withReadme / withDocs /doc',
        );
      }
    }
  };
}

export const doc = (...args) => {
  return withCallType({
    type: DOC,
  })(...args);
};

/**
 * @deprecated
 */
export const withReadme = (...args) => {
  console.error(`
storybook-readme:

At version ^5.0.0 "withReadme()" is deprectaed. Now it works but will be removed at next release.
Use "addParameters()"

storiesOf('My Component', module)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add('MyComponent story', MyComponent)
  .add('MyComponent story', MyComponent, {
    readme: {
      // will override
      sidebar: CUSTOM_README,
    },
  })
`);

  return withCallType({ type: WITH_README })(...args);
};

/**
 * @deprecated
 */
export const withDocs = (...args) => {
  console.error(`
storybook-readme:

At version ^5.0.0 "withDocs()" is deprectaed. Now it works but will be removed at next release.
Use "addParameters()" instead

storiesOf('My Component', module)
  .addParameters({
    readme: {
      content: README,
    },
  })
  .add('MyComponent story', MyComponent)
  .add('MyComponent story', MyComponent, {
    readme: {
      // will override
      content: CUSTOM_README,
    },
  });
`);

  return withCallType({ type: WITH_DOCS })(...args);
};

/**
 * @deprecated
 */
withDocs.addFooterDocs = docsAtFooter => {
  console.error(`
storybook-readme:

withDocs.addFooterDocs() is deprecated at v5.0.0 and do nothing.
In next releases will be removed.

`);
};

/**
 * @deprecated
 */
withReadme.addFooterDocs = docsAtFooter => {
  console.error(`
storybook-readme:

withReadme.addFooterDocs() is deprecated at v5.0.0 and do nothing.
In next releases will be removed.

`);
};
