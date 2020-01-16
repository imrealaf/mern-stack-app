# MERN Stack Application

A powerful & elegant foundation for MERN Stack Applications w/ JWT Authentication (Email, Facebook, Google)

### Back-End Includes

- **Node.js** TypeScript
- **Dotenv** for handling of environment variables
- **Express** implemented w/ Node **Cluster API** for performance optimization
- **Passport** authentication w/ **JWT** for all major social networks and local email
- **MongoDB** w/ Mongoose for database modeleing
- **Logging** middleware
- **GZIP compression** for compacting requests
- **CORS** protection
- **Helmet** for XSS protection & other security optimizations
- **Email service** powered by **SendGrid** with configurable templates

### Front-End Includes

- **React** TypeScript
- **TSLint** setup w/ **Prettier**
- **Jest** & **Enzyme** for testing
- **React Router DOM** w/ with public & protected routes
- **SASS** enabled with **Bootstrap** SASS included
- **React Bootstrap** for base UI components
- **React Helmet** for dynamic meta info for pages
- **React FontAwesome** for icons
- **Custom Hooks** for handling auth state, UI interaction etc.

### Back-End Routes

#### Auth

- /auth **GET** - get current user
- /auth/email **GET** - login with email/password
- /auth/facebook **GET** - login with Facebook
- /auth/facebook/callback **GET**
- /auth/google **GET** - login with Google
- /auth/google/callback **GET**
- /auth/verify **POST** - verify account email
- /auth/resend-verify **POST** - resend verification email

#### API

- /api/users **GET** - get all users
- /api/users **POST** - create user
- /api/users **PUT** - update user
- /api/users/:id **GET** - get user by ID
- /api/users/:id **DELETE** - delete user by ID

### Front-End Routes

#### Public

- / - **Landing**
- /login - **Login**
- /sign-up - **Sign up**
- /verify/:token - **Verify**
- /resend-verify - **Resend Verification**
- /auth/success/:token - **Social Auth Success**
- /{page} - **Generic Page**

#### Private

- /dashboard - **Dashboard**
