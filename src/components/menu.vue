<template>
    <div id="menu">
        <ul style="list-style-type:none;">
            <div id="menu-close" @click="hideMenu">x</div>
            <li><a href="/">Home</a></li>
            <li><a href="/store">Einlagern</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "menu",
        methods: {
            hideMenu() {
                var x = document.getElementById("menu");
                x.style.display = "none";
            }
        },
    }
</script>

<style scoped>

</style>
