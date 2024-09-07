<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div>
          <label for="name">Name:</label>
          <input v-model="form.name" type="text" id="name" required>
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="form.email" type="email" id="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="form.password" type="password" id="password" required>
        </div>
        <div>
          <label for="password_confirmation">Confirm Password:</label>
          <input v-model="form.password_confirmation" type="password" id="password_confirmation" required>
        </div>
        <button type="submit">Register</button>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            form: {
                name:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            errorMessage:'',
            successMessage:''
        };
    },

    methods: {
        async handleRegister(){
            try{

                // Make a POST request to the registration endpoint
                const response = await axios.post('/register', this.form);

                // Handle Success
                this.successMessage = 'Registration successful!';
                this.errorMessage = '';

                // Optionally redirect the user or reset the form
                this.$router.push('/login'); // Redirect to the login page
            } catch(error){

                // Handle error
                if(error.response && error.response.data.errors){
                    this.errorMessage = Object.values(error.response.data.errors).flat().join(' ');
                } else {
                    this.errorMessage = 'An error occured. Please try again.';
                }
                this.successMessage = '';
            }
        }
    }
};
</script>