<template>
  <div class="metro-map">
    <v-card>
      <v-card-title class="text-h5">Metro Map</v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col cols="4" v-for="(station, index) in stations" :key="index">
              <v-chip outlined class="station-chip" :color="station.color">{{ station.name }}</v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MetroMap',
  data() {
    return {
      stations: [
        { name: 'Station A', color: 'red' },
        { name: 'Station B', color: 'blue' },
        { name: 'Station C', color: 'green' },
        { name: 'Station D', color: 'orange' },
      ],
    };
  },
};
</script>

<style scoped>
.metro-map {
  max-width: 600px;
  margin: 0 auto;
}

.station-chip {
  margin-bottom: 8px;
}
</style>

