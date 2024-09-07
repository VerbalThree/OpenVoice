import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './components/App.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Dashboard from './components/Dashboard.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ResetPassword from './components/ResetPassword.vue';
import axios from 'axios';

// Set up Axios to include CSRF token
const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
if (csrfTokenMeta) {
  const csrfToken = csrfTokenMeta.getAttribute('content');
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  console.log('CSRF Token set: ', csrfToken); // Log the token to ensure it's set
} else {
  console.error('CSRF token meta tag not found');
}

// Define routes
const routes = [
    {path: '/login', component: Login,},
    {path: '/register', component: Register,},
    {path: '/dashboard', component: Dashboard, meta: { requiresAuth: true} }, // Add meta field for route guard
    {path: '/forgot-password', component: ForgotPassword},
    {path: '/password/reset/:token', name: 'ResetPassword', component: ResetPassword, props: route => ({ token: route.params.token }) },
];

// Create router instance
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Route guard to check authentication status
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for authentication token in localStorage

  if(to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated){

    // Redirect to login if not authenticated
    next('/login');

  } else {

    // Proceed to route
    next();

  }
});

export default router;
const app = createApp(App);
app.use(router);
app.mount('#app');