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

  setBookings(bookings) {
    this.bookings = bookings
  }

  findRoomsAvailableToday() {
    this.roomsAvailableToday = this.rooms.filter(room => {
      return !this.roomsBookedToday.find(booking => {
        return booking.roomNumber === room.number
      })
    })
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
