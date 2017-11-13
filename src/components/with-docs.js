import React from 'react';

import Markdown from './markdown';
import ReadmeContainer from './readme-container';

import { SPLITTER, clearSplitter, normalize } from '../readme-manager';

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

export default function withDocs({
  storyFn,
  kind,
  story,
  readme,
  config: {
    PreviewComponent = DefaultPreview,
    FooterComponent = DefaultFooter,
    footer,
  } = {},
}) {
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
      {footer && (
        <FooterComponent>
          <ReadmeContainer markdown={footer} />
        </FooterComponent>
      )}
    </div>
  );
}
