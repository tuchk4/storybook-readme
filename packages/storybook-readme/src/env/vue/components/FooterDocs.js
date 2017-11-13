export default {
  data() {
    return {
      styles: {
        borderTop: '1px dashed #e5e5e5',
        paddingTop: '16px',
      },
    };
  },
  template: `<div v-bind:style="styles"><slot></slot></div>`,
};
