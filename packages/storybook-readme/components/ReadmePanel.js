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

import { ADD_DOC_EVENT } from '../constants';
import { setDocs, getDocs } from '../services/docsManager';
import highlight from '../services/highlite';
import '../styles/github-markdown-css';

var markdownContainerStyle = {
  margin: '16px',
};

var ReadmePanel = (function(_React$Component) {
  _inherits(ReadmePanel, _React$Component);

  function ReadmePanel() {
    var _ref;

    _classCallCheck(this, ReadmePanel);

    for (
      var _len = arguments.length, props = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      props[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(
      this,
      (_ref =
        ReadmePanel.__proto__ || Object.getPrototypeOf(ReadmePanel)).call.apply(
        _ref,
        [this].concat(props)
      )
    );

    _this.state = {
      docs: {},
    };
    _this.waitForDocs = null;

    _this.props.channel.on(ADD_DOC_EVENT, function(_ref2) {
      var kind = _ref2.kind,
        storyName = _ref2.storyName,
        docs = _ref2.docs;

      setDocs(kind, storyName, docs);

      if (
        _this.waitForDocs &&
        _this.waitForDocs[0] == kind &&
        _this.waitForDocs[1] == storyName
      ) {
        _this.showDocs(kind, storyName);
        _this.waitForDocs = null;
      }
    });
    return _this;
  }

  _createClass(ReadmePanel, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var onStory = this.props.onStory;

        this.stopListeningOnStory = onStory(function(kind, storyName) {
          _this2.showDocs(kind, storyName);
        });

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
      key: 'showDocs',
      value: function showDocs(kind, storyName) {
        var docs = getDocs(kind, storyName);

        if (!docs.length) {
          this.waitForDocs = [kind, storyName];
        }

        this.setState({
          docs: docs,
        });
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.stopListeningOnStory) {
          this.stopListeningOnStory();
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _state$docs = this.state.docs,
          docsAfterPreview = _state$docs.docsAfterPreview,
          docsBeforePreview = _state$docs.docsBeforePreview;

        if (!docsAfterPreview && !docsBeforePreview) {
          return React.createElement(
            'div',
            { style: { padding: '10px' } },
            React.createElement(
              'div',
              { className: 'markdown-body' },
              React.createElement('p', null, 'README.md was not added')
            )
          );
        }

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
          docsAfterPreview &&
            docsAfterPreview.map(function(doc, index) {
              return React.createElement('div', {
                key: index,
                className: 'markdown-body',
                dangerouslySetInnerHTML: { __html: doc },
              });
            })
        );
      },
    },
  ]);

  return ReadmePanel;
})(React.Component);

export default ReadmePanel;
