import { BookingInterface, BookingSimpleInterface, ContactInterface, RoomInterface, UserInterface } from './src/interfaces/interfaces';
import { User } from "./src/services/userServices";
import { Room } from "./src/services/roomsServices";
import { Contact } from "./src/services/contactServices";
import { Booking } from "./src/services/bookingServices";
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let client;
let collection;
const dataNumber = 10;

async function connectToDB(){
    const uri = "YOUR MONGODB ATLAS URI"; // Connection URL

    client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log("Connected correctly to server");

        collection = client.db("iot").collection("mongoose");
    }  catch (err) {
        console.log(err.stack);
    }
}

async function seedUsers() {
    try {

        for (let i = 0; i < dataNumber; i++) {
            const name = faker.name.firstName();
            const newUser:UserInterface = {
                name: name,
                email: faker.internet.email(name),
                phone: faker.phone.number(),
                photo: faker.image.urlLoremFlickr({ category: 'avatar' }),
                positionName: faker.commerce.department(),
                positionDescription: faker.lorem.sentence({ min: 5, max: 10 }),
                date: faker.date.past(),
                status: faker.datatype.boolean(),
                password: faker.internet.password( {memorable: true} ),
            };
            
            User.createUser(newUser)
        }

        console.log("Users seeded!\n");
    } catch (err) {
        console.log(err.stack);
    }
}

async function seedContacts() {
    try {
        const name = faker.name.firstName();
        for (let i = 0; i < dataNumber; i++) {
            const newContact:ContactInterface = {
                date: faker.date.anytime(),
                client: {
                    name: name,
                    email: faker.internet.email(name),
                    phone: faker.phone.number(),
                },
                subject: faker.lorem.sentence({ min: 1, max: 10 }),
                comment: faker.lorem.sentence({ min: 5, max: 25 }),
                archived: faker.datatype.boolean()
            };
            
            Contact.createContact(newContact)
        }

        console.log("Contacts seeded!\n");
    } catch (err) {
        console.log(err.stack);
    }
}

const roomList = [];

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
        console.log(err.stack);
    }
}

function reviveDate(key, value) {
    // Matches strings like "2022-08-25T09:39:19.288Z"
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  
    return typeof value === 'string' && isoDateRegex.test(value) ? new Date(value) : value
}

async function seedBookings() {
    try {
        for (let i = 0; i < dataNumber; i++) {
            const roomId = roomList[faker.helpers.rangeToNumber({ min: 0, max: roomList.length })]._id;
            const checkIn:string = faker.date.between({ from: '2022-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })
            const checkOut:string = faker.date.between({ from: checkIn, to: '2023-01-01T00:00:00.000Z' })

            const newBooking:BookingSimpleInterface = {
                fullName: faker.name.firstName(),
                bookDate: faker.date.past(),
                checkIn: JSON.parse(checkIn, reviveDate),
                checkOut: JSON.parse(checkOut, reviveDate),
                specialRequest: faker.lorem.sentence({ min: 5, max: 10 }),
                roomId: roomId
            };
            
            Booking.createBooking(newBooking)
        }

        console.log("Bookings seeded!\n");
    } catch (err) {
        console.log(err.stack);
    }
}

function seedDB(){
    connectToDB();
    collection.drop(); //Delete all data from db
    seedUsers();
    seedContacts();
    seedRooms();
    seedBookings();
    console.log("Database seeded!\n");
    client.close();
}

seedDB();