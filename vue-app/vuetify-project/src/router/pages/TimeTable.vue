<template>
  <div class="schedule-container">
    <label for="station-select" class="schedule-label text-center">Choice a station:</label>
    <select id="station-select" v-model="selectedStation" class="schedule-select">
      <option v-for="station in selectStations" :key="station._id" :value="station._id">{{ station.name }}</option>
    </select>

    <div class="text-center">
      <v-btn color="primary" @click="showSchedule" class="schedule-button">Display schedule</v-btn>
    </div>

    <div v-if="showTrains" class="schedule-list">
      <h2 class="schedule-heading text-center">{{ selectedStationName }}</h2>
      <ul>
        <li v-for="train in selectedTrains" :key="train._id" class="train-item text-center">
          <strong class="train-name text-center">{{ train.name }}</strong>
          <ul>
            <li v-for="scheduleItem in train.schedule" :key="scheduleItem.station" class="schedule-item text-center">
              <template v-if="scheduleItem.station === selectedStationName" class="text-center">
                <div class="schedule-info text-center">
                  <div class="schedule-value">{{ scheduleItem.arrivalTime }}</div>
                </div>
              </template>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStationStore } from '@/stores/station';
import { useTrainStore } from '@/stores/train';
import { Station } from '@/model/Station';
import { Train } from '@/model/Train';

const stationStore = useStationStore();
const trainStore = useTrainStore();

const selectStations = computed<Station[]>(() => stationStore.stations);
const selectedStation = ref<string>('');
const selectedStationName = computed<string>(() => {
  const station = stationStore.stations.find((s: Station) => s._id === selectedStation.value);
  return station ? station.name : '';
});

const selectedTrains = computed<Train[]>(() => {
  if (!selectedStation.value) {
    return [];
  }
  const stationName = selectedStationName.value;
  return trainStore.trains.filter((train: Train) =>
    train.schedule.some((scheduleItem) => scheduleItem.station === stationName)
  );
});

const showTrains = ref(false);

function showSchedule() {
  trainStore.fetchTrains();
  showTrains.value = true;
}
</script>

<style>
.schedule-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin-top: 10%;
}

.schedule-label {
  display: block;
  margin-bottom: 10px;
}

.schedule-select {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.schedule-button {
  width: 100%;
  margin-top: 10px;
}

.schedule-list {
  margin-top: 20px;
}

.schedule-heading {
  margin-bottom: 10px;
}

.train-item {
  margin-bottom: 20px;
  list-style-type: none;
}

.train-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.schedule-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  list-style-type: none;
}

.schedule-label {
  font-weight: bold;
  margin-right: 10px;
}

.schedule-value {
  flex-grow: 1;
  text-align: center;
}
</style>

