import $ from 'jquery';
import './css/base.scss';
import './css/customer_styles.scss';
import './css/manager_styles.scss';
import hotel from './hotel.js';
import customer from './customer.js';
import manager from './manager.js';
import domUpdates from './domUpdates.js';

// fetch dataset
const fetchUserData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
    .then(response => response.json())
    .catch((error) => window.alert(`error: ${error}.`))
}
const fetchRoomData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
    .then(response => response.json())
    .catch((error) => window.alert(`error: ${error}.`))
}
const fetchBookingData = () => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
    .then(response => response.json())
    .catch((error) => window.alert(`error: ${error}.`))
}
const getData = () => {
  Promise.all([fetchUserData(), fetchRoomData(), fetchBookingData()])
    .then(values => console.log(values))
    .catch((error) => window.alert(`error: ${error}.`))
}

const checkSignInStatus = () => {
  if ($('#username').val() === 'c' && $('#password').val() === 'c') {
    domUpdates.displayCustomerWelcomeScreen();
    hideOrShowElement('show', '.past-future-container');
    hideOrShowElement('show', '.book-a-cabin-container');
    hideOrShowElement('show', '.log-out-button');
    hideOrShowElement('show', '.user-validation');
    hideOrShowElement('hide', '.landing-container');
  } else if ($('#username').val() === 'm' && $('#password').val() === 'm') {
    domUpdates.displayManagerDashboard();
    hideOrShowElement('hide', '.landing-container');
    hideOrShowElement('show', '.log-out-button');
    hideOrShowElement('show', '.search-users-container');
    hideOrShowElement('show', '.manager-available-res-container');
  } else {
    hideOrShowElement('show', '.user-validation');
  }
}

export const hideOrShowElement = (command, element) => {
  if (command === 'hide') {
    $(`${element}`).addClass('hidden');
  } else if (command === 'show'){
    $(`${element}`).removeClass('hidden');
  }
}

// On Page Load
getData()

// Event Listeners
$('.sign-in-button').click(checkSignInStatus);
