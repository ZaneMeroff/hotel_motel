import $ from 'jquery';
import Customer from './customer.js'
import {hideOrShowElement} from './index.js';
import {giveCustomer} from './index.js';
import {instantiateManager} from './index.js';
import {instanciateHotel} from './index.js';

let hotel;

const domUpdates = {

  displayCustomerWelcomeScreen: (currentUser) => {
    $('.h1-heading').text(`Howdy, ${currentUser.name}`)
    $('.h2-heading').text(`as of ${currentUser.currentDate} you have spent $${currentUser.totalSpent}`)
  },

  displayManagerDashboard: (manager, hotel) => {
    $('.h1-heading').text(`${manager.name} dashboard`)
    $('.h2-heading').text(`today is ${manager.todaysDate} • total revenue for today is $${manager.todaysTotalRevenue}`)
    $('.total-occupancy').text(`${hotel.totalOccupancy}%`)
  },

  displayManagerDashOfCustomer: (customer) => {
    $('.h1-heading').text(`manager view of: ${customer.managersCustomer.name}`)
    $('.h2-heading').text(`todays date: ${customer.currentDate} • total spent: $${customer.managersCustomer.totalSpent}`)
  },

  logOutUser: $('.log-out-button').on('click', () => {
    location.reload();
  }),

  displayCustomerSearchResults: () => {
    hotel = instanciateHotel();
    let customer = giveCustomer();
    customer.searchDate = $('.date-input').val().split('-').join('/')
    console.log(hotel);
    customer.addAvailableCabinsToBookingSearch(hotel)
    domUpdates.populateCustomerSearchResults(customer)
    hideOrShowElement('hide', '.past-future-container, .book-a-cabin-container');
    hideOrShowElement('show', '.available-res-container, .new-search-button');
  },

  displayManagerViewOfSelectedCustomer: $('.search-users-button').on('click', () => {
    let manager = instantiateManager();
    hotel = instanciateHotel();
    let customer = manager.instantiateCustomerFromSearch(hotel);
    domUpdates.displayManagerDashOfCustomer(manager);
    domUpdates.populatePastFutureBookingsForCustomer(customer);
    customer.addAvailableCabinsToBookingSearch(hotel)
    domUpdates.populateCustomerSearchResults(customer)
    hideOrShowElement('hide', '.search-users-container, .manager-available-res-container');
    hideOrShowElement('show', '.past-future-container-manager, .available-res-container, .go-back-button');
  }),

  goBackToCustomerSearch: () => {
    $('.date-input').val('');
    hideOrShowElement('show', '.past-future-container, .book-a-cabin-container');
    hideOrShowElement('hide', '.available-res-container');
  },

  goBackToManagerDash: () => {
    hideOrShowElement('hide', '.available-res-container, .past-future-container-manager, .go-back-button');
    hideOrShowElement('show', '.search-users-container, .manager-available-res-container');
  },

  populatePastFutureReservations: (currentUser) => {
    $('.past-future-card-area').empty();
    currentUser.allBookings.forEach(booking => {
      $('.past-future-card-area').append(
        `<div class="past-future-card">
      <h2>Cabin: ${booking.roomNumber}</h2>
      <h2>Date: ${booking.date}</h2></div>`)
    })
  },

  populateCustomerSearchResults: (user) => {
    if (user.availableRooms.length === 0) {
      hideOrShowElement('show', '.customer-no-results-error');
    } else {
      hideOrShowElement('hide', '.customer-no-results-error');
      user.availableRooms.forEach(room => {
        $('.available-res-card-area').append(
          `<div class="available-res-card">
        <div class="cabin-stats-container">
          <h2>Cabin: #${room.number}</h2>
          <h2>${room.roomType}</h2>
          <h2>Number of Beds: ${room.numBeds}</h2>
          <h2>Bed Size: ${room.bedSize}</h2>
          <h2>Bidet: ${room.bidet}</h2>
          <h2>Cost: $${room.costPerNight}</h2>
        </div>
        <button type="button" id="${room.number}" class="book-this-cabin-button">book this cabin</button>
      </div>`)
      })
    }
  },

  populateAvailableRoomsForManager: (hotel) => {
    hotel.roomsAvailableToday.forEach(room => {
      $('.manager-past-future-card-area').append(
        `<div class="available-res-card">
        <div class="cabin-stats-container">
          <h2>Cabin: #${room.number}</h2>
          <h2>${room.roomType}</h2>
          <h2>Number of Beds: ${room.numBeds}</h2>
          <h2>Bed Size: ${room.bedSize}</h2>
          <h2>Bidet: ${room.bidet}</h2>
          <h2>Cost: $${room.costPerNight}</h2>
        </div>
      </div>`)
    })
  },

  populatePastFutureBookingsForCustomer: (customer) => {
    customer.allBookings.forEach(booking => {
      $('.manager-past-future-card-area-delete').append(`
      <div class="manager-past-future-card">
        <div>
          <h2>Cabin: #${booking.roomNumber}</h2>
          <h2>Date: ${booking.date}</h2>
        </div>
        <div>
          <button id="${booking.id}" type="button" class="delete-booking-button">delete</button>
        </div>
      </div>`)
    })
  },

}

export default domUpdates;
