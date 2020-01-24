<template>
    <div id="header">
        <div id="header-logo"><img src="../assets/logo.svg"></div>
        <div id="header-spacer"></div>
        <div id="header-hamburger" @click="showMenu()"><i class="material-icons">menu</i></div>
    </div>
</template>

<script>
    export default {
        name: "headerbar",
        methods: {
            showMenu() {
                var x = document.getElementById("menucomponent");
                x.style.display = "block";
            },
        },
    }
</script>

<style scoped>

</style>
