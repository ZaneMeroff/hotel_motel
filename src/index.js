import $ from 'jquery';
import './css/base.scss';
import './css/customer_styles.scss';
import './css/manager_styles.scss';
import Hotel from './hotel.js';
import Customer from './customer.js';
import Manager from './manager.js';
import domUpdates from './domUpdates.js';

let allData = {};
let signedInUser;
let newDate = new Date();
let usableDate = new Date(newDate)

console.log(usableDate);


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
    .then(values => assignAPIdata(values))
    .catch((error) => window.alert(`error: ${error}.`))
}

const assignAPIdata = apiData => {
  apiData.forEach(item => {
    allData.userData = apiData[0].users;
    allData.roomData = apiData[1].rooms;
    allData.bookingData = apiData[2].bookings;
  })
}

const checkSignInStatus = () => {
  let userIdNumber;
  // = $('#username').val().split('r')[1]
  if ($('#username').val().split('r')[0] === 'custome') {
    userIdNumber = parseInt($('#username').val().split('r')[1])
    instanciateCustomer(userIdNumber);
    domUpdates.displayCustomerWelcomeScreen(signedInUser);
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

const instanciateCustomer = id => {
  let selectedUser = allData.userData.find(user => {
    if (user.id === id) {
      return user;
    }
  })
  signedInUser = new Customer(selectedUser.id, selectedUser.name, allData)
  signedInUser.findAllBookings()
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
