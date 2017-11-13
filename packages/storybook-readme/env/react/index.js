var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

import React from 'react';
import ReactDOM from 'react-dom';
import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

import commonHandler from '../common';
import highlight from '../../services/highlite';

var Story = (function(_React$Component) {
  _inherits(Story, _React$Component);

  function Story() {
    _classCallCheck(this, Story);

    return _possibleConstructorReturn(
      this,
      (Story.__proto__ || Object.getPrototypeOf(Story)).apply(this, arguments)
    );
  }

  _createClass(Story, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var el = ReactDOM.findDOMNode(this);

        highlight(el, {
          withJSX: true,
        });
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var el = ReactDOM.findDOMNode(this);

        highlight(el, {
          withJSX: true,
        });
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          storyFn = _props.storyFn,
          story = _props.story,
          kind = _props.kind,
          config = _props.config,
          _props$docs = _props.docs,
          docsAfterPreview = _props$docs.docsAfterPreview,
          docsBeforePreview = _props$docs.docsBeforePreview;

        var PreviewComponent = config.PreviewComponent || StoryPreview;
        var FooterComponent = config.FooterComponent || FooterDocs;

        return React.createElement(
          'div',
          { style: { padding: '10px' } },
          docsBeforePreview &&
            docsBeforePreview.map(function(doc, index) {
              return React.createElement('div', {
                key: index,
                className: 'markdown-body',
                dangerouslySetInnerHTML: { __html: doc },
              });
            }),
          React.createElement(
            PreviewComponent,
            null,
            storyFn({ kind: kind, story: story })
          ),
          docsAfterPreview &&
            docsAfterPreview.map(function(doc, index) {
              return React.createElement('div', {
                key: index,
                className: 'markdown-body',
                dangerouslySetInnerHTML: { __html: doc },
              });
            }),
          config.docsAtFooter &&
            React.createElement(
              FooterComponent,
              null,
              React.createElement('div', {
                className: 'markdown-body',
                dangerouslySetInnerHTML: { __html: config.docsAtFooter },
              })
            )
        );
      },
    },
  ]);

  return Story;
})(React.Component);

function withDocsCallAsHoc(_ref) {
  var docs = _ref.docs,
    config = _ref.config,
    storyFn = _ref.storyFn;

  return function(_ref2) {
    var kind = _ref2.kind,
      story = _ref2.story;
    return React.createElement(Story, {
      docs: docs,
      config: config,
      storyFn: storyFn,
      kind: kind,
      story: story,
    });
  };
}

function withDocsCallAsDecorator(_ref3) {
  var docs = _ref3.docs,
    config = _ref3.config;

  return function(storyFn, _ref4) {
    var kind = _ref4.kind,
      story = _ref4.story;
    return React.createElement(Story, {
      docs: docs,
      config: config,
      storyFn: storyFn,
      kind: kind,
      story: story,
    });
  };
}

export default {
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
