<template>
<h1><b>Login</b></h1>
<div class="login-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Email" required>
      </div><br>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" placeholder="Password" required>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
</div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
if (csrfTokenMeta) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfTokenMeta.getAttribute('content');
} else {
  console.error('CSRF token meta tag not found');
}

export default {
  setup() {
    const router = useRouter();
    const form = ref({
      email: '',
      password: '',
    });

    const errorMessage = ref('');

    const handleSubmit = async () => {
      try {
        const response = await axios.post('/login', form.value);

        // Handle success - redirect to dashboard or intended route
        if (response.status === 200) {
          localStorage.setItem('authToken', response.data.token); // Adjust based on your response
          router.push('/dashboard'); // Redirect to the dashboard
        }

      } catch (error) {
        
        // Handle error
        if (error.response && error.response.data && error.response.data.errors) {

          // Display Laravel validation errors
          errorMessage.value = Object.values(error.response.data.errors).flat().join(", ");
        } else if (error.response && error.response.data && error.response.data.error) {

          // Display general error message
          errorMessage.value = error.response.data.error;
          
        } else {
          errorMessage.value = "An error occurred. Please try again.";
        }
      }
    };

    return {
      form,
      errorMessage,
      handleSubmit,
    };
  }
};
</script>