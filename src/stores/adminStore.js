import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  
  state: () => ({
    selectedUser: JSON.parse(localStorage.getItem('selected_user')) || null,
  }),

  actions: {
    setSelectedUser(user) {
      this.selectedUser = user;
      localStorage.setItem('selected_user', JSON.stringify(user));
    },
    
    clearSelectedUser() {
      this.selectedUser = null;
      localStorage.removeItem('selected_user');
    }
  }
});