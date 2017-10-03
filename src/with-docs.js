import React from 'react';
import { ADD_README_EVENT } from './constants';
import Markdown from './components/markdown';
import ReadmeContainer from './components/readme-container';
import { SPLITTER, clearSplitter, normalize } from './readme-manager';

const common = {
  footer: null,
};

const markdownContainerStyle = {
  margin: '16px 16px 36px',
};

const Preview = ({ children }) => {
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

const withDocsContainer = ({ storyFn, kind, story, readme }) => {
  const source = normalize(readme);

  if (common.footer) {
    source.push(common.footer);
  }

  const main = source[0];

  let [readmeBeforePreview, readmeAfterPreview] = main.split(SPLITTER);
  if (!readmeAfterPreview) {
    readmeAfterPreview = readmeBeforePreview;
    readmeBeforePreview = null;
  }

  const fullReadmeAfterPreview = [readmeAfterPreview, ...source.slice(1)];

  return (
    <div>
      {readmeBeforePreview && (
        <ReadmeContainer
          style={markdownContainerStyle}
          markdown={readmeBeforePreview}
        />
      )}
      <Preview>{storyFn()}</Preview>
      <ReadmeContainer
        style={markdownContainerStyle}
        markdown={clearSplitter(fullReadmeAfterPreview)}
      />
    </div>
  );
};

const withDocs = function(readme, storyFn = null) {
  if (storyFn === null) {
    return (storyFn, { kind, story }) => {
      return withDocsContainer({
        storyFn,
        kind,
        story,
        readme,
      });
    };
  } else {
    return ({ kind, story }) => {
      return withDocsContainer({
        storyFn,
        kind,
        story,
        readme,
      });
    };
  }
};

withDocs.addFooter = footer => {
  common.footer = footer;
};

export default withDocs;
