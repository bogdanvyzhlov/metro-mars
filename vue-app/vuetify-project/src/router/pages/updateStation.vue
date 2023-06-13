<template>
  <v-container fluid class="edit-station-container">
    <v-row justify="center" align="center" class="edit-station-row">
      <v-col cols="12" sm="8" md="6">
        <div class="text-h5 mb-8 text-center">Update: {{stationName}} </div>
        <v-form @submit.prevent="updateStation" class="edit-station-form">

          <v-text-field v-model="state.aboutWork" label="About work"  outlined></v-text-field>
          <v-select v-model="state.status" :items="statuses" label="Status" outlined></v-select>
          <div class="text-center">
            <v-btn type="submit" color="primary" class="edit-station-button">Change Information</v-btn>
          </div>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useStationStore } from '@/stores/station';
import { ref, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const stationStore = useStationStore();
const router = useRouter();
const route = useRoute();

const state = reactive({
  status: '',
  aboutWork: '',


});

const statuses = ['ON', 'OFF'];

const updateStation = async () => {
  await stationStore.updateStation( state.status, state.aboutWork, route.params.stationId);
  await router.push({ name: 'my-stations' });
};
const stationName = ref('');

onMounted(async () => {
  try {
    const station = await stationStore.getStation(route.params.stationId);
    stationName.value=station.name
    state.status = station.status;
    state.aboutWork = station.aboutWork;
  } catch (error) {
    console.error('Failed to fetch station:', error);
  }
});
</script>


<style scoped>
.edit-station-container {
  display: flex;
  align-items: center;
  width: 700px;
  margin-top: 10%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.edit-station-row {
  justify-content: center;
}

.edit-station-form {
  max-width: 500px;
  margin: 0 auto;
}

.edit-station-button {
  margin-top: 20px;
}
</style>
