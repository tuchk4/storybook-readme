import commonHandler from '../common';
import ReadmeContent from '../../../vue/components/ReadmeContent';
import getDocsLayout from '../../../services/getDocsLayout';
import getParameters from '../../../services/getParameters';

import {
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_MD,
} from '../../../const';

function withDocsCallAsHoc({ md, story }) {
  return context => {
    const layout = getDocsLayout({
      md,
      story: story(context),
    });

    const parameters = getParameters(context);

    return {
      data() {
        return {
          parameters,
          layout,
        };
      },
      components: {
        'readme-content': ReadmeContent,
      },
      template: `<readme-content 
        v-bind:withPreview="true"
        v-bind:theme="parameters.theme"
        v-bind:codeTheme="parameters.codeTheme"
        v-bind:layout="layout" />`,
    };
  };
}

function withDocsCallAsDecorator({ md }) {
  return (story, context) => {
    const layout = getDocsLayout({
      md,
      story: story(context),
    });

    const parameters = getParameters(context);

    return {
      data() {
        return {
          parameters,
          layout,
        };
      },
      components: {
        'readme-content': ReadmeContent,
      },
      template: `<readme-content
        v-bind:withPreview="true"
        v-bind:theme="parameters.theme"
        v-bind:codeTheme="parameters.codeTheme"
        v-bind:layout="layout" />`,
    };
  };
}

function doc({ md }) {
  const layout = getDocsLayout({
    md,
    story: null,
  });

  return context => {
    const parameters = getParameters(context);

    return {
      data() {
        return {
          parameters,
          layout,
        };
      },
      components: {
        'readme-content': ReadmeContent,
      },
      template: `<readme-content 
        v-bind:theme="parameters.theme"
        v-bind:codeTheme="parameters.codeTheme"
        v-bind:layout="layout" />`,
    };
  };
}

export default {
  doc,
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
