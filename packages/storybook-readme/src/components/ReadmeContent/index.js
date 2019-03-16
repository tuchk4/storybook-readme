import React from 'react';

import StoryPreviewDefault from '../Preview/StoryPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import HeaderPreviewDefault from '../Preview/HeaderPreview';
import DocPreviewDefault from '../Preview/DocPreview';

import highlight from '../../services/highlite';
import { getConfig } from '../../services/config';
import insertGithubMarkdownCss from '../../styles/githubMarkdownCss';
import insertCodeThemeCss from '../../styles/codeThemeCss';

import {
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_FOOTER_MD,
  LAYOUT_TYPE_HEADER_MD,
} from '../../const';

const ReadmeContentContext = React.createContext({
  withPreview: true,
});

export default class ReadmeContent extends React.Component {
  static defaultProps = {
    types: [
      LAYOUT_TYPE_MD,
      LAYOUT_TYPE_STORY,
      LAYOUT_TYPE_PROPS_TABLE,
      LAYOUT_TYPE_FOOTER_MD,
      LAYOUT_TYPE_HEADER_MD,
    ],
  };

  static contextType = ReadmeContentContext;

  state = {
    withPreview: true,
  };

  ref = null;

  highlight() {
    if (this.ref) {
      highlight(this.ref);
    }
  }

  handleRef = ref => {
    this.ref = ref;
    this.highlight();
  };

  componentDidUpdate() {
    this.highlight();
  }

  componentWillUnmount() {
    this.ref = null;
  }

  componentDidMount() {
    /**
     * ReadmeContent notify parent ReadmeContent to hide story preview
     * if combined decorators/hocs  way with `addParamters()`
     */
    if (this.context && this.context.notifyParent) {
      this.context.notifyParent();
    } else {
      insertGithubMarkdownCss({
        theme: this.props.theme,
      });

      insertCodeThemeCss({
        codeTheme: this.props.codeTheme || 'github',
      });
    }
  }

  notifyParent = () => {
    this.setState({
      withPreview: false,
    });
  };

  render() {
    const config = getConfig();

    const {
      layout,
      withPreview = true,
      StoryPreview = config.StoryPreview || StoryPreviewDefault,
      FooterPreview = config.FooterPreview || FooterPreviewDefault,
      HeaderPreview = config.HeaderPreview || HeaderPreviewDefault,
      DocPreview = config.DocPreview || DocPreviewDefault,
    } = this.props;

    return (
      <ReadmeContentContext.Provider
        value={{
          notifyParent: this.notifyParent,
        }}
      >
        <div className={'storybook-readme-story'} ref={this.handleRef}>
          {layout.map(({ type, content }, index) => {
            if (!this.props.types.includes(type)) {
              return null;
            }

            switch (type) {
              case LAYOUT_TYPE_FOOTER_MD:
                return (
                  <FooterPreview key={index}>
                    <div
                      className={'markdown-body'}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </FooterPreview>
                );
              case LAYOUT_TYPE_HEADER_MD:
                return (
                  <HeaderPreview key={index}>
                    <div
                      className={'markdown-body'}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </HeaderPreview>
                );
              case LAYOUT_TYPE_MD:
                return (
                  <DocPreview key={index}>
                    <div
                      className={'markdown-body'}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </DocPreview>
                );

              case LAYOUT_TYPE_STORY: {
                if (!withPreview || !this.state.withPreview) {
                  return <React.Fragment key={index}>{content}</React.Fragment>;
                } else {
                  return <StoryPreview key={index}>{content}</StoryPreview>;
                }
              }

              case LAYOUT_TYPE_PROPS_TABLE: {
                if (!content) {
                  return null;
                }

                return content.map((md, index) => {
                  if (md === null) {
                    return null;
                  }

                  return (
                    <div
                      key={index}
                      className={'markdown-body markdown-props-table'}
                      dangerouslySetInnerHTML={{ __html: md }}
                    />
                  );
                });
              }

              default:
                return null;
            }
          })}
        </div>
      </ReadmeContentContext.Provider>
    );
  }
}
