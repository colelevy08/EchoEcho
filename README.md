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
[Database Schema](https://dbdiagram.io/d/64a2f12702bd1c4a5e6ce584)

![Database Schema](https://github.com/username/project/assets/schema.png)

## Wireframe:
[Wireframe](https://www.figma.com/file/MbtQ6o1dWaNJ3pyvm4vRBV/EchoEcho?type=whiteboard&node-id=0%3A1&t=4OYjARU12DI)

![Wireframe](https://github.com/username/project/assets/wireframe.png)

## API Routes:

| Route              | Method | Body         | Response                 | Explanation                                        |
|--------------------|--------|--------------|--------------------------|----------------------------------------------------|
| /signup            | POST   | form or json |  [{user schema}], 200    | Creates a new user when  they signup.              |
| /login             | POST   | form or json | {User schema}, 200       | Logs user into app.                                |
| /users             | GET    | none         | [{User schema}], 200     | Displays all users + "mom life" and "interests" tables |
| /users/id          | PATCH  | form or json | {User schema},200        | Allows user to update/change their  information    |
|                    | DELETE | none         | {}, 204                  | Allows user to delete their profile                |
| /friendship_status | GET    | none         | [{friendship_status schema}], 200 | Displays friends with 'matched' status             |
|                    | PATCH  | form or json | {friendship_status schema} | Changes friends status from 'pending' to 'matched' |
|                    | DELETE | none         |                          | Deletes friend                                     |
| /friendship        | POST   | form or json | {friendship_status schema} | Connection to new user                           |
| /messages/id       | GET    | none         | [{Messages schema}], 200 | Retrieves all of user's messages                   |
|                    | DELETE | none         | {}, 204                  |                                                    |
| /messages/user     | GET    | none         | [{Messages schema}], 200 | Retrieves messages for specific recipient user     |
| /messages          | POST   | form or json | {Messages schema}, 200   | New message is created                             |

## Component Tree:

![Component Tree](https://github.com/username/project/assets/component_tree.png)

## Client-side Routes:

| Route          | Component       | Description                                                                                                             |
|----------------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| /welcome       | WelcomePage.js  | Welcome page for users to signup or login                                                                               |
| /signup        | SignupForm.js   | Contains form to signup and gain access to app                                                                          |
| /login         | LoginForm.js    | Login page                                                                                                              |
| /home          | Home.js         | Shows list of potential friend matches for user to view, filter                                                         |
| /interested    | PendingList.js  | Shows list of users who are interested in being user's friend (User has not matched with them yet) - filtered by status |
| /friends       | FriendsList.js  | Shows list of user's friends they have been matched with - filtered by status                                           |
| /messages      | MessagesList.js | Shows list of all conversations user has with other users/friends                                                       |
| /messages/user | Conversation.js | Shows conversation between user and another user                                                                        |

## Trello Board
![Trello Board](https://github.com/username/project/assets/trello_board.png)
