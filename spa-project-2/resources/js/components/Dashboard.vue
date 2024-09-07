<template>
    <div class="dashboard">
        <h1>Welcome to the dashboard</h1>
        <p>This is the main page</p>
        <button @click="handleLogout">Logout</button>
        <button @click="handleDeleteAccount">Delete Account</button>

        <div class="password-change">
            <label for="current-password">Current Password</label>
            <input type="password" id="current-password" v-model="form.currentPassword" placeholder="Enter your current password" required>

            <label for="new-password">Enter your new password</label>
            <input type="password" id="new-password" v-model="form.newPassword" placeholder="Enter your new password" required>

            <label for="new-password-confirmation">Confirm your new password</label>
            <input type="password" id="new-password-confirmation" v-model="form.newPasswordConfirmation" placeholder="Confirm your new password" required>

            <button @click="handlePasswordChange">Change Password</button>
            <div v-if="passwordError" class="error">{{ passwordError }}</div>
        </div>

        <!-- Add more content as needed -->
    </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

export default{
    setup(){
        const router = useRouter();
        
        const form = ref({
            currentPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
        });

        const passwordError = ref('');

        const handleLogout = async () =>{
            try{
                await axios.post('/logout');
                localStorage.removeItem('authToken'); // Remove token from localStorage
                router.push('/login'); // Redirect to login page
            } catch(error){
                console.error('Logout failed: ', error);
            }
        };

        const handleDeleteAccount = async () =>{
            if(confirm('Are you sure you want to delete your account? This action cannot be undone.')){
                try{
                    const response = await axios.delete('/user');
                    if (response.status === 200){
                        localStorage.removeItem('authToken'); // Remove token from localStorage
                        router.push('/login'); // Redirect to login page
                    }
                } catch(error){
                    console.error('Failed to delete account: ', error);
                }
            }
        };

        const handlePasswordChange = async () =>{
            if(form.value.newPassword !== form.value.newPasswordConfirmation){
                passwordError.value = 'Passwords do not match.';
                return;
            }

            try{
                const response = await axios.post('/change-password', {
                    current_password: form.value.currentPassword,
                    new_password: form.value.newPassword,
                    new_password_confirmation: form.value.newPasswordConfirmation,
                }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });

                if(response.status === 200){
                    alert('Password changed successfully.');
                    form.value.currentPassword = '';
                    form.value.newPassword = '';
                    form.value.newPasswordConfirmation = '';
                    passwordError.value = '';
                }
            } catch(error){
                console.error('Failed to change password: ', error);

                if(error.response && error.response.data && error.response.data.errors){
                    passwordError.value = Object.values(error.response.data.errors).flat().join(' ');
                } else {
                passwordError.value = 'Failed to change password. Please try again.';
                }
            }
        };

        // Check if the user is authenticated on component mount
        onMounted(() =>{
            if(!localStorage.getItem('authToken')){
                router.push('/login'); // Redirect to login if not authenticated
            }
        });  
        return{
            handleLogout,
            handleDeleteAccount,
            handlePasswordChange,
            form,
            passwordError,
        };
    },
};
</script>

<style scoped>
.dashboard {
    padding: 20px;
}
</style>