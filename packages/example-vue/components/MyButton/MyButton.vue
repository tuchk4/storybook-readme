<template>
  <button class="button" :class="{
    button_alert: alert, 
    button_success: success

  }">
    <slot></slot>
  </button>
</template>

<docs>

## Vue docs blocks 

This docs are inside `MyButton.vue` component.

### :smile: Usage

Buttons allow users to take actions, and make choices, with a single tap. Supports all default HTML Button properties. See Material Design Button for UI/UX information.

Button variants could be imported separately.

```js
import { OutlinedButton, ContainedButton, TextButton } from 'Button';
```

<!-- PROPS -->

</docs>

<script>
export default {
  props: ['variant'],
  data() {
    return {
      success: this.$props.variant === 'success',
      warning: this.$props.variant === 'warning',
      alert: this.$props.variant === 'alert',
    };
  },
};
</script>

<style>
.button {
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  padding: 8px 12px;
  outline: none;

  border-width: 2px;
  border-style: solid;
  border-color: black;

  border-radius: 8px;
  color: rgba(0, 0, 0, 0.96);
}

.button:hover {
  background: yellow;
  border-width: 3px;

  padding: 7px 11px;
}

.button:active {
  background: yellow;
  border-width: 4px;

  padding: 6px 10px;
}

.button_success {
  border-color: green;
}

.button_alert {
  border-color: red;
}

.button_warning {
  border-color: orange;
}
</style>