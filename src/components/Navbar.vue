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
            <v-btn class="mr-2" to="/">
                Home
            </v-btn>

            <v-btn class="mr-2" to="/petitions">
                Browse Petitions
            </v-btn>

            <v-btn class="mr-2" to="/login">
                Login
            </v-btn>

            <v-btn class="mr-2" v-on:click="logoutUser">
                Logout
            </v-btn>

            <v-btn class="mr-2" to="/register">
                Sign Up
            </v-btn>

            <v-btn class="mr-2" v-bind:to="'/profile/' + this.$store.state.userId">
                Profile
            </v-btn>

        </v-app-bar>
    </div>
</template>

<script>
    import {apiUser} from "../api";
    import {mapActions} from "vuex";

    export default {
        data: () => ({
        }),
        methods: {
            ...mapActions(["logout"]),

            logoutUser() {
                apiUser.logout()
                    .then((response) => {
                        localStorage.removeItem('authToken');
                        this.logout(response.data);
                        this.$router.push('/');
                    }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>