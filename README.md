# Cabin in the Woods
a cozy series of cabins for managers and customers

### Introduction
This was my last solo project from Mod2 at Turing School of Software & Design. I had seven days to build the app. It is a dashboard interface that allows either a customer to log in or a manager. If logged in as one of 50 customers, the user has the ability to view their past and future bookings, total spent, todays date, and search through availability filters to select a cabin to request a reservation. If logged in as a manager, the user may view the total occupancy, todays date, total revenue for the day, and search for a specific customer by name. Once a customer is selected, the manager may see all their bookings, delete their bookings, or make a new booking for the selected guest.

The app worked by fetching room, user, and booking information from an API on Heroku. The app also utilized the `fetch()` function to make post requests for new bookings as well as delete bookings. A testing suite was also created to accurately test each class (hotel, customer, manager) and all their methods.


### Screenshots
![screenshot 1](https://user-images.githubusercontent.com/53405028/72434146-207e0180-3758-11ea-9564-629fc74304b0.png)

![screenshot 2](https://user-images.githubusercontent.com/53405028/72434172-2ecc1d80-3758-11ea-8c34-165685b51b95.png)

![screenshot 3](https://user-images.githubusercontent.com/53405028/72434187-38558580-3758-11ea-8226-0fa9365c787c.png)

![screenshot 4](https://user-images.githubusercontent.com/53405028/72434201-3ee3fd00-3758-11ea-9e5c-181be0eaf5f5.png)

### Directions for Use
- There are 50 different customer profiles that can be logged in.
- Use the usernames range from `customer1` through `customer50`.
- The username to log in as a manager is `manager`.
- The password for all customers and managers is `overlook2019`.

### Project Learning Goals  
  1. Write a program from scratch
  2. Synthesize knowledge of OOP, classes, and JS fundamentals to create a playable game
  3. Demonstrate good GitHub collaboration and workflow within a large group
  4. Write modular, reusable code that follows SRP (Single Responsibility Principle)
  5. Create a robust test suite that thoroughly tests all functionality of a client-side application
  6. Implement array iterator and mutator methods to work with game data

### Technologies Used
- HTML
- CSS & SASS
- vanilla JavaScript
- jQuery
- NPM
- Chai Spies
- WebPack

### How to run on a local machine
1. clone down the repo to desired location
2. cd to the directory where you cloned the repo
3. run `npm install`
4. run `npm start`
5. look for text "project is running at `http://localhost...`" and copy this url address
6. open your browser and paste the live server URL into the address bar
7. May the Force be with You!

### This project was created solely by:
Zachary Nemeroff https://github.com/ZaneMeroff
