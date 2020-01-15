import $ from 'jquery';
import './css/base.scss';
import './css/customer_styles.scss';
import './css/manager_styles.scss';
import Hotel from './hotel.js';
import Customer from './customer.js';
import Manager from './manager.js';
import domUpdates from './domUpdates.js';

let hotel, manager, signedInUser;
let hotelCreated = false;
let allData = {};
let newDate = new Date();

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
const fetchBookingData = async () => {
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

const getTodaysDate = () => {
  return `${newDate.getFullYear()}/0${newDate.getMonth()+1}/${newDate.getDate()}`;
}

const checkSignInStatus = () => {
  let userIdNumber;
  // = $('#username').val().split('r')[1]
  if ($('#username').val().split('r')[0] === 'custome') {
    userIdNumber = parseInt($('#username').val().split('r')[1])
    instanciateCustomer(userIdNumber);
    instanciateHotel();
    domUpdates.displayCustomerWelcomeScreen(signedInUser);
    domUpdates.populatePastFutureReservations(signedInUser);
    hideOrShowElement('show', '.past-future-container, .book-a-cabin-container, .log-out-button, .user-validation');
    hideOrShowElement('hide', '.landing-container');
    $(".date-input").attr("min", getTodaysDate().split('/').join('-') );
  } else if ($('#username').val() === 'manager' && $('#password').val() === 'overlook19') {
    instanciateHotel();
    instantiateManager();
    hotel.findTodaysBookings();
    hotel.calculateTotalOccupancy();
    hotel.findRoomsAvailableToday();
    manager.calculateTodaysTotalRevenue(hotel);
    domUpdates.populateAvailableRoomsForManager(hotel);
    domUpdates.displayManagerDashboard(manager, hotel);
    hideOrShowElement('hide', '.landing-container');
    hideOrShowElement('show', '.log-out-button, .search-users-container, .manager-available-res-container');
  } else {
    hideOrShowElement('show', '.user-validation');
  }
}

const postNewBookingToAPI = async (event) => {
  let roomNumber = parseInt(event.currentTarget.id);
  const { id: userID, searchDate: date } = signedInUser
  const booking = {
    "userID": userID,
    "date": date,
    "roomNumber": roomNumber
  }
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking)
  }
  const url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Could not book your room.  Try again.`);
  const data = await response.json();
  window.alert(`Your Booking for Cabin #${roomNumber} on ${date} was successful!`)
  return data;
}

// const postBooking = async (booking) => {
//
//
//
//       postBooking(roomToBook);
// }

const instanciateCustomer = id => {
  let selectedUser = allData.userData.find(user => {
    if (user.id === id) {
      return user;
    }
  })
  signedInUser = new Customer(selectedUser.id, selectedUser.name, getTodaysDate())
  signedInUser.findAllBookings()
}

export const instanciateHotel = () => {
  if (!hotelCreated) {
    hotel = new Hotel(allData.userData, allData.roomData, allData.bookingData, getTodaysDate());
    hotelCreated = true
  }
  console.log(hotel)
  return hotel;
}

const instantiateManager = () => {
  manager = new Manager('manager', getTodaysDate());
}

const onBookThisCabinSelect = async (event) => {
  await postNewBookingToAPI(event);
  const response = await fetchBookingData();
  hotel.setBookings(response.bookings);
  signedInUser.findAllBookings();
  domUpdates.populatePastFutureReservations(signedInUser);
  domUpdates.goBackToCustomerSearch();
}

export const hideOrShowElement = (command, element) => {
  if (command === 'hide') {
    $(`${element}`).addClass('hidden');
  } else if (command === 'show'){
    $(`${element}`).removeClass('hidden');
  }
}

export const giveUser = () => {
  return signedInUser;
}

export const giveManager = () => {
  return manager;
}

// On Page Load
getData()
getTodaysDate()

// Event Listeners
$('.sign-in-button').click(checkSignInStatus);
$('.select-date-button').click(domUpdates.displayCustomerSearchResults);
$('.new-search-button').click(domUpdates.goBackToCustomerSearch);
$('.available-res-card-area').on('click', '.book-this-cabin-button', onBookThisCabinSelect);
