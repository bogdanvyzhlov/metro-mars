<template>
  <div class="homepage">
    <div class="form-container">
      <v-form v-model="valid">
        <v-container>
          <v-row class="mb-4">
            <v-col cols="12" md="4">
              <v-select
                v-model="fromStation"
                :items="stations.map(station => station.name)"
                label="From Station"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-select
                v-model="toStation"
                :items="stations.map(station => station.name)"
                label="To Station"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-btn @click="calculateShortestPath" color="primary" class="white--text narrow-button">
                Find Path
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <div v-if="path" class="path-container text-center">
        <h3 class="path-title text-center">Shortest Path:</h3>
        <ul class="path-list text-center">
          <li class="path-item text-center"> {{ fromStation }}</li>
          <li v-for="station in path" :key="station.name" class="path-item">{{ station.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useStationStore } from '@/stores/station';
import { Station } from "@/model/Station";

const stationStore = useStationStore();

const fromStation = ref('');
const toStation = ref('');
const path = ref<Station[] | null>(null);
const valid = ref(false);

const stations = ref<Station[]>(stationStore.stations);

async function calculateShortestPath() {
  const result = await stationStore.calculateShortestPath(fromStation.value, toStation.value);
  path.value = result ? result.slice() : null;
}

onMounted(() => {
  stationStore.fetchStations().then(() => {
    stations.value = stationStore.stations;
  });
});
</script>


<style scoped>
.homepage {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
.path-item{
  list-style-type: none;
}
.v-select {
  width: 100%;
}

.narrow-button {
  width: 100%;
  padding-top: 22px;
  padding-bottom: 30px;
}
</style>










