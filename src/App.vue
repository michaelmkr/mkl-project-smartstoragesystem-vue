<template>

    <div class="page-container">
        <md-app>
            <md-app-toolbar>
                <div id="header-logo"><img src="./assets/logo.svg"></div>
                <span class="example-fill-remaining-space"></span>
                <md-button @click="toggleMenu" class="md-icon-button" v-if="!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" :md-right="true" md-persistent="full">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span>Navigation</span>

                    <div class="md-toolbar-section-end">
                        <md-button @click="toggleMenu" class="md-icon-button md-dense">
                            <md-icon>close</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>

                <md-list>
                    <md-list-item>
                        <md-icon>home</md-icon>
                        <router-link class="md-list-item-text" to="/">Home</router-link>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>kitchen</md-icon>
                        <router-link class="md-list-item-text" to="/store">Einlagern</router-link>
                    </md-list-item>

                    <md-list-item>
                        <md-icon>inbox</md-icon>
                        <router-link class="md-list-item-text" to="/storage">Lagerbestand</router-link>
                    </md-list-item>
                </md-list>
            </md-app-drawer>

            <md-app-content>
                <!--main #app-->
                <div id="app">
                    <main class="mdl-layout__content">
                        <router-view class="main-content"/>
                    </main>
                </div>
            </md-app-content>
        </md-app>
    </div>

</template>

<script>
    export default {
        name: 'app',
        components: {},
        data: () => ({
            menuVisible: false
        }),
        methods: {
            toggleMenu() {
                this.menuVisible = !this.menuVisible
            }
        },
    }
</script>

<style scoped>
    .md-app {
        min-height: 100vh;
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .example-fill-remaining-space {
        flex: 1 1 auto;
    }
</style>
