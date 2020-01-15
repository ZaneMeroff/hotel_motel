import $ from 'jquery';
import Customer from './customer.js'
import {hideOrShowElement} from './index.js';
import {giveUser} from './index.js';
import {instantiateManager} from './index.js';
import {instanciateHotel} from './index.js';

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

  logOutUser: $('.log-out-button').on('click', () => {
     location.reload();
  }),

  displayCustomerSearchResults: () => {
    let user = giveUser();
    user.searchDate = $('.date-input').val().split('-').join('/')
    user.addAvailableCabinsToBookingSearch()
    // display error message
    // also need to make post request if booking is selected
    domUpdates.populateCustomerSearchResults(user)
    hideOrShowElement('hide', '.past-future-container, .book-a-cabin-container');
    hideOrShowElement('show', '.available-res-container, .new-search-button');
  },

  displayManagerViewOfSelectedCustomer: $('.search-users-button').on('click', () => {
    let manager = instantiateManager();
    let hotel = instanciateHotel();
    manager.instantiateCustomerFromSearch(hotel);
    hideOrShowElement('hide', '.search-users-container, .manager-available-res-container');
    hideOrShowElement('show', '.past-future-container-manager, .make-booking-for-this-guest-container, .go-back-button');
  }),

  goBackToCustomerSearch: () => {
    $('.date-input').val('');
    hideOrShowElement('show', '.past-future-container, .book-a-cabin-container');
    hideOrShowElement('hide', '.available-res-container');
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


}

export default domUpdates;
