# EchoEcho: The Ultimate Digital Hub for Vinyl Record Enthusiasts

Welcome to EchoEcho, the ultimate social media platform engineered exclusively for the vibrant community of music lovers and vinyl record connoisseurs. EchoEcho harmoniously combines the engaging aspects of social media platforms such as Instagram or TikTok, with the market dynamics of eBay or Depop, focusing solely on music-centric interactions and transactions. It's a digital hub where users can flaunt their cherished record collections, musician equipment, exhilarating live concert experiences, and tribute band performances, as well as trade, buy, and sell records, music gear, and even live event tickets. Become part of the EchoEcho community and forge connections with fellow music aficionados, record collectors, and music gurus worldwide.

## What's EchoEcho for?:
- Find potential music-friends in your area
- Interact with user profiles to find out if you are a music-match!
- Message new friends

## Features
- Upon opening app, user will be greeted with welcome screen where they can either Signup or Login.
- User can customize profile with their own interests and update their profile later
- User can search through profiles of other users and select either 'thumbs up' or 'thumbs down'
- User can view list of potential friends who have positively interacted with user's profile but have not 'matched'
- User can view list of 'matches' (friend's list) as well as delete friend. 
- User can send messages to friends.

## Tech Stack:

[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite)](https://skillicons.dev)

## Schema:
[Database Schema](https://dbdiagram.io/d/64a9138c02bd1c4a5eb655f4)

![Database Schema](hhttps://github.com/colelevy08/EchoEcho/issues/5#issue-1794834916)

## Wireframe:
[Wireframe](https://www.figma.com/file/MbtQ6o1dWaNJ3pyvm4vRBV/EchoEcho?type=whiteboard&node-id=0%3A1&t=4OYjARU12DI)

![Wireframe](https://github.com/username/project/assets/wireframe.png)

## API Routes:

| Route                     | Method | Body         | Response                 | Explanation                                                     |
|---------------------------|--------|--------------|--------------------------|-----------------------------------------------------------------|
| /auth/signup              | POST   | form or json | {user schema}, 201       | Creates a new user when they signup.                            |
| /auth/login               | POST   | form or json | {User schema}, 200       | Logs user into app.                                             |
| /users                    | GET    | none         | [{User schema}], 200     | Retrieves all users.                                            |
| /users/id                 | GET    | none         | {User schema}, 200       | Retrieves a specific user's profile.                            |
| /users/id                 | PATCH  | form or json | {User schema}, 200       | Allows user to update/change their information.                 |
| /users/id                 | DELETE | none         | {}, 204                  | Allows user to delete their profile.                            |
| /users/id/friends         | GET    | none         | [{Friendship schema}], 200| Retrieves user's friends.                                       |
| /users/id/friends         | POST   | form or json | {Friendship schema}, 201 | Adds a friend to user's friend list.                            |
| /users/id/friends/friend_id| DELETE| none         | {}, 204                  | Removes a friend from user's friend list.                       |
| /users/id/messages        | GET    | none         | [{Message schema}], 200  | Retrieves all of user's messages.                               |
| /users/id/messages        | POST   | form or json | {Message schema}, 201   | Send a new message from the user.                               |
| /users/id/messages/message_id | DELETE | none      | {}, 204                  | Delete a specific message from the user.                        |
| /marketplace              | GET    | none         | [{Product schema}], 200  | Retrieves all available products.                               |
| /marketplace/id           | GET    | none         | {Product schema}, 200    | Retrieves a specific product's details.                         |
| /marketplace              | POST   | form or json | {Product schema}, 201   | Adds a new product.                                             |
| /marketplace/id           | PATCH  | form or json | {Product schema}, 200    | Updates a specific product's details.                           |
| /marketplace/id           | DELETE | none         | {}, 204                  | Deletes a specific product.                                     |
| /orders                   | GET    | none         | [{Order schema}], 200    | Retrieves all orders placed by the user.                        |
| /orders/id                | GET    | none         | {Order schema}, 200      | Retrieves a specific order's details.                           |
| /orders                   | POST   | form or json | {Order schema}, 201      | Creates a new order.                                            |
| /orders/id                | PATCH  | form or json | {Order schema}, 200      | Updates a specific order's details.                             |
| /orders/id                | DELETE | none         | {}, 204                  | Deletes a specific order.                                       |
| /reviews                  | GET    | none         | [{Review schema}], 200   | Retrieves all reviews.                                          |
| /reviews/id               | GET    | none         | {Review schema}, 200     | Retrieves a specific review.                                    |
| /reviews                  | POST   | form or json | {Review schema}, 201     | Creates a new review.                                           |
| /reviews/id               | PATCH  | form or json | {Review schema}, 200     | Updates a specific review.                                      |
| /reviews/id               | DELETE | none         | {}, 204                  | Deletes a specific review.                                      |
| /search                   | POST   | form or json | Various, 200             | Searches for users, products, orders, or reviews.               |

## Component Tree:

## Client-Side Routes:

| Route                     | Component       | Description                                                                                                             |
|---------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| /                         | HomePage.js     | Landing page for users to signup or login.                                                                               |
| /signup                   | SignupForm.js   | Contains form to signup and gain access to app.                                                                          |
| /login                    | LoginForm.js    | Login page.                                                                                                              |
| /home                     | Dashboard.js    | Dashboard for the user showing potential friends and product recommendations.                                           |
| /users/id                 | UserProfile.js  | Displays a specific user's profile.                                                                                      |
| /users/id/edit            | UserEditForm.js | Allows a user to update their profile.                                                                                   |
| /users/id/friends         | FriendsList.js  | Shows a user's list of friends.                                                                                          |
| /users/id/messages        | MessagesList.js | Shows all messages for the user.                                                                                         |
| /users/id/messages/new    | MessageForm.js  | Allows a user to send a new message.                                                                                     |
| /marketplace              | Marketplace.js  | Displays all products available in the marketplace.                                                                     |
| /marketplace/new          | ProductForm.js  | Allows a user to create a new product listing.                                                                           |
| /marketplace/id           | ProductDetails.js| Shows the details of a specific product.                                                                                 |
| /marketplace/id/edit      | ProductEditForm.js| Allows a user to update a specific product listing.                                                                      |
| /orders                   | UserOrders.js   | Shows all orders placed by the current user.                                                                             |
| /orders/new               | OrderForm.js    | Allows a user to place a new order.                                                                                      |
| /orders/id                | OrderDetails.js | Shows the details of a specific order placed by the current user.                                                        |
| /reviews                  | ReviewsList.js  | Shows all reviews.                                                                                                       |
| /reviews/new              | ReviewForm.js   | Allows a user to write a new review.                                                                                     |
| /reviews/id               | ReviewDetails.js| Shows the details of a specific review.                                                                                   |
| /reviews/id/edit          | ReviewEditForm.js| Allows a user to update a specific review.                                                                               |
| /search                   | SearchForm.js   | Allows a user to search for users, products, orders, or reviews.                                                         |
criteria.|


## Future Iterations:

1. **Music Recognition Feature**: Shazam-like functionality that allows users to identify songs from playing vinyl records and add them to a wishlist, which can then be shared with friends.

2. **In-app Virtual Turntable**: A feature that allows users to simulate playing a record, offering a visually appealing and interactive experience. 

3. **Live Concert Streaming**: Provide live streaming capabilities for bands and DJs to connect with the EchoEcho community. 

4. **Interactive Concert Map**: A feature to display live concerts and events in the user's area, incorporating an interactive map and calendar.

5. **Curation of Personalized Playlists**: The AI would learn the music preferences of the users and generate personalized playlists for them.


## Acknowledgements:
I would like to thank all contributors and the whole EchoEcho community for their unwavering support and commitment.
