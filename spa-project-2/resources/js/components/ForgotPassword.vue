<template>
    <div>
     <h2>Forgot the Password</h2>
     <form @submit.prevent="submitEmail">
         <input type="email" v-model="email" placeholder="Email" required />
         <button type="submit">Send Email</button>
     </form>
     <p v-if="status">{{ status }}</p>
    </div>
 </template>
 
 <script>
 export default {
     data() {
         return {
             email: '',
             status: ''
         }; // Return 
     }, // Data
     methods: {
         async submitEmail() {
             try {
                 const response = await axios.post('/api/forgot-password', { email: this.email });
                 this.status = "Email Sent!";
             } catch (error) {
                 this.status = "Erro ao enviar o link";
             }
         } // Async
     } // Methods
 }; // Export
 </script>