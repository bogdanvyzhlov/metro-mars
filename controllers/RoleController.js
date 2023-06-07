import Role from '../models/Role.js'


export const createRoles = async () => {
    try {
        const existingRoles = await Role.find();


        if (existingRoles.length === 0) {

            const adminRole = new Role({ name: 'admin' });
            await adminRole.save();

            const passengerRole = new Role({ name: 'passenger' });
            await passengerRole.save();

            const technicianRole= new Role({name: 'technician'});
            await technicianRole.save();

            const workerRole = new Role({name: 'worker'});
            await workerRole.save();

            console.log('Roles successfully initialized');
        } else {
            console.log('Roles already exist in the database');
        }
    } catch (error) {
        console.error('Role initialization error: ', error);
    }
};

