const chai = require("chai");
const expect = chai.expect;
import Hotel from '../src/hotel';

describe('Hotel', () => {
  let hotel;

  beforeEach(() => {
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
          date: '2020/01/13',
          roomNumber: 6,
          roomServiceCharges: []
        }
      ],
      '2020/01/13');
    });

  describe('default properties for hotel', () => {

    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    })

    it('should be an instance of a Hotel', () => {
      expect(hotel).to.be.an.instanceof(Hotel);
    })

    it('should have users', () => {
      expect(hotel.allUsers.length).to.equal(3);
    })

    it('should have rooms', () => {
      expect(hotel.rooms.length).to.equal(3);
    })

    it('should have bookings', () => {
      expect(hotel.bookings.length).to.equal(3);
    })

    it('should hold current date', () => {
      expect(hotel.date).to.equal('2020/01/13');
    })

    it('should start with no rooms booked today', () => {
      expect(hotel.roomsBookedToday.length).to.equal(0);
    })

    it('should start with no rooms available today', () => {
      expect(hotel.roomsAvailableToday.length).to.equal(0);
    })

    it('should start with total occupancy of 0', () => {
      expect(hotel.totalOccupancy).to.equal(0);
    })

    describe('setBookings', () => {

      it('should be able to update bookings', () => {
        expect(hotel.bookings.length).to.equal(3);
        hotel.setBookings([{
          id: '5fwrgu4i7k55hl6t6',
          userID: 3,
          date: '2020/01/10',
          roomNumber: 6,
          roomServiceCharges: []
        }])
        expect(hotel.bookings.length).to.equal(1);
      })

    })

    describe('findRoomsAvailableToday', () => {

      it('should be able to find rooms available today', () => {
        expect(hotel.roomsAvailableToday.length).to.equal(0);
        hotel.findTodaysBookings()
        hotel.findRoomsAvailableToday()
        expect(hotel.roomsAvailableToday.length).to.equal(2);
      })

    })

    describe('findTodaysBookings', () => {

      it('should be able to find todays bookings', () => {
        expect(hotel.roomsBookedToday.length).to.equal(0);
        hotel.findTodaysBookings()
        expect(hotel.roomsBookedToday.length).to.equal(1);
      })

    })

    describe('calculateTotalOccupancy', () => {

      it('should be able to calculate todays total occupancy', () => {
        expect(hotel.roomsBookedToday.length).to.equal(0);
        hotel.findTodaysBookings();
        expect(hotel.roomsBookedToday.length).to.equal(1);
        hotel.calculateTotalOccupancy();
        expect(hotel.totalOccupancy).to.equal(4);

      })

    });

  });

});
