import $ from 'jquery';
import Customer from './customer.js'
import {hideOrShowElement} from './index.js';
import {giveUser} from './index.js';

const domUpdates = {

  displayCustomerWelcomeScreen: (currentUser) => {
    $('.h1-heading').text(`Howdy, ${currentUser.name}`)
    $('.h2-heading').text(`as of ${currentUser.currentDate} you have spent $${currentUser.totalSpent}`)
  },

  displayManagerDashboard: () => {
    $('.h1-heading').text('Howdy, Manager')
    $('.h2-heading').text('today is 01/09/20 • total revenue for today: $8,393.59')
  },

  logOutUser: $('.log-out-button').on('click', () => {
     location.reload();
  }),

  displayCustomerSearchResults: () => {
    let user = giveUser();
    user.searchDate = $('.date-input').val();
    user.addAvailableCabinsToBookingSearch()
    // need to clear out search results
    // need to write conditional if $('.date-input').val() is empty
    // display error message
    // also need to make post request if booking is selected
    domUpdates.populateCustomerSearchResults(user)
    hideOrShowElement('hide', '.past-future-container');
    hideOrShowElement('hide', '.book-a-cabin-container');
    hideOrShowElement('show', '.available-res-container');
    hideOrShowElement('show', '.new-search-button');
  },

  displayManagerViewOfSelectedCustomer: $('.search-users-button').on('click', () => {
    hideOrShowElement('hide', '.search-users-container');
    hideOrShowElement('hide', '.manager-available-res-container');
    hideOrShowElement('show', '.past-future-container-manager');
    hideOrShowElement('show', '.make-booking-for-this-guest-container');
  }),

  goBackToCustomerSearch: () => {
    hideOrShowElement('show', '.past-future-container');
    hideOrShowElement('show', '.book-a-cabin-container');
    hideOrShowElement('hide', '.available-res-container');
  },

  populatePastFutureReservations: (currentUser) => {
    currentUser.allBookings.forEach(booking => {
    $('.past-future-card-area').append(
    `<div class="past-future-card">
      <h2>Cabin: ${booking.roomNumber}</h2>
      <h2>Date: ${booking.date}</h2></div>`)
    })
  },

  populateCustomerSearchResults: (user) => {
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
      <button type="button" class="book-this-cabin-button">book this cabin</button>
    </div>`)
    })
  },


}



export default domUpdates;
