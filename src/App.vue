<template>
  <div id="app">
    <headerbar></headerbar>
    <Menu></Menu>
    <main class="mdl-layout__content">
      <router-view class="main-content"/>
    </main>
  </div>
</template>

<script>
import Headerbar from "@/components/headerbar";
import Menu from "@/components/menu";
export default {
  name: 'app',
  components: {
    Menu,
    Headerbar

  }
}
</script>
