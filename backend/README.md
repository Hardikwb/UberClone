# Backend API Documentation

## Endpoints

### User Registration

#### POST `/user/register`

Register a new user account.

---

**Description:**  
This endpoint allows new users to create an account by providing their full name, email, and password. Upon successful registration, a JWT authentication token is returned along with the user details.

---

### Request Body

| Field                | Type     | Required | Description                                      |
|----------------------|----------|----------|--------------------------------------------------|
| `fullname.firstname` | `string` | Yes      | User's first name (minimum 3 characters)         |
| `fullname.lastname`  | `string` | No       | User's last name (minimum 3 characters if provided) |
| `email`              | `string` | Yes      | Valid email address                              |
| `password`           | `string` | Yes      | Password (minimum 6 characters)                  |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### Response

#### Success Response

**Status Code:** `201 Created`

```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

Returned when validation fails.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

### Validation Rules

| Field                | Rule                          | Error Message                                  |
|----------------------|-------------------------------|------------------------------------------------|
| `email`              | Must be a valid email format  | `Invalid Email`                                |
| `fullname.firstname` | Minimum 3 characters          | `First name must be of atleast 3 characters`   |
| `password`           | Minimum 6 characters          | `Password must be of atleast 6 characters`     |

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `201`       | User registered successfully                     |
| `400`       | Validation error (invalid input data)            |

---

### Notes

- The password is hashed using bcrypt before storing in the database.
- A JWT token is generated upon successful registration for immediate authentication.
- Email addresses are stored in lowercase.

---

### User Login

#### POST `/user/login`

Authenticate an existing user.

---

**Description:**  
This endpoint allows users to log in by providing their email and password. Upon successful authentication, a JWT token is returned and also set as a cookie.

---

### Request Body

| Field      | Type     | Required | Description                     |
|------------|----------|----------|---------------------------------|
| `email`    | `string` | Yes      | Valid email address             |
| `password` | `string` | Yes      | Password (minimum 6 characters) |

#### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "User logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

Returned when validation fails.

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Status Code:** `400 Bad Request`

Returned when credentials are invalid.

```json
{
  "message": "Invalid email or password"
}
```

---

### Validation Rules

| Field      | Rule                         | Error Message                                |
|------------|------------------------------|----------------------------------------------|
| `email`    | Must be a valid email format | `Invalid Email`                              |
| `password` | Minimum 6 characters         | `Password must be at least 6 characters long`|

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | User logged in successfully                      |
| `400`       | Validation error or invalid credentials          |

---

### Notes

- A JWT token is returned in the response body and also set as a cookie named `token`.
- The same error message is returned for both invalid email and invalid password to prevent user enumeration.

---

### Get User Profile

#### GET `/user/profile`

Get the authenticated user's profile.

---

**Description:**  
This endpoint returns the profile information of the currently authenticated user. Requires a valid JWT token for authentication.

---

### Request Headers

| Header          | Type     | Required | Description                              |
|-----------------|----------|----------|------------------------------------------|
| `Authorization` | `string` | Yes      | Bearer token (e.g., `Bearer <token>`)    |

Or the token can be sent via cookie.

#### Example Request

```
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

Returned when no token is provided.

```json
{
  "message": "Unauthorized - No token provided"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token is invalid or expired.

```json
{
  "message": "Unauthorized - Invalid token"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token has been blacklisted.

```json
{
  "message": "Unauthorized - Token is blacklisted"
}
```

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | User profile retrieved successfully              |
| `401`       | Unauthorized - Invalid, missing, or blacklisted token |

---

### Notes

- This is a protected route that requires authentication.
- The token can be provided via the `Authorization` header or as a cookie named `token`.

---

### User Logout

#### GET `/user/logout`

Log out the authenticated user.

---

**Description:**  
This endpoint logs out the current user by clearing the authentication cookie and blacklisting the JWT token. The blacklisted token will be rejected for any future requests until it expires (24 hours).

---

### Request Headers

| Header          | Type     | Required | Description                              |
|-----------------|----------|----------|------------------------------------------|
| `Authorization` | `string` | Yes      | Bearer token (e.g., `Bearer <token>`)    |

Or the token can be sent via cookie.

#### Example Request

```
GET /user/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "User logged out successfully"
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

Returned when no token is provided.

```json
{
  "message": "Unauthorized - No token provided"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token is invalid or expired.

```json
{
  "message": "Unauthorized - Invalid token"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token has already been blacklisted.

```json
{
  "message": "Unauthorized - Token is blacklisted"
}
```

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | User logged out successfully                     |
| `401`       | Unauthorized - Invalid, missing, or blacklisted token |

---

### Notes

- This is a protected route that requires authentication.
- The token is added to a blacklist stored in MongoDB.
- Blacklisted tokens automatically expire after 24 hours (86400 seconds).
- The `token` cookie is cleared from the response.

---

### captain Registration

#### POST `/captain/register`

Register a new captain (captain/driver) account.

---

**Description:**  
This endpoint allows new captains (drivers) to create an account by providing their full name, email, password, and vehicle details. Upon successful registration, a JWT authentication token is returned along with the captain details.

---

### Request Body

| Field                  | Type     | Required | Description                                              |
|------------------------|----------|----------|----------------------------------------------------------|
| `fullname.firstname`   | `string` | Yes      | Captain's first name (minimum 3 characters)              |
| `fullname.lastname`    | `string` | Yes      | Captain's last name (minimum 3 characters)               |
| `email`                | `string` | Yes      | Valid email address                                      |
| `password`             | `string` | Yes      | Password (minimum 6 characters)                          |
| `vehicle.color`        | `string` | Yes      | Vehicle color (minimum 3 characters)                     |
| `vehicle.vehicleNumber`        | `string` | Yes      | Vehicle vehicleNumber number (minimum 3 characters)              |
| `vehicle.capacity`     | `number` | Yes      | Vehicle passenger capacity (minimum 1)                   |
| `vehicle.vehicleType`  | `string` | Yes      | Type of vehicle (`car`, `motorcycle`, or `auto`)         |

#### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.driver@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "vehicleNumber": "ABC-1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

### Response

#### Success Response

**Status Code:** `201 Created`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "vehicleNumber": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

Returned when validation fails.

```json
{
  "errors": [
    {
      "msg": "First name should be of 3 character long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

---

### Validation Rules

| Field                  | Rule                                          | Error Message                                      |
|------------------------|-----------------------------------------------|---------------------------------------------------|
| `fullname.firstname`   | Minimum 3 characters                          | `First name should be of 3 character long`        |
| `email`                | Must be a valid email format                  | `Please enter a valid email`                      |
| `password`             | Minimum 6 characters                          | `Password should be of length 6`                  |
| `vehicle.color`        | Minimum 3 characters                          | `Color must be at least 3 characters long`        |
| `vehicle.vehicleNumber`        | Minimum 3 characters                          | `vehicleNumber must be at least 3 characters long`        |
| `vehicle.capacity`     | Must be an integer >= 1                       | `Capacity must be at least 1`                     |
| `vehicle.vehicleType`  | Must be `car`, `motorcycle`, or `auto`        | `Vehicle type must be either car, motorcycle, or auto` |

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `201`       | Captain registered successfully                  |
| `400`       | Validation error (invalid input data)            |

---

### Notes

- The password is hashed using bcrypt before storing in the database.
- A JWT token is generated upon successful registration for immediate authentication.
- Email addresses are stored in lowercase.
- The captain's default status is set to `active`.

---

### Captain Login

#### POST `/captain/login`

Authenticate an existing captain.

---

**Description:**  
This endpoint allows captains to log in by providing their email and password. Upon successful authentication, a JWT token is returned and also set as a cookie.

---

### Request Body

| Field      | Type     | Required | Description                     |
|------------|----------|----------|---------------------------------|
| `email`    | `string` | Yes      | Valid email address             |
| `password` | `string` | Yes      | Password (minimum 6 characters) |

#### Example Request

```json
{
  "email": "john.driver@example.com",
  "password": "password123"
}
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "vehicleNumber": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses

**Status Code:** `400 Bad Request`

Returned when validation fails.

```json
{
  "errors": [
    {
      "msg": "Please enter a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

**Status Code:** `401 Unauthorized`

Returned when credentials are invalid.

```json
{
  "message": "Invalid email or password"
}
```

---

### Validation Rules

| Field      | Rule                         | Error Message                        |
|------------|------------------------------|--------------------------------------|
| `email`    | Must be a valid email format | `Please enter a valid email`         |
| `password` | Minimum 6 characters         | `Password should be of length 6`     |

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | Captain logged in successfully                   |
| `400`       | Validation error                                 |
| `401`       | Invalid credentials                              |

---

### Notes

- A JWT token is returned in the response body and also set as a cookie named `token`.
- The same error message is returned for both invalid email and invalid password to prevent user enumeration.
- The captain's password is stored hashed in the database and compared using bcrypt.

---

### Get Captain Profile

#### GET `/captain/getProfile`

Get the authenticated captain's profile.

---

**Description:**  
This endpoint returns the profile information of the currently authenticated captain. Requires a valid JWT token for authentication.

---

### Request Headers

| Header          | Type     | Required | Description                              |
|-----------------|----------|----------|------------------------------------------|
| `Authorization` | `string` | Yes      | Bearer token (e.g., `Bearer <token>`)    |

Or the token can be sent via cookie.

#### Example Request

```
GET /captain/getProfile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "captain": {
    "_id": "64a7b8c9d1e2f3a4b5c6d7e8",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.driver@example.com",
    "status": "active",
    "vehicle": {
      "color": "Black",
      "vehicleNumber": "ABC-1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

Returned when no token is provided.

```json
{
  "message": "Unauthorized"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token is invalid or expired.

```json
{
  "message": "Unauthorized"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token has been blacklisted.

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | Captain profile retrieved successfully           |
| `401`       | Unauthorized - Invalid, missing, or blacklisted token |

---

### Notes

- This is a protected route that requires authentication via the `authCaptain` middleware.
- The token can be provided via the `Authorization` header or as a cookie named `token`.
- Only captain tokens are valid for this endpoint; user tokens will be rejected.

---

### Captain Logout

#### GET `/captain/logout`

Log out the authenticated captain.

---

**Description:**  
This endpoint logs out the current captain by clearing the authentication cookie and blacklisting the JWT token. The blacklisted token will be rejected for any future requests until it expires (24 hours).

---

### Request Headers

| Header          | Type     | Required | Description                              |
|-----------------|----------|----------|------------------------------------------|
| `Authorization` | `string` | Yes      | Bearer token (e.g., `Bearer <token>`)    |

Or the token can be sent via cookie.

#### Example Request

```
GET /captain/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Response

#### Success Response

**Status Code:** `200 OK`

```json
{
  "message": "Logout successfully"
}
```

#### Error Responses

**Status Code:** `401 Unauthorized`

Returned when no token is provided.

```json
{
  "message": "Unauthorized"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token is invalid or expired.

```json
{
  "message": "Unauthorized"
}
```

**Status Code:** `401 Unauthorized`

Returned when the token has already been blacklisted.

```json
{
  "message": "Unauthorized"
}
```

---

### Status Codes Summary

| Status Code | Description                                      |
|-------------|--------------------------------------------------|
| `200`       | Captain logged out successfully                  |
| `401`       | Unauthorized - Invalid, missing, or blacklisted token |

---

### Notes

- This is a protected route that requires authentication via the `authCaptain` middleware.
- The token is added to a blacklist stored in MongoDB.
- Blacklisted tokens automatically expire after 24 hours (86400 seconds).
- The `token` cookie is cleared from the response.
- Only captain tokens are valid for this endpoint.