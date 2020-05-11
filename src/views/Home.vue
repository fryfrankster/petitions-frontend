<template>
  <div class="home">
    <h1>Welcome to Signation</h1>
    <Login></Login>
  </div>
</template>

<script>
import Login from "../components/Login";

export default {
  name: 'Home',
  components: {Login},
}
</script>