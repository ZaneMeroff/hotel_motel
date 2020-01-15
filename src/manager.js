import $ from 'jquery';
import Customer from './customer.js';
import Hotel from './hotel.js';
import domUpdates from './domUpdates.js';
import {instanciateHotel} from './index.js';

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

  instantiateCustomerFromSearch() {
    let selectedUser = $('.user-search-input').val();
    let hotel = instanciateHotel();
    console.log(hotel);
    let targetUser = hotel.allUsers.find(user => {
      return user.name === selectedUser
    })
    let customer = new Customer(selectedUser.id, selectedUser.name, hotel.date)
    console.log(customer);
  }


}












export default Manager;
