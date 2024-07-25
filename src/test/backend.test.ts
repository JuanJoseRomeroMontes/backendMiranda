import { describe, it } from "node:test"
import { expect } from '@jest/globals';
import roomsJson from '../data/roomsData.json';
import bookingsJson from '../data/bookingsData.json';
import contactsJson from '../data/contactsData.json';
import usersJson from '../data/usersData.json';
import mongoose from "mongoose";

const jwt = require('jsonwebtoken');
const request = require('supertest')
const { app } = require('../app')
const token = jwt.sign("miranda@gmail.com", process.env.TOKEN_SECRET);

const connectToDb = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string);
	} catch (error) {
		console.error(error);
	}
};

connectToDb();

describe('Get lists', () => {
  it('test getRoomList', async () => {
    const res = await request(app).get('/room').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({rooms:roomsJson})
  })

  it('test getBookingList', async () => {
    const res = await request(app).get('/booking').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({bookings:bookingsJson})
  })

  it('test getUserList', async () => {
    const res = await request(app).get('/user').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({users:usersJson})
  })

  it('test getContactList', async () => {
    const res = await request(app).get('/contact').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({contacts:contactsJson})
  })
})

describe('Get individual', () => {
  it('test getRoom', async () => {
    const res = await request(app).get('/room/66a2573cb078fe11b9ca9813').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({room:roomsJson.find(item => item._id === "66a2573cb078fe11b9ca9813")})
  })

  it('test getBooking', async () => {
    const res = await request(app).get('/booking/66a25719b078fe11b9ca5828').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({booking:bookingsJson.find(item => item._id === "66a25719b078fe11b9ca5828")})
  })

  it('test getUser', async () => {
    const res = await request(app).get('/user/66a2574ab078fe11b9cab233').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({user:usersJson.find(item => item._id === "66a2574ab078fe11b9cab233")})
  })

  it('test getContact', async () => {
    const res = await request(app).get('/contact/66a2572db078fe11b9ca7c44').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({contact:contactsJson.find(item => item._id === "66a2572db078fe11b9ca7c44")})
  })
})