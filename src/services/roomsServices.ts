import roomsJson from '../data/roomsData.json';
import { RoomInterface } from '../interfaces/interfaces';

export class Room {
    static getRoomList():RoomInterface[]{
        return roomsJson;
    }

    static getRoom(id:number):RoomInterface{
        const room: RoomInterface | undefined = roomsJson.find(room => room.id === id);
        if (!room) 
            throw new Error('Cannot find room');
        return room;
    }

    static createRoom(room:RoomInterface):RoomInterface{
        //Add room and return it
        return room;
    }

    static updateRoom(room:RoomInterface):RoomInterface{
        //Update room and return it
        return room;
    }

    static deleteRoom(id:number){
        //DeleteRoom
        console.log(id)
    }
}
