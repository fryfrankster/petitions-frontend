<template>
    <div class="home pa-8">
        <v-row>
            <div v-if="this.$store.state.isLoggedIn">
                <h1>Welcome to back to Signation</h1>
            </div>
            <div v-else>
                <h1>Welcome to Signation</h1>
            </div>
        </v-row>

        <!--        <div class="loginContainer">-->
        <!--            <Login></Login>-->
        <!--            <p>Don't have an account? Sign up</p>-->
        <!--        </div>-->

        <!--        <div class="registerContainer">-->
        <!--            <Register></Register>-->
        <!--            <p>Already have an account? Login</p>-->
        <!--        </div>-->

    </div>
</template>

<script>
    // import Login from "../components/Login";
    // import Register from "../components/Register";

    export default {
        name: 'Home',
        // components: {Login, Register},
        data() {
            return {
                switchToLogin: false
            }
        },
        computed: {
            localstorageToken() {
                return localStorage.getItem('authToken')
            }
        },
        methods: {
            swapComponent() {

            }
        }

    }
</script>