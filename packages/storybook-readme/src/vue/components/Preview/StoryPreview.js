export default {
  data() {
    return {
      styles: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '32px 0',
      },
    };
  },
  template: `<div v-bind:style="styles"><div><slot></slot></div></div>`,
};
