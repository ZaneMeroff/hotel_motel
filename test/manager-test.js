const chai = require("chai");
const expect = chai.expect;
import Customer from '../src/customer';
import Manager from '../src/manager';
import Hotel from '../src/hotel'

describe('Manager', () => {
  let manager, hotel;

  beforeEach(() => {
    manager = new Manager('manager', '2020/01/13');
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
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Manager).to.be.a('function');
    })

    it('should be an instance of a Manager', () => {
      expect(manager).to.be.an.instanceof(Manager);
    })

    it('should have an id', () => {
      expect(manager.id).to.equal(0);
    })

    it('should have a name', () => {
      expect(manager.name).to.equal('manager');
    })

    it('should hold todays total revenue starting at 0', () => {
      expect(manager.todaysTotalRevenue).to.equal(0);
    })

    it('shold have todays date', () => {
      expect(manager.todaysDate).to.equal('2020/01/13');
    })

    it('should start with no managers customer', () => {
      expect(manager.managersCustomer).to.equal(null);
    })

    describe('calculateTodaysTotalRevenue', () => {

      it('should be able to calculate todays revenue', () => {
        expect(manager.todaysTotalRevenue).to.equal(0);
        manager.calculateTodaysTotalRevenue(hotel)
        expect(manager.todaysTotalRevenue).to.equal('491.14');
      })

    });

     // manager.instantiateCustomerFromSearch() is tested
     // in chai-spies.js

  });

});
