# Welcome to bw-anywhere-fitness-01 👋

### 🏠 [Homepage]()

### ✨ [Demo]()

[Alex Edwards, Alejandro-Vasquez CRUSHED THIS]

## Prerequisites

- node 14.16.0
- npm 6.14.11

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

Node Back-End - Build Week - bw-anywhere-fitness-01

[Endpoints] Base URL: https://bw-anywhere-fitness-01.herokuapp.com/api

This url will be the beginning of all endpoints. Add the following endpoints below to the base URL.
[Register]

No token is required when registering

Example: https://bw-anywhere-fitness-01.herokuapp.com/api/auth/register

    [POST] [Register] - Register a new user
        Endpoint: /auth/register

    Fields:
    "username" - string, unique (MUST not match any other registered username), REQUIRED
    "password" - string, REQUIRED
    "email": string, unique, REQUIRED
    "remaining_classes": integer, REQUIRED
    "role_id": integer, REQUIRED

[Login]

Token required for login

Example: https://bw-anywhere-fitness-01.herokuapp.com/api/auth/login

    [POST] [Login] - Login an already registered user to receive a token
        Endpoint: /auth/login

    Fields:
    "username" - string, MUST match a registered username, REQUIRED
    "password" - string, MUST match a registered password with registered username, REQUIRED

[Logout]

Token required for Logout

Example: https://bw-anywhere-fitness-01.herokuapp.com/api/auth/logout

    [POST] [Logout] - Logout a user destroy a token
        Endpoint: /auth/logout

    Fields:
    None required

[Users]

Token required for seeing classes

    [GET] [FindAllClasses] - Finds all classes
        Endpoint: /classes
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes

    [GET] [FindClassById] - Find a specific class by its assigned class ID
        Endpoint: /classes/:class_id
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes/1

    [GET] [FindClassesByUserId] - Find a user's classes by their assigned user ID
        Endpoint: /classes/user/:user_id
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes/user/1

    [POST] [AddClasses] - Create a new user class.
        Endpoint: /classes
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes

    [PUT] [AddClasses] - Update an existing user's class.
        Endpoint: /classes/:class_id
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes/1

    [DELETE] [RemoveClassById] - Remove a user's class by their assigned class ID
        Endpoint: /classes/:class_id
        Example: https://bw-anywhere-fitness-01.herokuapp.com/api/classes/1
