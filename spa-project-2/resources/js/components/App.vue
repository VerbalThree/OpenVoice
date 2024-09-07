<template>
<div id="app">
    <h1>Hello, World! This is a test of a SPA. Cool, huh?</h1>
    <nav>
    <router-link to="/login">Login</router-link><br><br>
    <router-link to="/register">Register</router-link><br><br>
    <router-link to="/forgot-password">Forgot your password?</router-link>
    </nav>
    <router-view></router-view> <!--- The <router-view> component is essential in your App.vue. It acts as a placeholder where the matched component for the route will be rendered. Without this, your route components (like Login and Register) won’t be displayed. -->
</div>
</template>

<script>
export default {
    name: "App",
};
</script>