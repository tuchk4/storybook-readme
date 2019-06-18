import StoryPreviewDefault from '../Preview/StoryPreview';
import HeaderPreviewDefault from '../Preview/HeaderPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import DocPreviewDefault from '../Preview/DocPreview';

import { getConfig } from '../../../services/config';
import insertGithubMarkdownCss from '../../../styles/githubMarkdownCss';
import insertCodeThemeCss from '../../../styles/codeThemeCss';

import highlight from '../../../services/highlite';

import {
  LAYOUT_TYPE_MD,
  LAYOUT_TYPE_STORY,
  LAYOUT_TYPE_PROPS_TABLE,
  LAYOUT_TYPE_FOOTER_MD,
  LAYOUT_TYPE_HEADER_MD,
} from '../../../const';

export default {
  name: 'readme-content',

  data() {
    const config = getConfig();

    const {
      StoryPreview = config.StoryPreview || StoryPreviewDefault,
      FooterPreview = config.FooterPreview || FooterPreviewDefault,
      HeaderPreview = config.HeaderPreview || HeaderPreviewDefault,
      DocPreview = config.DocPreview || DocPreviewDefault,
    } = this.$props;

    return {
      // backward,
      availableTypes: this.$props.types
        ? this.$props.types
        : [
            LAYOUT_TYPE_MD,
            LAYOUT_TYPE_STORY,
            LAYOUT_TYPE_PROPS_TABLE,
            LAYOUT_TYPE_FOOTER_MD,
            LAYOUT_TYPE_HEADER_MD,
          ],
      LAYOUT_TYPE_MD,
      LAYOUT_TYPE_STORY,
      LAYOUT_TYPE_PROPS_TABLE,
      LAYOUT_TYPE_FOOTER_MD,
      LAYOUT_TYPE_HEADER_MD,
      preview: {
        StoryPreview,
        FooterPreview,
        HeaderPreview,
        DocPreview,
      },
    };
  },
  mounted() {
    if (this.backward) {
      this.$store.commit('notify');
    }

    insertGithubMarkdownCss({
      theme: this.theme,
    });

    if (this.codeTheme) {
      insertCodeThemeCss({
        codeTheme: this.codeTheme,
      });
      highlight(this.$el);
    }
  },
  props: [
    'types',
    'layout',
    'codeTheme',
    'theme',
    'withPreview',
    'StoryPreview',
    'DocPreview',
    'HeaderPreview',
    'FooterPreview',
    'backward',
  ],
  template: `
    <div>
      <div v-for="item in layout">
     
        <component class="markdown-body"
          :is="preview.HeaderPreview"
          v-if="availableTypes.includes(item.type) && item.type === LAYOUT_TYPE_HEADER_MD" 
          v-html="item.content"/>

        <component class="markdown-body"
          :is="preview.DocPreview"
          v-if="availableTypes.includes(item.type) && item.type === LAYOUT_TYPE_MD" 
          v-html="item.content"/>

        <component class="markdown-body"
          :is="preview.FooterPreview"
          v-if="availableTypes.includes(item.type) && item.type === LAYOUT_TYPE_FOOTER_MD"
          v-html="item.content" />
          
        <component v-if="availableTypes.includes(item.type) && withPreview && item.type === LAYOUT_TYPE_STORY" 
          :is="preview.StoryPreview">
          <component :is="item.content" />
        </component>

        <div v-if="availableTypes.includes(item.type) && !withPreview && item.type === LAYOUT_TYPE_STORY">
          <component :is="item.content" />
        </div>

      </div>
    </div>
    `,
};
