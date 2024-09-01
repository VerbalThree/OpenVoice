<template>
<h1><b>Login</b></h1>
<div class="login-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Email" required>
      </div><br>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" placeholder="Password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
</div>
</template>