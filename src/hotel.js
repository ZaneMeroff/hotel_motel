import $ from 'jquery';
import Customer from './customer.js'
import Manager from './manager.js'

class Hotel {
  constructor(users, rooms, bookings, date) {
    this.allUsers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.roomsAvailableToday = []
    this.totalOccupancy = 0;
  }

  calculateRoomsAvailableToday() {
    
  }




}











export default Hotel;
