import $ from 'jquery';
import Hotel from './hotel.js'
import domUpdates from './domUpdates.js';
import {instanciateHotel} from './index.js';

class Customer {
  constructor(id, name, date) {
    this.id = id;
    this.name = name;
    this.currentDate = date;
    this.totalSpent = 0;
    this.allBookings = [];
    this.availableRooms = [];
    // this.unavailableRooms = [];
    // this.searchDate = '';
  }

  findAllBookings() {
    let hotel = instanciateHotel();
    let bookings = hotel.bookings.filter(booking => {
      return booking.userID === this.id;
    })
    this.allBookings = bookings;
    this.totalSpent = this.calculateTotalSpent();
  }

  calculateTotalSpent() {
    let hotel = instanciateHotel();
    let number = hotel.rooms.reduce((acc, room) => {
      hotel.bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.userID === this.id) {
          acc += room.costPerNight;
        }
      })
      return acc;
    }, 0)
    return number.toFixed(2);
  }

  addAvailableCabinsToBookingSearch() {
    let hotel = instanciateHotel();
    this.unavailableRooms = hotel.rooms.reduce((acc, room) => {
      hotel.bookings.forEach(booking => {
        if (this.searchDate === booking.date && booking.roomNumber === room.number) {
          acc.push(room);
        }
      })
      return acc;
    }, []);
    this.unavailableRooms.forEach(unavailableRoom => {
      hotel.rooms.forEach(room => {
        if (!this.unavailableRooms.includes(room) && !this.availableRooms.includes(room)) {
          this.availableRooms.push(room);
        }
      })
    })
  }

}









export default Customer;
