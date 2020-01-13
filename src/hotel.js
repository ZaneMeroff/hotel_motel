import $ from 'jquery';
import Customer from './customer.js'
import Manager from './manager.js'

class Hotel {
  constructor(users, rooms, bookings, date) {
    this.allUsers = users;
    this.rooms = rooms;
    this.bookings = bookings;
    this.date = date;
    this.roomsAvailableToday = [];
    this.totalOccupancy = 0;
  }

  calculateRoomsAvailableToday() {

  }

  calculateTodaysBookings() {
    let todaysBookings = this.bookings.filter(booking => {
      return booking.date === this.date;
    })
    this.roomsAvailableToday.push(todaysBookings);
  }

  calculateTotalOccupancy() {
  // filter bookings that match todays dates
  // use that arrays length / 25
  // then grab the decimal places and reassign to this.totalOccupancy
  let todaysBookings = hotel.bookings.filter(booking => {
    return booking.date === this.todaysDate;
  })

  }




}











export default Hotel;
