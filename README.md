# Limitless-TS

A website of an algorithmic trading start-up with a connected blog

## Description

This repository contains the back-end code of the final project at the conclusion of the full-stack web developer course with Epicode. 
The project is a website of an algorithmic trading start-up with a linked blog where users can share trading ideas.

## Feature

- Sending emails for newsletter subscription
- User registration and authentication 
- Users can create posts but only delete their own
- Users can create comments but edit, delete only their own 
- Search by title and category 

### Dependencies:

    "bcrypt": "^5.1.0",
    "cloudinary": "^1.37.1",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "jwt-decode": "^3.1.2",
    "mailgun.js": "^9.1.2",
    "mongoose": "^7.2.2",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0"


## Installation & Usage

#### Remember that you will have to subscribe to MongoDB and MailGun

To install the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ToniBlaze/capstone_server.git

# Install the dependencies
npm install

# Configure the environment file
 # 1. Create a new file named ".env"
  # 2. Open the ".env" file and define the following environment variables:
MONGODB_APIKEY = ******
MAILGUN_API_KEY = ******
MAILGUN_DOMAIN = ******
PORT= ******
APP_PASSWORD_BCRIPT= ******
APP_JWT_SECRET_KEY = ******

``` 

To run the server, follow next step:

```
node index.js
```

-----
Here below the link for the client code:   
https://github.com/ToniBlaze/capstone_client
