import { pool } from '../app';
import { RoomInterface } from '../interfaces/interfaces';
import { RoomQueries } from '../utils/queries';
import { APIError } from '../utils/utils';

export class Room {
    static async getRoomList(){
        const [allRooms] = await pool.query(
            RoomQueries.getRooms
        );

        //process data
        console.log("Get all rooms: "+allRooms)

        return allRooms;
    }

    static async getRoom(id:string){
        const [room] = await pool.query(
            RoomQueries.getSingleRoom, [id]
        );

        //process data
        console.log("Get room: "+room)

        if (!room) 
            throw new APIError('Cannot find room', 404, true);
        return room;
    }

    static async createRoom(room:RoomInterface){
        try {
            const [insertedRoom1] = await pool.query(
                RoomQueries.createRoom, [room.roomNumber, room.availability, room.roomType, room.description, room.offer, 
                    room.price, room.discount, room.cancellation]
            );

            console.log("Deleted room: "+insertedRoom1)

            /*const [insertedRoom] = await pool.query(
                RoomQueries.getSingleRoom, [room._id]
            );

            //process data
            console.log(room)*/

            return insertedRoom1; //as MongoRoomInterface;
        } catch (error) {
            throw new APIError('Unexpected error while creating new rooms', 500, true);
        }
    }

    static async updateRoom(room:RoomInterface){
        try {
            const [updatedRoom] = await pool.query(
                RoomQueries.updateRoom, [room.roomNumber, room.availability, room.roomType, room.description, room.offer, 
                    room.price, room.discount, room.cancellation]
            );

            console.log("Updated room: "+updatedRoom)

            return updatedRoom;
        } catch (error) {
            throw new APIError('Unexpected error while updating rooms, make sure that the rooms exist in the Database', 500, true);
        }
    }

    static async deleteRoom(id:string){
        const [deletedRoom] = await pool.query(
            RoomQueries.getSingleRoom, [id]
        );

        console.log("Inserted room: "+deletedRoom)

        await pool.query(
            RoomQueries.deleteRoom, [id]
        );

        //process data
        
        if(!this.deleteRoom)
            throw new APIError('Cannot delete room because it does not exist', 404);
        return deletedRoom;
    }
}