<template>
    <div>
        <p>{{products}}</p>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "storageComponent",
        data() {
            return {}
        },
        mounted() {
            this.retrieveProductsCollection();
        },
        computed: {
            ...mapGetters([
                'products'
            ]),
        },
        methods: {
            ...mapActions([
                'retrieveProductsCollection',
            ]),
            logSmthg() {
            },
        }
    }
</script>

<style scoped>
    .md-table-row {
        text-align: center;
        justify-content: center;
        width: 10%;
    }
</style>
