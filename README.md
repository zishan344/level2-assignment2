# level2-assignment2

## Overview

Hi, In this Api we make a simple crud operation. use MongoDB database with Mongoose, validate all data with zod token, and encrypt password with bcrypt npm package. In this API we create a user, update the user, get the all user if we want to look specific user we can get this user with userid and also user can delete her profile with userid, The user can keep her order we are making an order create endpoint, get the order with userid, and how much price total order we calculate and return it also.

## Contents

- [Endpoints](#endpoints)

### Endpoints

it's main point https://level2-assignment2-zeta.vercel.app

- create user : Post /api/users
- get all User : GET /api/users
- get single User with userid :GET /api/users/:userid (example:/api/users/1 )
- update User with userid : PUT /api/users/:userid (example:/api/users/1 )
- delete user with userid :DELETE /api/users/:userid (example:/api/users/1 )
- create order in user : PUT /api/users/:userId/orders (example:/api/users/1/orders )
- get order in user with userid :GET /api/users/:userId/orders (example:/api/users/1/orders )
- get calculate total order price in single user :GET /api/users/:userid/orders/total-price (example:/api/users/1/orders/total-price )
