import { RoomInterface } from '../interfaces/interfaces';
import { roomModel } from '../schemas/roomSchema';

export class Room {
    static async getRoomList(){
        const allRooms = await roomModel.find();
        return allRooms;
    }

    static async getRoom(id:string){
        const room = roomModel.findById(id);
        if (!room) 
            throw new Error('Cannot find room');
        return room;
    }

    static async createRoom(room:RoomInterface){
        const newRoom = new roomModel({ ...room });
        const insertedRoom = await newRoom.save();
        return insertedRoom;
    }

    static async updateRoom(room:RoomInterface){
        const id = room._id;
        await roomModel.updateOne({ id }, room);
        const updatedRoom = await roomModel.findById(id);
        return updatedRoom;
    }

    static async deleteRoom(id:string){
        const deletedRoom = await roomModel.findByIdAndDelete(id);
        if(!this.deleteRoom)
            throw new Error(`Cannot delete room because it doesn't exist`);
        return deletedRoom;
    }
}
