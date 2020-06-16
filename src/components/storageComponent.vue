<template>
    <div>
        <md-table>
            <md-table-row>
                <md-table-head>Frucht</md-table-head>
                <md-table-head>Gewicht</md-table-head>
                <md-table-head>Einlagerdatum</md-table-head>
                <md-table-head>Anmerkungen</md-table-head>
            </md-table-row>

            <md-table-row v-for="product in products" :key="product.id">
                <md-table-cell>{{product.fruitType}}</md-table-cell>
                <md-table-cell>{{product.amount}} kg</md-table-cell>
                <md-table-cell>{{product.storageDate}}</md-table-cell>
                <md-table-cell>{{product.comments}}</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "storageComponent",
        data() {
            return {
                currentSort: 'name',
                currentSortOrder: 'asc',
            }
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
            customSort (value) {
                return value.sort((a, b) => {
                    const sortBy = this.currentSort

                    if (this.currentSortOrder === 'desc') {
                        return a[sortBy].localeCompare(b[sortBy])
                    }

                    return b[sortBy].localeCompare(a[sortBy])
                })
            },
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
