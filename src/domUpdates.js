import $ from 'jquery';
import './index.js';

const domUpdates = {

  displayCustomerWelcomeScreen: () => {
    $('.h1-heading').text('Howdy, Trudie!')
    $('.h2-heading').text('as of 01/09/20 you have spent $1,345.48')
  },

  logOutUser: $('.log-out-button').on('click', () => {
     location.reload();
  }),

  displayCustomerSearchResults: $('.select-date-button').on('click', () => {
     $('.available-res-container').removeClass('hidden');
     $('.book-a-cabin-container').addClass('hidden');
     $('.past-future-container').addClass('hidden');
     $('.new-search-button').removeClass('hidden');
     // hideOrShowElement('show', '.available-res-container');
     // hideOrShowElement('hide', '.book-a-cabin-container');
     // hideOrShowElement('hide', '.past-future-container');
  }),







}



export default domUpdates;
