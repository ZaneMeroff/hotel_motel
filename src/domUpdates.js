import $ from 'jquery';
import {hideOrShowElement} from './index.js';


const domUpdates = {

  displayCustomerWelcomeScreen: () => {
    $('.h1-heading').text('Howdy, Trudie!')
    $('.h2-heading').text('as of 01/09/20 you have spent $1,345.48')
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







}



export default domUpdates;
