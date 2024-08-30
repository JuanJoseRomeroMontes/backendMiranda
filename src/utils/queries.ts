export class RoomQueries {
    static getRooms = `
    SELECT miranda_schema.rooms._id, roomNumber, availability, description, offer, price, discount, cancellation, miranda_schema.room_type.roomType, miranda_schema.amenities.amenity, miranda_schema.images.imageUrl
    FROM miranda_schema.rooms 
    LEFT JOIN miranda_schema.room_type ON miranda_schema.rooms.roomType = miranda_schema.room_type._id
    INNER JOIN miranda_schema.rooms_amenities ON miranda_schema.rooms._id = miranda_schema.rooms_amenities.roomID
    INNER JOIN miranda_schema.amenities ON miranda_schema.rooms_amenities.amenityID = miranda_schema.amenities._id
    INNER JOIN miranda_schema.rooms_images ON miranda_schema.rooms._id = miranda_schema.rooms_images.roomID
    INNER JOIN miranda_schema.images ON miranda_schema.rooms_images.imageID = miranda_schema.images._id;`

    static getSingleRoom = `
    SELECT miranda_schema.rooms._id, roomNumber, availability, description, offer, price, discount, cancellation, miranda_schema.room_type.roomType, miranda_schema.amenities.amenity, miranda_schema.images.imageUrl
    FROM miranda_schema.rooms 
    LEFT JOIN miranda_schema.room_type ON miranda_schema.rooms.roomType = miranda_schema.room_type._id
    INNER JOIN miranda_schema.rooms_amenities ON miranda_schema.rooms._id = miranda_schema.rooms_amenities.roomID
    INNER JOIN miranda_schema.amenities ON miranda_schema.rooms_amenities.amenityID = miranda_schema.amenities._id
    INNER JOIN miranda_schema.rooms_images ON miranda_schema.rooms._id = miranda_schema.rooms_images.roomID
    INNER JOIN miranda_schema.images ON miranda_schema.rooms_images.imageID = miranda_schema.images._id;
    WHERE miranda_schema.rooms._id = ?:`

    static getLastRoomId = `SELECT max(_id) AS _id FROM miranda_schema.rooms;`

    static createRoom = `
    INSERT INTO miranda_schema.rooms (roomNumber, availability, roomType, description, offer, price, discount, cancellation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`

    static createRoomAmenities = `INSERT INTO miranda_schema.rooms_amenities (amenityID, roomID) VALUES (?, ?)`

    static createRoomImages = `INSERT INTO  miranda_schema.rooms_images (roomID, imageID) VALUES (?, ?)`

    static deleteRoom = 'DELETE * FROM `miranda_schema`.`rooms` WHERE _id EQUALS ?'

    static deleteRoomAmenities = 'DELETE * FROM `miranda_schema`.`rooms` WHERE amenityID EQUALS ? AND roomID EQUEALS ?'
    
    static deleteRoomImages = 'DELETE * FROM `miranda_schema`.`rooms` WHERE imageID EQUALS ? AND roomID EQUEALS ?'

    static updateRoom = `
    UPDATE miranda_schema.rooms
    SET roomNumber = ?, availability = ?, description = ?, offer = ?, price = ?, discount = ?, cancellation = ?, roomType = ?
    WHERE CustomerID = ?;`

    static updateRoomAmenities = `
    UPDATE miranda_schema.rooms_amenities
    SET miranda_schema.rooms (amenityID, roomID) VALUES (?, ?)
    WHERE roomID = ?;`

    static updateRoomImages = `
    UPDATE miranda_schema.rooms_images
    SET miranda_schema.rooms_images (roomID, imageID) VALUES (?, ?)
    WHERE imageID = ?`
}