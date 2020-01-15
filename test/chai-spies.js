import chai from 'chai';
import $ from 'jquery'
import Customer from '../src/customer'
import Manager from '../src/manager'
const expect = chai.expect;
const spies = require('chai-spies');

chai.use(spies);

let customer = new Customer(2, 'Rocio Schuster', '2020/01/12');
let manager = new Manager('manager', '2020/01/13');

describe('customer', () => {

  chai.spy.on(customer, ['addAvailableCabinsToBookingSearch'], () => true);
  it('should invoke addAvailableCabinsToBookingSearch', () => {
    expect(customer.addAvailableCabinsToBookingSearch()).to.equal(true);
  });

  chai.spy.on(customer, ['checkForFilters'], () => true);
  it('should invoke checkForFilters', () => {
    expect(customer.checkForFilters()).to.equal(true);
  });

});

describe('manager', () => {

  chai.spy.on(manager, ['instantiateCustomerFromSearch'], () => true);
  it('should invoke instantiateCustomerFromSearch', () => {
    expect(manager.instantiateCustomerFromSearch()).to.equal(true);
  });

});
