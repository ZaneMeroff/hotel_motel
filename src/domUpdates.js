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
    console.log(user.availableRooms);
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

  populatePastFutureReservations: (currentUser) => {
    currentUser.allBookings.forEach(booking => {
    $('.past-future-card-area').append(
    `<div class="past-future-card">
      <h2>Cabin: ${booking.roomNumber}</h2>
      <h2>Date: ${booking.date}</h2></div>`)
    })
  },







}



export default domUpdates;
