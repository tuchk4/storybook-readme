import MarkdownContainer from './MarkdownContainer';

export default {
  data: function data() {
    return {
      styles: {
        margin: '16px 16px 36px',
      },
      docsBeforePreview: this.$props.docs.docsBeforePreview,
      docsAfterPreview: this.$props.docs.docsAfterPreview,
    };
  },

  components: { MarkdownContainer: MarkdownContainer },
  props: ['docs'],
  template:
    '\n    <div v-bind:style="styles">\n      <markdown-container :docs="docsBeforePreview" />\n      <slot></slot>\n      <markdown-container :docs="docsAfterPreview" />\n      <slot name="footer"></slot>\n    </div>\n  ',
};
