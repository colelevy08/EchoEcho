# EchoEcho: The Ultimate Digital Hub for Vinyl Record Enthusiasts

Welcome to EchoEcho, the ultimate social media platform engineered exclusively for the vibrant community of music lovers and vinyl record connoisseurs. EchoEcho harmoniously combines the engaging aspects of social media platforms such as Instagram or TikTok, with the market dynamics of eBay or Depop, focusing solely on music-centric interactions and transactions. It's a digital hub where users can flaunt their cherished record collections, musician equipment, exhilarating live concert experiences, and tribute band performances, as well as trade, buy, and sell records, music gear, and even live event tickets. Become part of the EchoEcho community and forge connections with fellow music aficionados, record collectors, and music gurus worldwide.

## What's EchoEcho for?:
- Buy, sell, and trade records and music equipment
- Share your music, music equipment, or music experiences with like minded music gurus
- Find potential music-friends in your area
- Interact with user profiles to find out if you are a music-match!
- Message new friends and people selling music equipment

## Features:
- **Marketplace**: Buy, sell, and trade records, music equipment, and live event tickets.
- **Social Interaction**: Share your music collection, find potential music-friends, and interact with user profiles to find your music-match.
- **Reviews and Likes**: Leave reviews on albums, equipment, or live performances, and like or unlike products.
- **Customizable Profiles**: Customize your profile with your interests and update it later.
- **Search Functionality**: Search for specific users, albums, and music equipment.


## Strech Goals
- Users can buy and sell live event tickets
- Videos shared from the same venue on the same date are automatically grouped with a # for easy playback of your favorite musicians live performances
- Users can follow people and share other data/information
- Users can customize their profiles with their own interests and update their profiles later.
- Search for specific users, ablums, and music equipment.




## Tech Stack:

[![My Skills](https://skillicons.dev/icons?i=js,py,flask,react,vite)](https://skillicons.dev)

## Schema:
![Database Schema](https://github.com/colelevy08/EchoEcho/issues/5#issue-1794834916)

## Wireframe:


# API Routes:

| Route                     | Method | Body         | Response                 | Explanation                                                     |
|---------------------------|--------|--------------|--------------------------|-----------------------------------------------------------------|
| /users                    | GET    | None         | [{User schema}], 200     | Retrieves all users.                                            |
| /users/{id}               | GET    | None         | {User schema}, 200       | Retrieves a specific user by ID.                                |
| /users/current-user       | GET    | None         | {User schema}, 200       | Retrieves the current logged-in user's profile.                 |
| /signup                   | POST   | {username, email, password, first_name, last_name, shipping_address} as JSON | {User schema}, 201 | Creates a new user when they sign up.                          |
| /login                    | POST   | {email, password} as JSON       | {User schema}, 200       | Logs the user into the app.                                     |
| /logout                   | GET    | None         | {}, 200                  | Logs the user out of the app.                                   |
| /users/{id}               | PUT    | {username, email, password} as JSON | {User schema}, 200   | Updates the current user's profile.                             |
| /products                 | GET    | None         | [{Product schema}], 200  | Retrieves all products.                                         |
| /products/{id}            | GET    | None         | {Product schema}, 200    | Retrieves a specific product by ID.                             |
| /products                 | POST   | {name, description, price} as JSON | {Product schema}, 201 | Adds a new product.                                             |
| /products/{id}/like       | POST   | None         | {}, 200                  | Likes a specific product.                                       |
| /products/{id}/unlike     | POST   | None         | {}, 200                  | Unlikes a specific product.                                     |
| /user/{userId}/likes      | GET    | None         | [{Product schema}], 200  | Retrieves all products liked by a specific user.                |
| /products/{id}            | PATCH  | {name, description, price} as JSON | {Product schema}, 200   | Updates a specific product's details.                           |
| /products/{id}            | DELETE | None         | {}, 204                  | Deletes a specific product.                                     |
| /orders                   | GET    | None         | [{Order schema}], 200    | Retrieves all orders.                                           |
| /orders/{id}              | GET    | None         | {Order schema}, 200      | Retrieves a specific order by ID.                               |
| /orders                   | POST   | {product_id, quantity, shippingAddress, userId} as JSON | {Order schema}, 201   | Creates a new order.                                            |
| /orders/{id}              | PUT    | {productIds, quantities, shippingAddress} as JSON | {Order schema}, 200   | Updates a specific order's details.                             |
| /orders/{id}              | DELETE | None         | {}, 204                  | Deletes a specific order.                                       |
| /products/{productId}/likes| GET   | None         | [{User schema}], 200     | Retrieves all likes for a specific product.                     |
| /reviews                  | POST   | {productId, userId, comment, rating, date_posted} as JSON | {Review schema}, 201 | Creates a new review.                                           |
| /reviews                  | GET   | None         | [{Review schema}], 200   | Retrieves all reviews.                                          |
| /products                 | GET   | None         | [{Product schema}], 200  | Retrieves all available products.                               |

# Component Tree:

# API Routes:

| Route                     | Method | Body         | Response                 | Explanation                                                     |
|---------------------------|--------|--------------|--------------------------|-----------------------------------------------------------------|
| `/users`                    | GET    | None         | [{User schema}], 200     | Retrieves all users.                                            |
| `/users/{id}`               | GET    | None         | {User schema}, 200       | Retrieves a specific user by ID.                                |
| `/users/current-user`       | GET    | None         | {User schema}, 200       | Retrieves the current logged-in user's profile.                 |
| `/signup`                   | POST   | {username, email, password, first_name, last_name, shipping_address} as JSON | {User schema}, 201 | Creates a new user when they sign up.                          |
| `/login`                    | POST   | {email, password} as JSON       | {User schema}, 200       | Logs the user into the app.                                     |
| `/logout`                   | GET    | None         | {}, 200                  | Logs the user out of the app.                                   |
| `/users/{id}`               | PUT    | {username, email, password} as JSON | {User schema}, 200   | Updates the current user's profile.                             |
| `/products`                 | GET    | None         | [{Product schema}], 200  | Retrieves all products.                                         |
| `/products/{id}`            | GET    | None         | {Product schema}, 200    | Retrieves a specific product by ID.                             |
| `/products`                 | POST   | {name, description, price} as JSON | {Product schema}, 201 | Adds a new product.                                             |
| `/products/{id}/like`       | POST   | None         | {}, 200                  | Likes a specific product.                                       |
| `/products/{id}/unlike`     | POST   | None         | {}, 200                  | Unlikes a specific product.                                     |
| `/user/{userId}/likes`      | GET    | None         | [{Product schema}], 200  | Retrieves all products liked by a specific user.                |
| `/products/{id}`            | PATCH  | {name, description, price} as JSON | {Product schema}, 200   | Updates a specific product's details.                           |
| `/products/{id}`            | DELETE | None         | {}, 204                  | Deletes a specific product.                                     |
| `/orders`                   | GET    | None         | [{Order schema}], 200    | Retrieves all orders.                                           |
| `/orders/{id}`              | GET    | None         | {Order schema}, 200      | Retrieves a specific order by ID.                               |
| `/orders`                   | POST   | {product_id, quantity, shippingAddress, userId} as JSON | {Order schema}, 201   | Creates a new order.                                            |
| `/orders/{id}`              | PUT    | {productIds, quantities, shippingAddress} as JSON | {Order schema}, 200   | Updates a specific order's details.                             |
| `/orders/{id}`              | DELETE | None         | {}, 204                  | Deletes a specific order.                                       |
| `/products/{productId}/likes`| GET   | None         | [{User schema}], 200     | Retrieves all likes for a specific product.                     |
| `/reviews`                  | POST   | {productId, userId, comment, rating, date_posted} as JSON | {Review schema}, 201 | Creates a new review.                                           |
| `/reviews`                  | GET   | None         | [{Review schema}], 200   | Retrieves all reviews.                                          |
| `/products`                 | GET   | None         | [{Product schema}], 200  | Retrieves all available products.                               |

## Client-Side Routes:

| Route                     | Component       | Description                                                                                                             |
|---------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| `/`                       | HomePage.js     | Landing page for users to sign up or log in.                                                                             |
| `/dashboard`              | Dashboard.js    | User dashboard displaying user information and navigation to other features.                                             |
| `/login`                  | LoginForm.js    | Form for user login.                                                                                                    |
| `/signup`                 | SignupForm.js   | Form for user signup.                                                                                                   |
| `/products`               | ProductList.js  | List of all products in the marketplace.                                                                                |
| `/products/new`           | ProductForm.js  | Form for creating a new product.                                                                                        |
| `/products/:id`           | ProductDetail.js| Detailed view of a specific product.                                                                                    |
| `/orders`                 | OrderList.js    | List of all orders made by the user.                                                                                    |
| `/orders/new`             | OrderForm.js    | Form for creating a new order.                                                                                          |
| `/reviews`                | ReviewList.js   | Shows a list of all reviews in the app.                                                                                 |
| `/reviews/new`            | ReviewForm.js   | Form for creating a new review.                                                                                         |
| `/users`                  | UserList.js     | Shows a list of all users in the app.                                                                                   |
| `/users/new`              | UserForm.js     | Form for creating a new user profile.                                                                                   |
| `/users/:id`              | UserDetail.js   | Shows the details of a specific user profile.                                                                           |


## How to run the app locally:

### Prerequisites:
- **Python 3.x**: Make sure you have Python 3.x installed on your system.
- **Node.js**: Ensure Node.js is installed.

### Backend Setup (located in the `server` directory):
1. **Install Virtual Environment**: Create a virtual environment using `virtualenv` or any other virtual environment tool.
2. **Activate Virtual Environment**: Activate the virtual environment.
3. **Install Dependencies**: Run `pip install -r requirements.txt` to install the required Python packages. If there's no `requirements.txt`, you can generate it from the `Pipfile` and `Pipfile.lock` using `pipenv lock -r > requirements.txt`.
4. **Run the Server**: Start the Flask server by running `python app.py`.

### Frontend Setup (located in the `my-app` directory):
1. **Install Dependencies**: Run `npm install` to install the required Node.js packages.
2. **Start the Development Server**: Run `npm start` to start the development server.

### Libraries to Install:
#### Backend:
- Flask
- SQLAlchemy
- Other dependencies as listed in `Pipfile` or `requirements.txt`.

#### Frontend:
- React
- Webpack
- Other dependencies as listed in `package.json`.

### Additional Notes:
- Make sure to follow any specific instructions or configurations mentioned in the `webpack.config.js` for the frontend.
- Check the `app.py`, `models.py`, and `routes.py` files in the `server` directory for any specific configurations or environment variables that need to be set for the backend.

By following these instructions, you should be able to run the app locally. If you encounter any issues, please refer to the specific files mentioned above or consult the documentation in the repository.



