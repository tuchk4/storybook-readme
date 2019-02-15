<template>
  <button class="button" :class="{
    button_alert: alert, 
    button_success: success
  }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    alert: Boolean,
    success: Boolean,
  },
};
</script>

<style>
.button {
  padding: 5px;
  cursor: pointer;
  font-size: 15px;
  margin: 1px;
  border: 2px solid black;
  border-radius: 3px;
  color: black;
  background: white;
}

.button_alert {
  color: white;
  background: red;
}

.button_success {
  color: white;
  background: green;
}
</style>