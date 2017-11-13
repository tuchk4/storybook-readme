// import React from 'react';
// import ReactDOM from 'react-dom/server';
// import withDocs from '../components/with-docs';

function withDocsCallAsHoc({ config, storyFn }) {
  throw new Error('todo');
  return {
    data() {
      return {
        story: storyFn(),
      };
    },

    render(h) {
      return h(this.story);
    },
  };
}

function withDocsCallAsDecorator({ readme, config }) {
  return (storyFn, { kind, story }) => {
    return {
      data() {
        return {
          story: storyFn({ kind, story }),
        };
      },

      render(h) {
        return h(this.story);
      },
    };
  };
}

function withReadmeCallAsDecorator() {}
function withReadmeCallAsHoc() {}

export default {
  withReadme: {
    callAsDecorator: withReadmeCallAsDecorator,
    callAsHoc: withReadmeCallAsHoc,
  },
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
