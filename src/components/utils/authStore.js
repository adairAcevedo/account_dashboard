import {reactive} from 'vue'
export const authStore = reactive({
    token: localStorage.getItem('user_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    setToken(newToken){
        this.token = newToken;
        localStorage.setItem('user_token', newToken);
    },
    logout(){
        this.token = null;
        this.user = null;
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
    },
    setUser(newUser){
        this.user = newUser
        localStorage.setItem('user', JSON.stringify(newUser))
    }
})

