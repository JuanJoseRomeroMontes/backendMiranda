import { MongoRoomInterface, RoomInterface } from '../interfaces/interfaces';
import { roomModel } from '../schemas/roomSchema';
import { APIError } from '../utils/utils';

export class Room {
    static async getRoomList(){
        const allRooms = await roomModel.find();
        return allRooms;
    }

    static async getRoom(id:string){
        const room = await roomModel.findById(id);
        if (!room) 
            throw new APIError('Cannot find room', 404, true);
        return room;
    }

    static async createRoom(room:RoomInterface){
        try {
            const newRoom = new roomModel({ ...room });
            const insertedRoom = await newRoom.save();
            return insertedRoom as MongoRoomInterface;
        } catch (error) {
            throw new APIError('Unexpected error while creating new rooms', 500, true);
        }
    }

    static async updateRoom(room:RoomInterface){
        try {
            const updatedRoom = await roomModel.findByIdAndUpdate(room._id, room, { new: true });
            return updatedRoom;
        } catch (error) {
            throw new APIError('Unexpected error while updating rooms, make sure that the rooms exist in the Database', 500, true);
        }
    }

    static async deleteRoom(id:string){
        const deletedRoom = await roomModel.findByIdAndDelete(id);
        if(!this.deleteRoom)
            throw new APIError('Cannot delete room because it does not exist', 404);
        return deletedRoom;
    }
}
