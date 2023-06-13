<template>
  <div class="statistics-сonteiner">
    <h2 class="text-center" >Statistics</h2>
    <table class="statistics-table">
      <thead>
      <tr>
        <th class="text-center">Statistic</th>
        <th class="text-center">Count</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="text-center">Active Stations</td>
        <td class="text-center">{{ activeStationsCount }}</td>
      </tr>
      <tr>
        <td class="text-center">Inactive Stations</td>
        <td class="text-center">{{ inactiveStationsCount }}</td>
      </tr>
      <tr>
        <td class="text-center">Registered Users</td>
        <td class="text-center">{{ registeredUsersCount }}</td>
      </tr>
      </tbody>
    </table>
    <h3 class="text-center">Inactive Stations</h3>
    <ul class="text-center">
      <li class="user-item" v-for="station in inactiveStationsStore" :key="station.id">
        {{ station.name }} : {{station.aboutWork}}
      </li>
    </ul>
  </div>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import { useStationStore } from '@/stores/station';
import { useAuthStore } from '@/stores/auth';



const stationStore = useStationStore();
const authStore = useAuthStore();






const activeStationsCount = computed(() => {
  const activeStations = stationStore.stations.filter((station) => station.status==='ON');
  return activeStations.length;
});

const inactiveStationsCount = computed(() => {
  const inactiveStations = stationStore.stations.filter((station) => station.status==='OFF');
  return inactiveStations.length;
});

const registeredUsersCount = computed(() => {
  return authStore.users.length;
});
const inactiveStations = computed(() => {
  return stationStore.stations.filter((station) => station.status === 'OFF');
});
const inactiveStationsStore = inactiveStations;

</script>

<style scoped>
.statistics-сonteiner {

  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

h2 {
  text-align: center;
}

.statistics-table {
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

.user-item{
  list-style-type: none
}



</style>

