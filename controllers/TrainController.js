import TrainModel from '../models/Train.js';
import StationModel from "../models/Station.js";

export const getAllTrains = async (req, res) => {
    try {
        const trains = await TrainModel.find();
        res.json(trains);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all trains' });
    }
};

export const createTrains = async () => {
    try {
        const existingTrains = await TrainModel.find();
        if(existingTrains.length===0) {
            const trainsData = [
                {
                    name: 'Train 1',
                    schedule: [{ station: 'Station of Education', arrivalTime: '7:00' },
                        { station: 'Station of Rapture', arrivalTime: '8:00' },
                        { station: 'Station of Hope', arrivalTime: '9:00' },
                        { station: 'Station of Honour', arrivalTime: '10:00' },
                        { station: 'Station of Happy', arrivalTime: '11:00' }
                    ]
                },
                {
                    name: 'Train 2',
                    schedule: [{ station: 'Station of Happy', arrivalTime: '7:00' },
                        { station: 'Station of Honour', arrivalTime: '8:00' },
                        { station: 'Station of Hope', arrivalTime: '9:00' },
                        { station: 'Station of Rapture', arrivalTime: '10:00' },
                        { station: 'Station of Education', arrivalTime: '11:00' }]
                },
                {
                    name: 'Train 3',
                    schedule: [{ station: 'Station of Memory', arrivalTime: '7:00' },
                        { station: 'Station of Bravery', arrivalTime: '8:00' },
                        { station: 'Station of Rapture', arrivalTime: '9:00' },
                        { station: 'Station of Hope', arrivalTime: '10:00' },
                        { station: 'Station of Knowledge', arrivalTime: '11:00' },]
                },
                {
                    name: 'Train 4',
                    schedule: [{ station: 'Station of Knowledge', arrivalTime: '7:00' },
                        { station: 'Station of Hope', arrivalTime: '8:00' },
                        { station: 'Station of Rapture', arrivalTime: '9:00' },
                        { station: 'Station of Bravery', arrivalTime: '10:00' },
                        { station: 'Station of Memory', arrivalTime: '11:00' },]
                },
                {
                    name: 'Train 5',
                    schedule: [{ station: 'Station of Exploring', arrivalTime: '7:00' },
                        { station: 'Station of Wisdom', arrivalTime: '8:00' },
                        { station: 'Station of Hope', arrivalTime: '9:00' },
                        { station: 'Station of Rapture', arrivalTime: '10:00' },
                        { station: 'Station of Education', arrivalTime: '11:00' },]
                },{
                name: 'Train 6',
                schedule: [{ station: 'Station of Education', arrivalTime: '7:00' },
                { station: 'Station of Rapture', arrivalTime: '8:00' },
                { station: 'Station of Hope', arrivalTime: '9:00' },
                { station: 'Station of Wisdom', arrivalTime: '10:00' },
                { station: 'Station of Exploring', arrivalTime: '11:00' },]
                 },
            ];

            await TrainModel.insertMany(trainsData);

            console.log('Trains are created!');

        }else{
            console.log('Trains already exist in database')
        }



    } catch (error) {
        console.error('Error when creating stations', error);
    }
};








export const generateTrains = async () => {
    try {
        // Проверка наличия уже созданных поездов
        const existingTrains = await TrainModel.find();
        if (existingTrains.length > 0) {
            console.log('Поезды уже созданы');
            return;
        }

        const stationData = [
            {
                name: 'Station of Rapture',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 10, y: 20},
                neighbors: ['Station of Hope', 'Station of Knowledge', 'Station of Bravery'],
            },
            {
                name: 'Station of Hope',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 30, y: 40},
                neighbors: ['Station of Rapture', 'Station of Knowledge', 'Station of Honour'],
            },
            {
                name: 'Station of Knowledge',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 50, y: 60},
                neighbors: ['Station of Rapture', 'Station of Hope', 'Station of Bravery', 'Station of Wisdom'],
            },
            {
                name: 'Station of Bravery',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 70, y: 80},
                neighbors: ['Station of Rapture', 'Station of Knowledge', 'Station of Honour', 'Station of Memory'],
            },
            {
                name: 'Station of Honour',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 90, y: 100},
                neighbors: ['Station of Hope', 'Station of Bravery', 'Station of Wisdom', 'Station of Happy'],
            },
            {
                name: 'Station of Wisdom',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 110, y: 120},
                neighbors: ['Station of Knowledge', 'Station of Honour', 'Station of Memory', 'Station of Exploring'],
            },
            {
                name: 'Station of Memory',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 130, y: 140},
                neighbors: ['Station of Bravery', 'Station of Wisdom', 'Station of Happy', 'Station of Education'],
            },
            {
                name: 'Station of Happy',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 150, y: 160},
                neighbors: ['Station of Honour', 'Station of Memory', 'Station of Exploring'],
            },
            {
                name: 'Station of Exploring',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 170, y: 180},
                neighbors: ['Station of Wisdom', 'Station of Happy', 'Station of Education'],
            },
            {
                name: 'Station of Education',
                status: 'ON',
                aboutWork: 'Is working',
                coordinates: {x: 190, y: 200},
                neighbors: ['Station of Memory', 'Station of Exploring'],
            },
            // ... остальные данные о станциях ...
        ];

        const trains = [];

        for (let i = 0; i < 5; i++) { // Генерация 5 поездов
            const station = stationData[i];

            // Создание поезда
            const train = {
                name: `Train ${i + 1}`,
                schedule: [],
            };

            // Генерация расписания для каждой станции
            let currentTime = 7; // Начальное время прибытия - 12:00

            for (let j = 0; j < station.neighbors.length; j++) {
                const neighborStation = station.neighbors[j];
                const arrivalTime = `${currentTime.toString().padStart(2, '0')}:00`; // Форматирование времени

                // Добавление информации о станции и времени прибытия в расписание поезда
                train.schedule.push({
                    station: neighborStation,
                    arrivalTime: arrivalTime,
                });

                currentTime++; // Увеличение текущего времени на 1 час
            }

            // Добавление поезда в список поездов
            trains.push(train);
        }

        // Сохранение созданных поездов в базу данных
        await TrainModel.insertMany(trains);

        console.log('Поезды успешно созданы');
    } catch (error) {
        console.error('Ошибка при создании поездов:', error);
    }
};
