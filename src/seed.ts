import { BookingSimpleInterface, ContactInterface, MongoRoomInterface, RoomInterface, UserInterface } from './interfaces/interfaces';
import { User } from "./services/userServices";
import { Room } from "./services/roomsServices";
import { Contact } from "./services/contactServices";
import { Booking } from "./services/bookingServices";
import { faker } from '@faker-js/faker';
import { DateToString } from './utils/utils';
import mongoose from 'mongoose';

const dotenv = require('dotenv');
dotenv.config();

const dataNumber = 10;

async function setUpDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected correctly to server\n");

        /*Clear DB
        const db = client.db(dbName);
        const collections = await db.collections();

        for (const collection of collections) {
            await collection.deleteMany({});
        }*/
        console.log("Database cleared!\n");
    }  catch (err) {
        console.log(err);
    }
}

async function seedUsers() {
    try {

        for (let i = 0; i < dataNumber; i++) {
            const name = faker.person.firstName();
            const newUser:UserInterface = {
                name: name,
                email: faker.internet.email({firstName:name}),
                phone: faker.phone.number(),
                photo: faker.image.urlLoremFlickr({ category: 'avatar' }),
                positionName: faker.commerce.department(),
                positionDescription: faker.lorem.sentence({ min: 5, max: 10 }),
                date: DateToString(faker.date.past()),
                status: faker.datatype.boolean(),
                password: faker.internet.password( {memorable: true} ),
            };
            
            await User.createUser(newUser)
        }

        console.log("Users seeded!\n");
    } catch (err) {
        console.log(err);
    }
}

async function seedContacts() {
    try {
        const name = faker.person.firstName();
        for (let i = 0; i < dataNumber; i++) {
            const newContact:ContactInterface = {
                date: DateToString(faker.date.anytime()),
                client: {
                    name: name,
                    email: faker.internet.email({firstName:name}),
                    phone: faker.phone.number(),
                },
                subject: faker.lorem.sentence({ min: 1, max: 10 }),
                comment: faker.lorem.sentence({ min: 5, max: 25 }),
                archived: faker.datatype.boolean()
            };
            
            await Contact.createContact(newContact)
        }

        console.log("Contacts seeded!\n");
    } catch (err) {
        console.log(err);
    }
}

const roomList:MongoRoomInterface[] = [];

async function seedRooms() {
    const roomTypes:string[] = ['Single Bed', 'Double Bed', 'Double Superior', 'Suite'];
    const amenities:string[] = ['Air conditioner', 'High speed WiFi', 'Breakfast', 'Kitchen', 'Cleaning', 'Shower', 'Grocery',
                                'Shop Near', 'Towels', 'TV', 'Beach views'];
    try {
        for (let i = 0; i < dataNumber; i++) {
            const photosArray:string[] = [];
            const arrayLength = faker.helpers.rangeToNumber({ min: 3, max: 5 });

            for (let index = 0; index < arrayLength; index++) {
                photosArray.push(faker.image.urlLoremFlickr({ category: 'room' }),)
            }

            const newRoom:RoomInterface = {
                roomNumber: faker.number.int({ min: 1, max: 200 }),
                availability: faker.datatype.boolean(),
                roomType: faker.helpers.arrayElement(roomTypes),
                description: faker.lorem.sentence({ min: 5, max: 15 }),
                offer: faker.datatype.boolean(),
                price: faker.number.int({ min: 100, max: 10000 }),
                discount: faker.number.int({ min: 0, max: 85 }),
                cancellation: faker.lorem.sentence({ min: 5, max: 10 }),
                amenities: faker.helpers.arrayElements(amenities, { min: 1, max: 5 }),
                photosArray: photosArray
            };
            
            const createdRoom = await Room.createRoom(newRoom);
            roomList.push(createdRoom);
        }

        console.log("Rooms seeded!\n");
    } catch (err) {
        console.log(err);
    }
}

async function seedBookings() {
    try {
        const statuses:string[] = ["Check out", "Check in", "In progress"]

        for (let i = 0; i < dataNumber; i++) {
            const roomId = roomList[faker.helpers.rangeToNumber({ min: 0, max: roomList.length })]._id;
            const checkIn:Date = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })
            const checkOut:Date = new Date();
            checkOut.setDate(checkIn.getDate()+faker.helpers.rangeToNumber({ min: 0, max: 7 }));

            const newBooking:BookingSimpleInterface = {
                fullName: faker.person.firstName(),
                bookDate: DateToString(faker.date.past()),
                checkIn: DateToString(checkIn),
                checkOut: DateToString(checkOut),
                specialRequest: faker.lorem.sentence({ min: 5, max: 10 }),
                roomId: roomId,
                status: faker.helpers.arrayElement(statuses),
            };
            
            await Booking.createBooking(newBooking, newBooking.roomId)
        }

        console.log("Bookings seeded!\n");
    } catch (err) {
        console.log(err);
    }
}

async function seedDB(){
    await setUpDB();
    await seedUsers();
    await seedContacts();
    await seedRooms();
    await seedBookings();
    console.log("Database seeded!\n");
}

seedDB();