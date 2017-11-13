import React from 'react';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import { ADD_README_EVENT } from './constants';
import Markdown from './components/markdown';
import ReadmeContainer from './components/readme-container';
import { SPLITTER, clearSplitter, normalize } from './readme-manager';
import reactHandlers from './react';
import vueHandlers from './vue';

const common = {
  footer: null,
};

const markdownContainerStyle = {
  margin: '16px 16px 36px',
};

const DefaultFooter = ({ children }) => {
  return (
    <div
      style={{
        borderTop: '1px dashed #e5e5e5',
        paddingTop: '16px',
      }}
    >
      {children}
    </div>
  );
};

const DefaultPreview = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        margin: '16px 16px 36px',
        padding: '50px 35px',
        border: '1px dashed #e5e5e5',
        backgroundColor: '#ffffff',
        transition: 'background-color 0.2s',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
};

const renderDocsContainer = (
  { storyFn, kind, story, readme },
  { PreviewComponent = DefaultPreview, FooterComponent = DefaultFooter }
) => {
  const source = normalize(readme);

  const main = source[0];

  let [readmeBeforePreview, readmeAfterPreview] = main.split(SPLITTER);
  if (!readmeAfterPreview) {
    readmeAfterPreview = readmeBeforePreview;
    readmeBeforePreview = null;
  }

  const fullReadmeAfterPreview = [readmeAfterPreview, ...source.slice(1)];

  return (
    <div>
      {/* Mardown before Component Story */}
      {readmeBeforePreview && (
        <ReadmeContainer
          style={markdownContainerStyle}
          markdown={readmeBeforePreview}
        />
      )}
      <PreviewComponent>{storyFn()}</PreviewComponent>

      {/* Mardown after Component Story */}
      <ReadmeContainer markdown={clearSplitter(fullReadmeAfterPreview)} />

      {/* Footer Mardown. Could be styled with FooterComponent */}
      {common.footer && (
        <FooterComponent>
          <ReadmeContainer markdown={common.footer} />
        </FooterComponent>
      )}
    </div>
  );
};

const withDocsContainer = ({ readme, storyFn = null, config = {} }) => {
  if (storyFn === null) {
    return (storyFn, { kind, story }) => {
      return renderDocsContainer(
        {
          storyFn,
          kind,
          story,
          readme,
        },
        config
      );
    };
  } else {
    return ({ kind, story }) => {
      return renderDocsContainer(
        {
          storyFn,
          kind,
          story,
          readme,
        },
        config
      );
    };
  }
};

function withDocs(...args) {
  switch (true) {
    /**
     * withDocs({
     *  preview: props => {}
     *  footer: props => {}
     * })(README)
     */
    case args.length === 1 && isPlainObject(args[0]):
      const config = args[0];
      return (readme, storyFn = null) =>
        withDocsContainer({ readme, storyFn, config });

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
      return withDocsContainer({ readme: args[0], storyFn: null });

    /**
     * withDocs(README, storyFn)
     * withDocs([README1, README2], storyFn)
     */
    case args.length === 2:
      return withDocsContainer({ readme: args[0], storyFn: args[1] });

    default:
      throw new Error('wrong withDocs arguments');
  }
}

withDocs.addFooter = footer => {
  common.footer = footer;
};

export default withDocs;
