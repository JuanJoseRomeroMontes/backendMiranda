import { describe, it } from "node:test"
import { expect } from '@jest/globals';
import { Room } from "../services/roomsServices";
import { Booking } from "../services/bookingServices";
import { Contact } from "../services/contactServices";
import { User } from "../services/userServices";

const jwt = require('jsonwebtoken');
const request = require('supertest')
const { app } = require('../app')
const token = jwt.sign("miranda@gmail.com", process.env.TOKEN_SECRET);

describe('Get lists', () => {
  it('test getRoomList', async () => {
    const res = await request(app).get('/room').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({rooms:Room.getRoomList()})
  })

  it('test getBookingList', async () => {
    const res = await request(app).get('/booking').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({bookings:Booking.getBookingList()})
  })

  it('test getUserList', async () => {
    const res = await request(app).get('/user').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({users:User.getuserList()})
  })

  it('test getContactList', async () => {
    const res = await request(app).get('/contact').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({contacts:Contact.getContactList()})
  })
})

describe('Get individual', () => {
  it('test getRoom', async () => {
    const res = await request(app).get('/room/0').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({room:Room.getRoomList()[0]})
  })

  it('test getBooking', async () => {
    const res = await request(app).get('/booking/0').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({booking:Booking.getBookingList()[0]})
  })

  it('test getUser', async () => {
    const res = await request(app).get('/user/0').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({user:User.getuserList()[0]})
  })

  it('test getContact', async () => {
    const res = await request(app).get('/contact/0').set('Authorization', 'Token '+token)
    
    expect(res.body).toMatchObject({contact:Contact.getContactList()[0]})
  })
})