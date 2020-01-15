import $ from 'jquery';
import Customer from './customer.js';
import Hotel from './hotel.js';
import domUpdates from './domUpdates.js';
import {instanciateHotel} from './index.js';

class Manager extends Customer {
  constructor(name, date) {
    super(0, name, date);
    this.name = name;
    this.todaysTotalRevenue = 0;
    this.todaysDate = date;
    this.managersCustomer = null;
  }

  calculateTodaysTotalRevenue(hotel) {
    let todaysBookings = hotel.bookings.filter(booking => {
      return booking.date === this.todaysDate;
    })
    this.todaysTotalRevenue = todaysBookings.reduce((acc, book) => {
      hotel.rooms.forEach(room => {
        if (room.number === book.roomNumber) {
          acc += room.costPerNight;
        }
      })
      return acc;
    }, 0).toFixed(2);
  }

  instantiateCustomerFromSearch() {
    let selectedUser = $('.user-search-input').val();
    let hotel = instanciateHotel();
    let targetUser = hotel.allUsers.find(user => {
      return user.name === selectedUser;
    })
    let customer = new Customer(targetUser.id, targetUser.name, hotel.date)
    customer.findAllBookings();
    customer.calculateTotalSpent();
    this.managersCustomer = customer;
    return customer;
  }

}

export default Manager;
