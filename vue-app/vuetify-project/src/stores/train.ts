import { defineStore } from 'pinia';
import {onMounted, ref} from 'vue';
import { Train } from '@/model/Train';
import { axiosInstance } from '@/code/api';

export const useTrainStore = defineStore('train', () => {
  const trains = ref<Train[]>([]);

  async function fetchTrains() {
    try {
      const response = await axiosInstance.get('/trains');
      trains.value = response.data;
    } catch (error) {
      console.error('Failed to fetch stations:', error);
    }
  }
  onMounted(fetchTrains);

  return { trains, fetchTrains };
});
