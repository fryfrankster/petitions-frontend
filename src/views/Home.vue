<template>
    <div class="home">
        <h1>Welcome to Signation</h1>
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
        methods: {
            swapComponent() {

            }
        }

    }
</script>