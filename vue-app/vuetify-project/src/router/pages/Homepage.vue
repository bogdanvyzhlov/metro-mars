<template>
  <div class="intro">
    <h1 style="font-family: 'Hind Madurai', sans-serif; color:floralwhite" >The system of fast transportation is now on Mars!</h1>
    <p style="font-family: 'Hind Madurai', sans-serif; color: floralwhite">
      Welcome to our Mars Metro app where you can plot the shortest route to your destination.
    </p>

  </div>
  <div class="homepage">
    <div class="form-container">
      <v-form v-model="valid">
        <h3 class="text-center">Select Stations and click a button</h3>
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
  height: 50vh;
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


.narrow-button {
  width: 100%;
  padding-top: 22px;
  padding-bottom: 30px;
}


.intro {
  text-align: center;
  margin-bottom: 0px;
}

.intro h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.intro p {
  font-size: 24px;
  margin-bottom: 0px;
}
</style>










