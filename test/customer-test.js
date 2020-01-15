const chai = require('chai');
const expect = chai.expect;
import Customer from '../src/customer';
import Hotel from '../src/hotel.js';

describe('Customer', () => {
  let customer, hotel;

  beforeEach(() => {
    customer = new Customer(2, 'Rocio Schuster', '2020/01/12');
    hotel = new Hotel(
      [{
          id: 1,
          name: 'Leatha Ullrich'
        },
        {
          id: 2,
          name: 'Rocio Schuster'
        },
        {
          id: 3,
          name: 'Kelvin Schiller'
        }
      ],
      [{
          number: 4,
          roomType: 'residential suite',
          bidet: true,
          bedSize: 'queen',
          numBeds: 1,
          costPerNight: 358.4
        },
        {
          number: 5,
          roomType: 'suite',
          bidet: false,
          bedSize: 'full',
          numBeds: 2,
          costPerNight: 477.38
        },
        {
          number: 6,
          roomType: 'single room',
          bidet: false,
          bedSize: 'king',
          numBeds: 1,
          costPerNight: 491.14
        }
      ],
      [{
          id: '5fwrgu4i7k55hl6sz',
          userID: 1,
          date: '2020/02/04',
          roomNumber: 4,
          roomServiceCharges: []
        },
        {
          id: '5fwrgu4i7k55hl6t5',
          userID: 2,
          date: '2020/01/24',
          roomNumber: 5,
          roomServiceCharges: []
        },
        {
          id: '5fwrgu4i7k55hl6t6',
          userID: 3,
          date: '2020/01/10',
          roomNumber: 6,
          roomServiceCharges: []
        }
      ],
      '2020/01/13');

  })

  describe('default properties of customer', () => {

    it('should be an object', () => {
      expect(customer).to.be.a('object');
    })

    it('should be an instance of a Customer', () => {
      expect(customer).to.be.an.instanceof(Customer);
    })

    it('should have an id', () => {
      expect(customer.id).to.equal(2);
    })

    it('should have a name', () => {
      expect(customer.name).to.equal('Rocio Schuster');
    })

    it('should have a date', () => {
      expect(customer.currentDate).to.equal('2020/01/12');
    })

    it('total spent should start at 0', () => {
      expect(customer.totalSpent).to.equal(0);
    })

    it('should start with no bookings', () => {
      expect(customer.allBookings.length).to.equal(0);
    })

    it('should start with no available rooms', () => {
      expect(customer.availableRooms.length).to.equal(0);
    })

    it('should be able to hold a search date', () => {
      expect(customer.searchDate).to.equal('2020/01/12');
    })

    // the following methods are tested in chai-spies.js
    // customer.AddAvailableCabinsToBookingSearch()
    // customer.checkForFilters()

    describe('findAllBookings', () => {

      it('should be able to find all bookings they have', () => {
        expect(customer.allBookings.length).to.equal(0);
        customer.findAllBookings(hotel)
        expect(customer.allBookings.length).to.equal(1);
      })

    })

    describe('calculateTotalSpent', () => {

      it('should be able to calculate total spent', () => {
        expect(customer.totalSpent).to.equal(0);
        customer.calculateTotalSpent(hotel);
        expect(customer.totalSpent).to.equal('477.38');
      })

    })

    describe('clearOutAvailableRooms', () => {

      it('should be able to clear out available rooms', () => {
        customer.availableRooms.push({
            number: 4,
            roomType: 'residential suite',
            bidet: true,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 358.4
          })
        expect(customer.availableRooms.length).to.equal(1);
        customer.clearOutAvailableRooms();
        expect(customer.availableRooms.length).to.equal(0);
      })

    });

  });

});
