<template>
  <div id="app">
    <headerbar></headerbar>
    <menu-component></menu-component>
    <main class="mdl-layout__content">
      <router-view class="main-content"/>
    </main>
  </div>
</template>

<script>
import Headerbar from "@/components/headerbar";
import MenuComponent from "@/components/MenuComponent";
export default {
  name: 'app',
  components: {
    MenuComponent,
    Headerbar

  }
}
</script>
