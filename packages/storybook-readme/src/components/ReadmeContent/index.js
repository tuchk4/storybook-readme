import React from 'react';
import ReactDOM from 'react-dom';

import StoryPreviewDefault from '../Preview/StoryPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import MdPreviewDefault from '../Preview/MdPreview';

import highlight from '../../services/highlite';

import {
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
} from '../../const';

export default class ReadmeContent extends React.Component {
  static defaultProps = {
    types: [LAYOUT_TYPE_MD, LAYOUT_TYPE_STORY, LAYOUT_TYPE_PROPS_TABLE],
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

  render() {
    const {
      layout,
      MdPreview = MdPreviewDefault,
      StoryPreview = StoryPreviewDefault,
      FooterPreview = FooterPreviewDefault,
    } = this.props;

    return (
      <div
        className={'storybook-readme-story'}
        style={{ padding: '8px' }}
        ref={this.handleRef}
      >
        {layout.map(({ type, content }, index) => {
          if (!this.props.types.includes(type)) {
            return null;
          }

          switch (type) {
            case LAYOUT_TYPE_MD:
              return (
                <div
                  key={index}
                  className={'markdown-body'}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              );

            case LAYOUT_TYPE_STORY:
              return <StoryPreview key={index}>{content}</StoryPreview>;

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
    );
  }
}
