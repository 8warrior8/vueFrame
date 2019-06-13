<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
  body{
    margin:0;
    padding:0;
  }
  #app {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
