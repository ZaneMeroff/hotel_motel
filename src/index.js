import $ from 'jquery';
import './css/base.scss';
import './css/customer_manager_styles.scss';
import Hotel from './hotel.js';
import Customer from './customer.js';
import Manager from './manager.js';
import domUpdates from './domUpdates.js';

let hotel, manager, signedInUser, customer;
let hotelCreated = false;
let managerCreated = false;
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
  if ($('#username').val().split('r')[0] === 'custome'
    && $('#password').val() === 'overlook19') {
    userIdNumber = parseInt($('#username').val().split('r')[1])
    instanciateHotel();
    instanciateCustomer(userIdNumber);
    signedInUser.clearOutAvailableRooms(hotel)
    loadCustomerDash();
  } else if ($('#username').val() === 'manager' && $('#password').val() === 'overlook19') {
    instanciateHotel();
    instantiateManager();
    loadManagerDash();
  } else {
    hideOrShowElement('show', '.user-validation');
  }
}

const loadCustomerDash = () => {
  domUpdates.displayCustomerWelcomeScreen(signedInUser);
  domUpdates.populatePastFutureReservations(signedInUser);
  hideOrShowElement('show', '.past-future-container, .book-a-cabin-container, .log-out-button, .user-validation');
  hideOrShowElement('hide', '.landing-container');
  $(".date-input").attr("min", getTodaysDate().split('/').join('-'));
}

const loadManagerDash = () => {
  hotel.findTodaysBookings();
  hotel.calculateTotalOccupancy();
  hotel.findRoomsAvailableToday();
  manager.calculateTodaysTotalRevenue(hotel);
  domUpdates.populateAvailableRoomsForManager(hotel);
  domUpdates.displayManagerDashboard(manager, hotel);
  hideOrShowElement('hide', '.landing-container');
  hideOrShowElement('show', '.log-out-button, .search-users-container, .manager-available-res-container');
}

const postNewBookingToAPIHelper = async (event, user) => {
  const {
    id: userID,
    searchDate: date
  } = user;
  let roomNumber = parseInt(event.currentTarget.id);
  const booking = {
    "userID": userID,
    "date": date,
    "roomNumber": roomNumber
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(booking)
  }
  const url = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings'
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Could not book your room.  Try again.`);
  const data = await response.json();
  window.alert(`Your Booking for Cabin #${roomNumber} on ${date} was successful!`)
  return data;
}

const postNewBookingToAPI = async (event) => {
  const {
    id: userID,
    searchDate: date
  } = signedInUser
  postNewBookingToAPIHelper(event, signedInUser);
}

const instanciateCustomer = id => {
  let selectedUser = allData.userData.find(user => {
    if (user.id === id) {
      return user;
    }
  })
  signedInUser = new Customer(selectedUser.id, selectedUser.name, hotel.date)
  signedInUser.findAllBookings(hotel)
  signedInUser.calculateTotalSpent(hotel)
}

export const instanciateHotel = () => {
  if (!hotelCreated) {
    hotel = new Hotel(allData.userData, allData.roomData, allData.bookingData, getTodaysDate());
    hotelCreated = true
  }
  return hotel;
}

export const instantiateManager = () => {
  if (!managerCreated) {
    manager = new Manager('manager', getTodaysDate());
    managerCreated = true;
  }
  return manager;
}

const onBookThisCabinSelect = async (event) => {
  if (managerCreated === false) {
    await postNewBookingToAPI(event);
    signedInUser.findAllBookings(hotel);
  } else {
    await postNewBookingToAPIHelper(event, manager.managersCustomer);
    manager.managersCustomer.findAllBookings(hotel);
    // ^ needs to be customer.findAllBookings()
  }
  const response = await fetchBookingData();
  hotel.setBookings(response.bookings);
  if (signedInUser) {
    signedInUser.calculateTotalSpent(hotel);
    domUpdates.displayCustomerWelcomeScreen(signedInUser);
    domUpdates.populatePastFutureReservations(signedInUser);
  } else {
    domUpdates.displayCustomerWelcomeScreen(manager.managersCustomer);
    domUpdates.populatePastFutureReservations(manager.managersCustomer);
    manager.managersCustomer.calculateTotalSpent(hotel);
  }
  domUpdates.goBackToCustomerSearch();
}

const onDeleteBookingSelect = event => {
  let bookingId = event.currentTarget.id;
  deleteBookingFromAPI(bookingId);
  window.alert(`Your booking of id: ${bookingId} was removed. Please refresh page to view updated information.`);
}

const deleteBookingFromAPI = i => {
  return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: i
    })
  })
}

export const hideOrShowElement = (command, element) => {
  if (command === 'hide') {
    $(`${element}`).addClass('hidden');
  } else if (command === 'show') {
    $(`${element}`).removeClass('hidden');
  }
}

export const giveCustomer = () => {
  return signedInUser;
}

export const giveManager = () => {
  return manager;
}

// const giveManagersCustomer = () => {
//   // return customer
//
// }

const managerDashHelper = () => {
  domUpdates.displayManagerDashboard(manager, hotel)
  domUpdates.goBackToManagerDash()
}

// On Page Load
getData()
getTodaysDate()

// Event Listeners
$('.sign-in-button').click(checkSignInStatus);
$('.go-back-button').click(managerDashHelper);
$('.select-date-button').click(domUpdates.displayCustomerSearchResults);
$('.new-search-button').click(domUpdates.goBackToCustomerSearch);
$('.available-res-card-area').on('click', '.book-this-cabin-button', onBookThisCabinSelect);
$('.past-future-container-manager').on('click', '.delete-booking-button', onDeleteBookingSelect);
