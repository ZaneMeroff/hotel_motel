import $ from 'jquery';

const domUpdates = {

  displayCustomerWelcomeScreen: () => {
    $('.h1-heading').text('Welcome, Trudie!')
    $('.h2-heading').text('as of 01/09/20 you have spent $1,345.48')
  },

  logOutUser: $('.log-out-button').on('click', () => {
     location.reload();
   }),

   bookACabin: $('.book-a-cabin-button').on('click', () => {
      $('.past-future-container').addClass('hidden');
   }),








}



export default domUpdates;
