export default {
  data: function data() {
    return {
      styles: {
        margin: '32px 0'
      }
    };
  },
  template: "<div v-bind:style=\"styles\"><slot></slot></div>"
};