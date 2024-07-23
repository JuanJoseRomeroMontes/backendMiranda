export interface BookingInterface {
    fullName: string;
    _id?:number;
    bookDate:Date;
    checkIn:Date;
    checkOut:Date;
    specialRequest:string;
    roomId:string;
    roomType:string;
    roomNumber:number;
    status:string;
}

export interface BookingSimpleInterface {
    fullName: string;
    _id?:number;
    bookDate:Date;
    checkIn:Date;
    checkOut:Date;
    specialRequest:string;
    roomId:string;
}

export interface ContactInterface {
    date:Date;
    client: {
        name:string;
        email:string;
        phone:string;
    };
    _id?:number;
    subject:string;
    comment:string;
    archived:boolean
}

export interface UserInterface {
    _id?:string;
    name:string;
    email:string;
    phone:string;
    photo:string;
    positionName:string,
    positionDescription:string,
    date:Date;
    status:boolean;
    password:string
}

export interface RoomInterface {
    _id?:number;
    roomNumber:number;
    availability: boolean;
    roomType:string;
    description:string;
    offer:boolean;
    price:number;
    discount:number;
    cancellation:string;
    amenities: string[];
    photosArray: string[]
}

export type BookingProperties = 'fullName' | 'id' | 'bookDate' | 'checkIn' | 'checkOut' | 'specialRequest' | 'roomId' | 'roomType' |
                                'roomNumber' | 'status';

export type ContactProperties = 'date' | 'id' | 'subject' | 'comment' | 'archived' | 'client';

export type UserProperties = 'name' | 'id' | 'email' | 'phone' | 'photo' | 'date' | 'status' | 'password' | 'positionName' | 
                             'positionDescription';

export type RoomProperties = 'id' | 'roomNumber' | 'availability' | 'roomType' | 'description' | 'offer' | 'price' | 'discount' | 
                             'cancellation' | 'amenities' | 'photosArray';