# :package: Boxinator :postbox:

A client application designed for creating orders and calculationg costs for mystery boxes to be shipped around the world. This project was built with React, JavaScript and CSS, and using [Keycloak](https://www.keycloak.org/) for authorization.

### :woman_technologist: Team members

[Kristin](https://github.com/kikkipedia), [Adam](https://github.com/Adamjohansson123), [Luis](https://github.com/lfgn84) & [Daniel](https://github.com/Dandandumdum)

## About this project

This was a 4 weeks long project built by candidates at Experis Academy for the Full-stack Programming short course. Project goal was to produce a software solution for a given case called Boxinator - an application designed for calculationg the shipping cost for mystery boxes to specific locations around the world. This repository contains only the front-end application. The project also includes a server application to be found at [GitHub: Boxinator backend](https://github.com/kikkipedia/Boxinator-backend) . A full working application is deployed at [https://boxinator-frontend1.herokuapp.com/](https://boxinator-frontend1.herokuapp.com/)

## Project Screen shots

### Landing component
![image](/resources/Start.png)

### User component with orders and shipment status
![image](/resources/UserHome.png)

### Modal for ordering a mystery box
![image](/resources/UserOrderModal.png)

## Installation and setup

Clone this repository. You will need `node` and `npm` installed globally on your machine. 

Then in the project directory, run `npm install`

Run `npm start` in the project directory. This will the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## General functionality

**User**
- Users are authenticated via [Keycloak](https://www.keycloak.org/) using JWT tokens and redirected to User page
- A new user is saved in database at first login after registration
- Create a new order and see all orders with current shipment status
- Cancel an order in transit
- Edit profile

**Guest**
- Visitors that are not logged in can create an order aved to the database with an email address
- Need to register for order to be shipped

**Admin**
- Administrators are authenticated via [Keycloak](https://www.keycloak.org/) using JWT tokens and redirected to Admin page
- See all orders
- Change shipment status
- Change shipment price (aka price manipulator)
