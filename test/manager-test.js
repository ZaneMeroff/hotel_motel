const chai = require("chai");
const expect = chai.expect;
import Customer from './src/customer';
import Manager from './src/manager';

describe('Manager', () => {
  let manager1;

  beforeEach(() => {
    manager1 = new Manager(99, 'Bob Hope');
  })

  describe('default properties', () => {

    it('should be a function', () => {
      expect(Manager).to.be.a('function');
    })

    it('should be an instance of a Manager', () => {
      expect(manager1).to.be.an.instanceof(Manager);
    })

    it('should have an id', () => {
      expect(manager1.id).to.equal(99);
    })

    it('should have a name', () => {
      expect(manager1.name).to.equal('Bob Hope');
    })

  });

});
