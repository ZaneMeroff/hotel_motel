import $ from 'jquery';
import Customer from './customer.js'
import Manager from './manager.js'

class Hotel {
  constructor(users, rooms, bookings, date) {
    this.allUsers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.roomsBookedToday = [];
    this.roomsAvailableToday = [];
    this.totalOccupancy = 0;
  }

  findRoomsAvailableToday() {
    // iterate through roomsBooked today
    // find rooms that do not exist in that array
  }

  findTodaysBookings() {
    this.roomsBookedToday = this.bookings.filter(booking => {
      if (booking.date === this.date) {
      return booking;
      }
    })
  }

  calculateTotalOccupancy() {
  this.totalOccupancy = Math.floor((this.roomsBookedToday.length / 25) * 100)
  }

}











export default Hotel;
