<template>
    <div id="menucomponent">
        <ul style="list-style-type:none;">
            <div id="menuclose" @click="hideMenu">x</div>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/store">Store</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "MenuComponent",
        methods: {
            hideMenu() {
                var x = document.getElementById("menucomponent");
                x.style.display = "none";
            }
        },
    }
</script>

<style scoped>

</style>
