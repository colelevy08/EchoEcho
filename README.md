# EchoEcho: The Ultimate Digital Hub for Vinyl Record Enthusiasts

Welcome to EchoEcho, the ultimate social media platform engineered exclusively for the vibrant community of music lovers and vinyl record connoisseurs. EchoEcho harmoniously combines the engaging aspects of social media platforms such as Instagram or TikTok, with the market dynamics of eBay or Depop, focusing solely on music-centric interactions and transactions. It's a digital hub where users can flaunt their cherished record collections, musician equipment, exhilarating live concert experiences, and tribute band performances, as well as trade, buy, and sell records, music gear, and even live event tickets. Become part of the EchoEcho community and forge connections with fellow music aficionados, record collectors, and music gurus worldwide.

## What's EchoEcho for?:
- Buy, sell, and trade records and music equipment
- Share your music, music equipment, or music experiences with like minded music gurus
- Find potential music-friends in your area
- Interact with user profiles to find out if you are a music-match!
- Message new friends and people selling music equipment

## Features
- Upon opening the app, the user will be greeted with a welcome screen where they can either sign up or log in.
- Users can customize their profiles with their own interests and update their profiles later.
- Users can view a list of potential friends who have positively interacted with their profile but have not 'matched'.
- Users can view a list of 'matches' (friends list) and delete friends.
- Users can send messages to their friends.
- Leave a review on a certain album, piece of equipment, or live performance
- Users can "create a marketplace" and sell there music equipment, or buy from others marketplaces
- Search for specific users, ablums, and music equipment.

## Strech Goals
- Users can buy and sell live event tickets
- Videos shared from the same venue on the same date are automatically grouped with a # for easy playback of your favorite musicians live performances


## Tech Stack:

[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite)](https://skillicons.dev)

## Schema:
![Database Schema](https://github.com/colelevy08/EchoEcho/issues/5#issue-1794834916)

## Wireframe:


## API Routes:

| Route                     | Method | Body         | Response                 | Explanation                                                     |
|---------------------------|--------|--------------|--------------------------|-----------------------------------------------------------------|
| /users                    | GET    | None         | [{User schema}], 200     | Retrieves all users.                                            |
| /users/{id}               | GET    | None         | {User schema}, 200       | Retrieves a specific user's profile.                            |
| /users/current-user       | GET    | None         | {User schema}, 200       | Retrieves the current logged-in user's profile.                 |
| /signup                   | POST   | {username, email, password} as JSON | {User schema}, 201 | Creates a new user when they sign up.                          |
| /login                    | POST   | {email, password} as JSON       | {User schema}, 200       | Logs the user into the app.                                     |
| /logout                   | GET    | None         | {message: 'Logged out'}, 200 | Logs the user out of the app.                                  |
| /users/{id}               | PATCH  | {username, email, password} as JSON | {User schema}, 200   | Updates the current user's profile.                             |
| /products                 | GET    | None         | [{Product schema}], 200  | Retrieves all products.                                         |
| /products/{id}            | GET    | None         | {Product schema}, 200    | Retrieves a specific product's details.                         |
| /products                 | POST   | {name, description, price} as JSON | {Product schema}, 201 | Adds a new product.                                             |
| /products/{id}/like       | POST   | None         | {message: 'Product liked'}, 200 | Likes a specific product.                                     |
| /products/{id}/unlike     | POST   | None         | {message: 'Product unliked'}, 200 | Unlikes a specific product.                                   |
| /users/{id}/likes         | GET    | None         | [{Product schema}], 200  | Retrieves all products liked by a specific user.                |
| /products/{id}/likes      | GET    | None         | [{User schema}], 200     | Retrieves all users who liked a specific product.               |
| /products/{id}/reviews    | GET    | None         | [{Review schema}], 200   | Retrieves all reviews for a specific product.                   |
| /marketplace              | GET    | None         | [{Product schema}], 200  | Retrieves all products in the marketplace.                      |
| /reviews                  | GET    | None         | [{Review schema}], 200   | Retrieves all reviews.                                          |
| /orders                   | GET    | None         | [{Order schema}], 200    | Retrieves all orders.                                            |
| /marketplace/{id}         | GET    | None         | {Product schema}, 200    | Retrieves a specific product's details.                         |
| /marketplace/{id}         | PATCH  | {name, description, price} as JSON | {Product schema}, 200   | Updates a specific product's details.                           |
| /marketplace/{id}         | DELETE | None         | {}, 204                  | Deletes a specific product.                                     |
| /orders/{id}              | GET    | None         | {Order schema}, 200      | Retrieves a specific order's details.                           |
| /orders                   | POST   | {product_id, quantity} as JSON | {Order schema}, 201   | Creates a new order.                                            |
| /reviews                  | POST   | {user_id, product_id, body, rating} as JSON | {Review schema}, 201 | Creates a new review.                                    |
| /reviews/{id}             | GET    | None         | {Review schema}, 200     | Retrieves a specific review.                                    |
| /reviews/{id}             | PATCH  | {body, rating} as JSON   | {Review schema}, 200     | Updates a specific review.                                      |
| /reviews/{id}             | DELETE | None         | {}, 204                  | Deletes a specific review.                                      |
| /search                   | POST   | {query} as JSON | Various, 200             | Searches for users, products, orders, or reviews.               |

## Component Tree:

## Client-Side Routes:

| Route                     | Component       | Description                                                                                                             |
|---------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| /                         | HomePage.js     | Landing page for users to sign up or log in.                                                                             |
| /dashboard                | Dashboard.js    | User dashboard displaying user information and navigation to other features.                                              |
| /login                    | LoginForm.js    | Form for user login.                                                                                                    |
| /signup                   | SignupForm.js   | Form for user signup.                                                                                                   |
| /products                 | ProductList.js  | List of all products in the marketplace.                                                                                |
| /products/new             | ProductForm.js  | Form for creating a new product.                                                                                        |
| /products/:id             | ProductDetail.js| Detailed view of a specific product.                                                                                    |
| /orders                   | OrderList.js    | List of all orders made by the user.                                                                                     |
| /orders/new               | OrderForm.js    | Form for creating a new order.                                                                                           |
| /reviews                  | ReviewList.js   | Shows a list of all reviews in the app.                                                                                 |
| /reviews/new              | ReviewForm.js   | Form for creating a new review.                                                                                          |
| /users                    | UserList.js     | Shows a list of all users in the app.                                                                                    |
| /users/new                | UserForm.js     | Form for creating a new user profile.                                                                                    |
| /users/:id                | UserDetail.js   | Shows the details of a specific user profile.                                                                            |

## How to run the app locally:

### Prerequisites:

- Python 3.x
- Node.js

