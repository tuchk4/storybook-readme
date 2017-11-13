import React from 'react';

import commonHandler from '../common';

function withDocsCallAsDecorator() {
  xxx;
}
function withDocsCallAsHoc() {
  zzz;
}

export default {
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
