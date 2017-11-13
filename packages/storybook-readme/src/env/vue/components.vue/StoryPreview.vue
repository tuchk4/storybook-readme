<template>
  <div class="default_preview"><slot></slot></div>
</template>

<style>
.default_preview {
  position: relative;
  box-sizing: border-box;
  margin: 16px 0 16px 0;
  padding: 50px 35px;
  border: 1px dashed #e5e5e5;
  background-color: #ffffff;
  transition: background-color 0.2s;
  text-align: center;
}
</style>