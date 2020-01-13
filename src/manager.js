import $ from 'jquery';
import Customer from './customer.js';
import Hotel from './hotel.js';
import domUpdates from './domUpdates.js';

class Manager extends Customer {
  constructor(name, date) {
    super();
    this.name = name;
    this.todaysTotalRevenue = 0;
    this.todaysDate = date;
  }

  calculateTodaysTotalRevenue(hotel) {
    let todaysBookings = hotel.bookings.filter(booking => {
      return booking.date === this.todaysDate;
    })
    this.todaysTotalRevenue = todaysBookings.reduce((acc, book) => {
    hotel.rooms.forEach(room => {
      if (room.number === book.roomNumber) {
        acc += room.costPerNight;
      }})
      return acc;
    }, 0).toFixed(2);
  }


}












export default Manager;
