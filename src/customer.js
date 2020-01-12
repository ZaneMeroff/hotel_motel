import $ from 'jquery';

class Customer {
  constructor(id, name, data, date) {
     this.id = id;
     this.name = name;
     this.data = data;
     this.currentDate = date;
     this.totalSpent = 0;
     this.allBookings = [];
   }

   findAllBookings() {
     let bookings = this.data.bookingData.filter(booking => {
       return booking.userID === this.id
     })
     this.allBookings = bookings;
     this.totalSpent = this.calculateTotalSpent();
   }

   calculateTotalSpent() {
     let number = this.data.roomData.reduce((acc, room) => {
       this.data.bookingData.forEach(booking => {
         if (booking.roomNumber === room.number && booking.userID === this.id) {
           acc += room.costPerNight;
         }
       })
       return acc;
     },0)
     return number.toFixed(2);
   }




}









export default Customer;
