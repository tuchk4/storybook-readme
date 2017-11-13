import highlight from '../../../services/highlite';

export default {
  mounted: function mounted() {
    highlight(this.$el);
  },

  props: ['docs'],
  template:
    '\n    <div>\n      <template v-if="docs">\n          <div v-for="(doc, index) in docs" :key="index">\n          <div v-html="doc" class="markdown-body"></div>\n          </div>\n      </template>\n    </div>\n  ',
};
