import $ from 'jquery';
import Customer from './customer.js'
import {hideOrShowElement} from './index.js';
// import signedInUser from './index.js';

const domUpdates = {

  displayCustomerWelcomeScreen: (currentUser) => {
    $('.h1-heading').text(`Howdy, ${currentUser.name}`)
    $('.h2-heading').text(`as of 01/09/20 you have spent $${currentUser.totalSpent}`)
  },

  displayManagerDashboard: () => {
    $('.h1-heading').text('Howdy, Manager')
    $('.h2-heading').text('today is 01/09/20 • total revenue for today: $8,393.59')
  },

  logOutUser: $('.log-out-button').on('click', () => {
     location.reload();
  }),

  displayCustomerSearchResults: $('.select-date-button').on('click', () => {
     hideOrShowElement('show', '.available-res-container');
     hideOrShowElement('hide', '.book-a-cabin-container');
     hideOrShowElement('hide', '.past-future-container');
     hideOrShowElement('show', '.new-search-button');
  }),

  displayManagerViewOfSelectedCustomer: $('.search-users-button').on('click', () => {
    hideOrShowElement('hide', '.search-users-container');
    hideOrShowElement('hide', '.manager-available-res-container');
    hideOrShowElement('show', '.past-future-container-manager');
    hideOrShowElement('show', '.make-booking-for-this-guest-container');
  }),







}



export default domUpdates;
