const chai = require("chai");
const expect = chai.expect;
import Customer from './src/customer';

describe('Customer', () => {
  let customer1;

  beforeEach(() => {
    customer1 = new Customer(10, 'Tony Armstrong');
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Customer).to.be.a('function');
    })

    it('should be an instance of a Game', () => {
      expect(customer1).to.be.an.instanceof(Customer);
    })

    it('should have an id', () => {
      expect(customer1.id).to.equal(10);
    })

    it('should have a name', () => {
      expect(customer1.name).to.equal('Tony Armstrong');
    })

    it('should start with no upcomingBookings', () => {
      expect(customer1.upcomingBookings).to.equal(null);
    })

  });

});
