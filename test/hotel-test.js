const chai = require("chai");
const expect = chai.expect;
import Hotel from './src/hotel';

describe('Hotel', () => {
  let hotel1;

  beforeEach(() => {
    hotel1 = new Hotel(____);
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Hotel).to.be.a('function');
    })

    it('should be an instance of a Hotel', () => {
      expect(hotel1).to.be.an.instanceof(Hotel);
    })

    it('should have users', () => {
      expect(hotel1.users).to.equal(______);
    })

    it('should have bookings', () => {
      expect(hotel1.bookings).to.equal(______);
    })

    it('should have rooms', () => {
      expect(hotel1.rooms).to.equal(______);
    })

    it('should have a currentUser', () => {
      expect(hotel1.currentUser).to.equal(______);
    })

    it('should have todays date', () => {
      expect(hotel1.date).to.equal(______);
    })

  });

});
