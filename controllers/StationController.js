import StationModel from "../models/Station.js"






export const getAll= async (req,res)=>{
    try {

        const stations = await StationModel.find();
        res.json(stations);


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get all tickets',
        });
    }

};


export const createStation=async (req,res)=>{

        try {

            const doc= new StationModel({
                name: req.body.name,
                status: req.body.status,
                aboutWork: req.body.status,
                coordinates: req.body.coordinates,
                neighbors:req.body.neighbors
            });
            const station = await doc.save();


            res.json(station);

        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Failed to create station',
            });
        }


};


export const getStationById= async (req, res)=>{
    try {

        const station= await StationModel.findById(req.params.id);
        if(!station){
            return res.status(404).json({
                message: 'Station is undefined'
            });
        }
        const {passwordHash, ...stationData} = station._doc;
        res.json(stationData);



    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'No access'
        });
    }


};


export const updateStation = async (req,res)=>{

    try {

        const Stationid  = await req.params.id;
        const {status, aboutWork}  = await req.body;

        const station = await StationModel.findByIdAndUpdate(Stationid, { status, aboutWork }, { new: true });

        if (!station) {
            return res.status(404).json({ message: 'Station not found' });
        }

        res.json({ message: 'Station status update successfully', station });
    } catch (error) {
        console.error('Error updating station:', error);
        res.status(500).json({ message: 'Failed to update station' });
    }
};

export const createStations = async () => {
    try {
        const existingStaions = await StationModel.find();
        if(existingStaions.length===0) {
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
            ];

            const stations = await StationModel.insertMany(stationData);


            for (let i = 0; i < stations.length; i++) {
                const station = stations[i];
                const neighbors = stationData[i].neighbors;

                station.neighbors = neighbors;

                await station.save();
            }

            console.log('Stations are created!');

            }else{
            console.log('Stations already exist in database')
        }



    } catch (error) {
        console.error('Error when creating stations', error);
    }
};


