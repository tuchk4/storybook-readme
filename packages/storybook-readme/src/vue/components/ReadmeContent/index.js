import StoryPreviewDefault from '../Preview/StoryPreview';
import HeaderPreviewDefault from '../Preview/HeaderPreview';
import FooterPreviewDefault from '../Preview/FooterPreview';
import DocPreviewDefault from '../Preview/DocPreview';

import insertGithubMarkdownCss from '../../../styles/githubMarkdownCss';
import insertCodeThemeCss from '../../../styles/codeThemeCss';
import insertPropsTableCss from '../../../styles/propsTableCss';

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
    return {
      LAYOUT_TYPE_MD,
      LAYOUT_TYPE_STORY,
      LAYOUT_TYPE_PROPS_TABLE,
      LAYOUT_TYPE_FOOTER_MD,
      LAYOUT_TYPE_HEADER_MD,
      preview: {
        StoryPreview: this.$props.StoryPreview
          ? this.$props.StoryPreview
          : StoryPreviewDefault,
        HeaderPreview: this.$props.HeaderPreview
          ? this.$props.HeaderPreview
          : HeaderPreviewDefault,
        FooterPreview: this.$props.FooterPreview
          ? this.$props.FooterPreview
          : FooterPreviewDefault,
        DocPreview: this.$props.DocPreview
          ? this.$props.DocPreview
          : DocPreviewDefault,
      },
    };
  },
  mounted() {
    this.$store.commit('notify');

    highlight(this.$el);

    insertGithubMarkdownCss({
      theme: this.theme,
    });
    insertPropsTableCss({
      theme: this.theme,
    });
    insertCodeThemeCss({
      codeTheme: this.codeTheme,
    });
  },
  props: [
    'layout',
    'codeTheme',
    'theme',
    'withPreview',
    'StoryPreview',
    'DocPreview',
    'HeaderPreview',
    'FooterPreview',
  ],
  template: `
    <div>
      <div v-for="item in layout">
     
        <component class="markdown-body"
          :is="preview.HeaderPreview"
          v-if="item.type === LAYOUT_TYPE_HEADER_MD" 
          v-html="item.content"/>

        <component class="markdown-body"
          :is="preview.DocPreview"
          v-if="item.type === LAYOUT_TYPE_MD" 
          v-html="item.content"/>

        <component class="markdown-body"
          :is="preview.FooterPreview"
          v-if="item.type === LAYOUT_TYPE_FOOTER_MD"
          v-html="item.content" />
          
        <component v-if="withPreview && item.type === LAYOUT_TYPE_STORY" 
          :is="preview.StoryPreview">
          <component :is="item.content" />
        </component>

        <div v-if="!withPreview && item.type === LAYOUT_TYPE_STORY">
          <component :is="item.content" />
        </div>

      </div>
    </div>
    `,
};
