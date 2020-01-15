const chai = require("chai");
const expect = chai.expect;
import Customer from '../src/customer';
import Manager from '../src/manager';

describe('Manager', () => {
  let manager;

  beforeEach(() => {
    manager = new Manager(0, 'manager');
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
      expect(manager.todaysDate).to.equal('2020/01/12');
    })

    it('should start with no managers customer', () => {
      expect(manager.managersCustomer).to.equal(null);
    })

    describe('calculateTodaysTotalRevenue', () => {

      it('should be able to calculate todays revenue', () => {
        expect(hotel.todaysTotalRevenue).to.equal(0);
        hotel.calculateTodaysTotalRevenue()
        expect(hotel.todaysTotalRevenue).to.equal(0);
      })

    });

    describe('instantiateCustomerFromSearch', () => {

      it('should be able to instantiate new customer', () => {
        expect(hotel.managersCustomer).to.equal(null);
        hotel.instantiateCustomerFromSearch()
        expect(hotel.managersCustomer).to.equal({});
      })

    });

  });

});
