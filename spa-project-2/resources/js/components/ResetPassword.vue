<template>
    <div>
        <h2>Redefinir a Senha</h2>
        <form @submit.prevent="resetPassword">
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Nova Senha" required />
            <input type="password" v-model="password_confirmation" placeholder="Confirmar Senha" required />
            <input type="hidden" v-model="token" />
            <button type="submit">Redefinir Senha</button>
        </form>
        <p v-if="status"> {{ status }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            password_confirmation: '',
            token: this.$route.query.token,
            status: ''
        }; // Return
    }, // Data
    methods: {
        async resetPassword() {
            try {
                await axios.post('/api/reset-password', {
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                    token: this.token,
                });
                this.status = "Senha redefinida com sucesso!";
            } catch (error) {
                this.status = 'Erro ao redefinir a senha.';
            }
        } // Async
    } // Methods
}; // Default
</script>