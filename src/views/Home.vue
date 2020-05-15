<template>
  <div class="home">
    <h1>Welcome to Signation</h1>
    <Login></Login>
<!--    <Register></Register>-->
  </div>
</template>

<script>
import Login from "../components/Login";
// import Register from "../components/Register";

export default {
  name: 'Home',
  components: {Login},
}
</script>