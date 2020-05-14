<template>
    <div class="navbar">
        <v-app-bar
                color="#ff9100"
                dense
                dark
                flat
                app
                height="60"
        >
            <v-toolbar-title>Signation</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn to="/petitions">
                Browse Petitions
            </v-btn>

            <v-btn icon app class="app-bar-icon" @click.stop="drawer = !drawer">
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app dark right class="deep-purple accent-4">
            <v-list>
                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        data: () => ({
            drawer: false,
            group: null,
            items: {
            }
        }),

        watch: {
            group () {
                this.drawer = false
            },
        },
    }
</script>

<style scoped>

</style>