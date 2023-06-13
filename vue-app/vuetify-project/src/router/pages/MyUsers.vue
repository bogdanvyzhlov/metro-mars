<template>

  <div class="my-users-container">
    <h2>My Users</h2>

    <table class="users-table">
      <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody class="text-center">
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.fullName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button class="edit-button " @click="updateUser(user._id)">Edit</button>
          <button class="delete-button" @click="deleteUser(user._id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import { useAuthStore } from '@/stores/auth';

import {User} from "@/model/User";
import router from "@/router";




export default defineComponent({
  name: 'MyUsers',
  setup() {
    const authStore = useAuthStore();
    const users = ref<User[]>(authStore.users);

    const fetchUsers = async ()=> {
      try {
        await authStore.fetchUsers();
        users.value =authStore.users;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };



    const deleteUser = async (userId: string)  => {
      try {
        await authStore.deleteUser(userId);

      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    };


    const updateUser = (userId: string): void => {
      router.push({name:'user-update', params:{ userId }});
      console.log('Update user:', userId);

    };

    fetchUsers();

    return {
      users,
      updateUser,
      deleteUser,
    };
  },
});
</script>





<style scoped>
.my-users-container {
  margin-top: 10%;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

h2 {
  text-align: center;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}



.text-center {
  text-align: center;
}

.edit-button,
.delete-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: auto;
}

.edit-button {
  background-color: #2196F3;
  color: white;
}

.delete-button {
  background-color: #FF5252;
  color: white;
}

.edit-button:hover,
.delete-button:hover {
  opacity: 0.8;
}


</style>
