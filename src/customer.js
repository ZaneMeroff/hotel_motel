import $ from 'jquery';
import Hotel from './hotel.js'

class Customer {
  constructor(id, name, date) {
    this.id = id;
    this.name = name;
    this.currentDate = date;
    this.totalSpent = 0;
    this.allBookings = [];
    this.availableRooms = [];
    this.searchDate = date;
  }

  findAllBookings(hotel) {
    let bookings = hotel.bookings.filter(booking => {
      return parseInt(booking.userID) === parseInt(this.id);
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
    this.allBookings = bookings;
  }

  calculateTotalSpent(hotel) {
    let number = hotel.rooms.reduce((acc, room) => {
      hotel.bookings.forEach(booking => {
        if (booking.roomNumber === room.number && booking.userID === this.id) {
          acc += room.costPerNight;
        }
      });
      return acc;
    }, 0);
    this.totalSpent = number.toFixed(2);
  }

  addAvailableCabinsToBookingSearch(hotel) {
    $('.available-res-card-area').html('');
    this.clearOutAvailableRooms(hotel);
    this.unavailableRooms = hotel.rooms.reduce((acc, room) => {
      hotel.bookings.forEach(booking => {
        if (this.searchDate === booking.date && booking.roomNumber === room.number) {
          acc.push(room);
        }
      });
      return acc;
    }, []);
    this.unavailableRooms.forEach(unavailableRoom => {
      hotel.rooms.forEach(room => {
        if (!this.unavailableRooms.includes(room) && !this.availableRooms.includes(room)) {
          if (this.checkForFilters(room)) {
            this.availableRooms.push(room);
          }
        }
      });
    });
  }

  checkForFilters(room) {
    if ($('.room-type-dropdown').val() !== '' && $('.room-type-dropdown').val() === room.roomType) {
      return true;
    } else if ($('.room-type-dropdown').val() !== '' && $('.room-type-dropdown').val() !== room.roomType) {
      return false;
    } else {
      return true;
    }
  }

  clearOutAvailableRooms() {
    this.availableRooms = [];
  }

}

export default Customer;
