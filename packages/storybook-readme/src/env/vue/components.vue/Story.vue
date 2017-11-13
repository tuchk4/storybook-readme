<template>
  <div class="docs_container">
    <markdown-container :docs="docsBeforePreview" />
    <slot></slot>
    <markdown-container :docs="docsAfterPreview" />
    <slot name="footer"></slot>
  </div>
</template>

<script>
import MarkdownContainer from './MarkdownContainer.vue';

export default {
  data() {
    return {
      docsBeforePreview: this.$props.docs.docsBeforePreview,
      docsAfterPreview: this.$props.docs.docsAfterPreview,
    };
  },
  components: { MarkdownContainer },
  props: ['docs'],
};
</script>

<style>
.docs_container {
  margin: 16px 16px 36px;
}
</style>