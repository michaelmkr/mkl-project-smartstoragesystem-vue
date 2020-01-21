<template>
    <div id="header">
        <div id="header-logo">logo</div>
        <div id="header-spacer">spacer</div>
        <div id="header-hamburger" @click="showMenu()">hamburger</div>
    </div>
</template>

<script>
    export default {
        name: "headerbar",
        methods: {
            showMenu() {
                var x = document.getElementById("menu");
                x.style.display = "block";
            },
        },
    }
</script>

<style scoped>

</style>
