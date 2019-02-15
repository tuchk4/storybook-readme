import React from 'react';
import ReactDOM from 'react-dom';
import makeTableComponent from '@storybook/addon-info/dist/components/makeTableComponent';

import StoryPreview from './components/StoryPreview';
import FooterDocs from './components/FooterDocs';

import commonHandler from '../common';
import highlight from '../../services/highlite';

const PropsTable = makeTableComponent(props => {
  console.log(props);
  return <div>Props Table</div>;
});
const getName = type => type.displayName || type.name;
class Story extends React.Component {
  ref = null;

  state = {
    asProxy: false,
  };

  highlight() {
    if (this.ref) {
      highlight(this.ref, {
        withJSX: true,
      });
    }
  }

  handleRef = ref => {
    this.ref = ref;
    this.highlight();

    if (this.ref) {
      const childrenReadmeDocs = this.ref.querySelector(
        '.storybook-readme-story'
      );

      if (childrenReadmeDocs) {
        this.setState({
          asProxy: true,
        });
      }
    }
  };

  componentDidUpdate() {
    this.highlight();
  }

  _getPropTables({ children }) {
    const {
      propTablesExclude,
      maxPropObjectKeys,
      maxPropArrayLength,
      maxPropStringLength,
      excludedPropTypes,
    } = this.props;

    const types = new Map();

    // if (propTables === null) {
    //   return null;
    // }

    console.log(this.props);

    if (!children) {
      return null;
    }

    // if (propTables) {
    //   propTables.forEach(type => {
    //     types.set(type, true);
    //   });
    // }

    // depth-first traverse and collect types
    const extract = innerChildren => {
      if (!innerChildren) {
        return;
      }
      if (Array.isArray(innerChildren)) {
        innerChildren.forEach(extract);
        return;
      }
      if (innerChildren.props && innerChildren.props.children) {
        extract(innerChildren.props.children);
      }
      if (
        typeof innerChildren === 'string' ||
        typeof innerChildren.type === 'string' ||
        (Array.isArray(propTablesExclude) && // also ignore excluded types
          ~propTablesExclude.indexOf(innerChildren.type)) // eslint-disable-line no-bitwise
      ) {
        return;
      }
      if (innerChildren.type && !types.has(innerChildren.type)) {
        types.set(innerChildren.type, true);
      }
    };

    // extract components from children
    extract(children);

    const array = Array.from(types.keys());
    array.sort((a, b) => (getName(a) > getName(b) ? 1 : -1));

    let propTables = array.map((type, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <div key={`${getName(type)}_${i}`}>
        <h2>"{getName(type)}" Component</h2>
        <PropsTable
          type={type}
          maxPropObjectKeys={maxPropObjectKeys}
          maxPropArrayLength={maxPropArrayLength}
          maxPropStringLength={maxPropStringLength}
          excludedPropTypes={excludedPropTypes}
        />
      </div>
    ));

    if (!propTables || propTables.length === 0) {
      return null;
    }

    return (
      <div>
        <h1>Prop Types</h1>
        {propTables}
      </div>
    );
  }

  render() {
    const {
      storyFn,
      story,
      kind,
      config,
      docs: { docsAfterPreview, docsBeforePreview },
    } = this.props;

    const PreviewComponent = config.PreviewComponent || StoryPreview;
    const FooterComponent = config.FooterComponent || FooterDocs;

    if (this.state.asProxy) {
      return storyFn({ kind, story });
    }

    // const Foo = PropsTable({
    //   type: storyFn,
    // });
    // console.log(kind, story, storyFn);

    const r = storyFn({ kind, story });

    return (
      <div
        className={'storybook-readme-story'}
        style={{ padding: '8px' }}
        ref={this.handleRef}
      >
        {this._getPropTables({
          children: r,
        })}
        {docsBeforePreview &&
          docsBeforePreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}

        <PreviewComponent>{r}</PreviewComponent>

        {docsAfterPreview &&
          docsAfterPreview.map((doc, index) => (
            <div
              key={index}
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: doc }}
            />
          ))}

        {config.docsAtFooter && (
          <FooterComponent>
            <div
              className={'markdown-body'}
              dangerouslySetInnerHTML={{ __html: config.docsAtFooter }}
            />
          </FooterComponent>
        )}
      </div>
    );
  }
}

function withDocsCallAsHoc({ docs, config, storyFn }) {
  return ({ kind, story }) =>
    React.createElement(Story, {
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function withDocsCallAsDecorator({ docs, config }) {
  return (storyFn, { kind, story }) =>
    React.createElement(Story, {
      docs,
      config,
      storyFn,
      kind,
      story,
    });
}

function doc({ docs, config }) {
  return ({ kind, story }) =>
    React.createElement(Story, {
      docs: {},
      config: {
        ...config,
        PreviewComponent: ({ children }) => <div>{children}</div>,
      },
      storyFn: () =>
        docs.map((doc, index) => (
          <div
            key={index}
            className={'markdown-body'}
            dangerouslySetInnerHTML={{ __html: doc }}
          />
        )),
      kind,
      story,
    });
}

export default {
  doc,
  withReadme: commonHandler.withReadme,
  withDocs: {
    callAsDecorator: withDocsCallAsDecorator,
    callAsHoc: withDocsCallAsHoc,
  },
};
