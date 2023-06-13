import TrainModel from '../models/Train.js';


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










