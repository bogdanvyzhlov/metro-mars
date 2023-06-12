<template>
  <div class="my-stations-container">
    <h2 class="text-center">My Stations</h2>

    <table class="my-stations-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>About Work</th>
        <th>Coordinates</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody class="text-center">
      <tr v-for="station in stations" :key="station._id">
        <td>{{ station.name }}</td>
        <td>{{ station.status }}</td>
        <td>{{ station.aboutWork }}</td>
        <td>{{ station.coordinates.x }}, {{ station.coordinates.y }}</td>
        <td>
          <button @click="updateStation(station._id)"> Repair </button>

        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStationStore } from '@/stores/station';
import { Station } from '@/model/Station';
import router from '@/router';

export default defineComponent({
  name: 'MyStations',
  setup() {
    const stationStore = useStationStore();
    const stations = ref<Station[]>(stationStore.stations);

    const fetchStations = async () => {
      try {
        await stationStore.fetchStations();
        stations.value = stationStore.stations;
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      }
    };



    const updateStation = (stationId: string): void => {
      router.push({ name: 'station-update', params: { stationId } });
      console.log('Update station:', stationId);
    };


    fetchStations();

    return {
      stations,
      updateStation,

    };
  },
});
</script>

<style scoped>
.my-stations-table{
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
th,
td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.my-stations-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.text-center {
  text-align: center;
}
button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: auto;
  background-color: #2196F3;
  color: white;
}
</style>
