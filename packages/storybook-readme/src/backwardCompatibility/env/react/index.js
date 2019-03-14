import React from 'react';

import ReadmeContent from '../../../components/ReadmeContent';

import commonHandler from '../common';
import getPropsTables from '../../../services/getPropsTables';
import {
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_MD,
} from '../../../const';

import getDocsLayout from '../../../services/getDocsLayout';

function withDocsCallAsHoc({ md, story }) {
  return context => {
    const layout = getDocsLayout({
      md,
      story: <React.Fragment>{story(context)}</React.Fragment>,
    });

    return (
      <ReadmeContent
        layout={layout}
        types={[LAYOUT_TYPE_PROPS_TABLE, LAYOUT_TYPE_STORY, LAYOUT_TYPE_MD]}
      />
    );
  };
}

function withDocsCallAsDecorator({ md }) {
  return (story, context) => {
    const layout = getDocsLayout({
      md,
      story: <React.Fragment>{story(context)}</React.Fragment>,
    });

    return (
      <ReadmeContent
        layout={layout}
        types={[LAYOUT_TYPE_PROPS_TABLE, LAYOUT_TYPE_STORY, LAYOUT_TYPE_MD]}
      />
    );
  };
}

function doc({ md }) {
  const layout = getDocsLayout({
    md,
    story: null,
  });

  return () => (
    <ReadmeContent
      layout={layout}
      types={[LAYOUT_TYPE_PROPS_TABLE, LAYOUT_TYPE_STORY, LAYOUT_TYPE_MD]}
    />
  );
}

export default {
  doc,
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
