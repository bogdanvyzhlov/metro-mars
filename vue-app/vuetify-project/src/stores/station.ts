import { defineStore } from 'pinia';
import {onMounted, ref} from 'vue';
import { Station } from '@/model/Station';
import { axiosInstance } from '@/code/api';

export const useStationStore = defineStore('station', () => {
  const stations = ref<Station[]>([]);

  async function fetchStations() {
    try {
      const response = await axiosInstance.get('/auth/stations');
      stations.value = response.data;
    } catch (error) {
      console.error('Failed to fetch stations:', error);
    }
  }

  async function addStation(station: Station) {
    try {
      const response = await axiosInstance.post('/stations', station);
      const createdStation = response.data;
      stations.value.push(createdStation);
    } catch (error) {
      console.error('Failed to add station:', error);
    }
  }
  async function updateStation(status:string, aboutWork:string, stationId:string|string[]) {
    try {
      const response = await axiosInstance.post(`/auth/stations/${stationId}`, {
          status,
          aboutWork
      },{params:{
          stationId
        },
      });
     return response.data;

    } catch (error) {
      console.error('Failed to update Station:', error);
    }
  };

  async function getStation(stationId:string|string[]){
    try {
      const responce =await axiosInstance.get(`/auth/stations/${stationId}`,{
        params:{
          stationId
        }
      });
      return responce.data;

    } catch (error) {
      console.error("Failed to get station:", error);
    }
  };

  async function calculateShortestPath(fromStationName: string, toStationName: string): Promise<Station[] | null> {
    const fromStation = stations.value.find(station => station.name === fromStationName);
    const toStation = stations.value.find(station => station.name === toStationName);

    if (!fromStation || !toStation) {
      return null;
    }

    const visited = new Set<string>();
    const distances = new Map<string, number>();
    const previous = new Map<string, string>();

    stations.value.forEach(station => {
      distances.set(station.name, Infinity);
    });
    distances.set(fromStation.name, 0);

    while (visited.size < stations.value.length) {
      let currentStation: Station | undefined;
      let shortestDistance = Infinity;

      stations.value.forEach(station => {
        if (!visited.has(station.name) && distances.get(station.name)! < shortestDistance) {
          currentStation = station;
          shortestDistance = distances.get(station.name)!;
        }
      });

      if (!currentStation) {
        break;
      }

      visited.add(currentStation.name);

      currentStation.neighbors.forEach(neighborName => {
        const neighborStation = stations.value.find(station => station.name === neighborName);
        if (!visited.has(neighborName) && neighborStation) {
          const distanceToNeighbor = shortestDistance + 1;
          const neighborStatus = neighborStation.status;

          if (neighborStatus === 'ON') {
            if (distanceToNeighbor < distances.get(neighborName)!) {
              distances.set(neighborName, distanceToNeighbor);
              previous.set(neighborName, currentStation!.name);
            }
          }
        }
      });
    }

    const path: Station[] = [];
    let currentName = toStation.name;

    while (previous.has(currentName)) {
      const currentStation = stations.value.find(station => station.name === currentName);
      if (currentStation) {
        path.unshift(currentStation);
        currentName = previous.get(currentName)!;
      }
    }

    return path;
  }

  onMounted(fetchStations);

  return { stations, fetchStations, updateStation, getStation, calculateShortestPath };
});
