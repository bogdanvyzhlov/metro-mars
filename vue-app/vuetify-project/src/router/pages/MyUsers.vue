<template>
  <div class="my-users-container">
    <h2>My Users</h2>

    <table>
      <thead>
      <tr>
        <th>Full Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Action</th>

      </tr>
      </thead>
      <tbody class="text-center" >
      <tr v-for="user in users" :key="user._id">
        <td>{{ user.fullName }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button @click="updateUser(user._id)">Edit</button>
          <button @click="deleteUser(user._id)">Delete</button>
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
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.my-users-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}
button {
  margin-right: 4px;
}
</style>
