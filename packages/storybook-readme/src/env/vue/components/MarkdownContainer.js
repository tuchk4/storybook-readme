import highlight from '../../../services/highlite';

export default {
  mounted() {
    highlight(this.$el);
  },
  props: ['docs'],
  template: `
    <div>
      <template v-if="docs">
          <div v-for="(doc, index) in docs" :key="index">
          <div v-html="doc" class="markdown-body"></div>
          </div>
      </template>
    </div>
  `,
};
