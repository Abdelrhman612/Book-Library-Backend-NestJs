Here's a professional README.md file in English for your book-library-backend project:

````markdown
# Book Library Backend System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master)](https://circleci.com/gh/nestjs/nest)
[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![License](https://img.shields.io/npm/l/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)

A robust backend system for a book library built with NestJS, featuring authentication, user management, book management, and Cloudinary integration.

## Features

- **User Management**: Registration, login, role-based access control (user/admin)
- **Book Management**: CRUD operations for books with image uploads
- **Authentication**: Secure JWT-based authentication system
- **Password Recovery**: Email-based password reset with verification codes
- **Image Upload**: Cloudinary integration for book cover images
- **Role-Based Access**: Fine-grained permission control
- **Database**: Prisma ORM with PostgreSQL

## Technologies

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: [Prisma](https://www.prisma.io/) + PostgreSQL
- **Authentication**: JWT with Passport
- **File Storage**: [Cloudinary](https://cloudinary.com/)
- **Email**: Nodemailer for transactional emails
- **Validation**: Class-validator + class-transformer

## Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database
- Cloudinary account (for image uploads)
- Gmail account (for email sending)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-library-backend.git
cd book-library-backend
```
````

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration.

4. Database setup:

```bash
npx prisma migrate dev
```

## Running the App

```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

## API Documentation

The API follows RESTful conventions and uses JSON responses. Base URL: `/api/v1`

### Authentication Endpoints

- `POST /auth/sign-up` - User registration
- `POST /auth/sign-in` - User login
- `POST /auth/reset-password` - Initiate password reset
- `POST /auth/verify-code` - Verify reset code
- `POST /auth/change-password` - Change password

### Book Endpoints (Require Authentication)

- `GET /book` - Get all books
- `POST /book` - Create new book (Admin only)
- `GET /book/:id` - Get single book
- `PATCH /book/:id` - Update book (Admin only)
- `DELETE /book/:id` - Delete book (Admin only)

### User Endpoints (Admin only)

- `GET /user` - Get all users
- `POST /user` - Create new user
- `GET /user/:id` - Get single user
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

### Upload Endpoint

- `POST /upload/file` - Upload image to Cloudinary

## Environment Variables

```
DATABASE_URL="postgresql://user:password@localhost:5432/book-library?schema=public"
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=60m
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM="Book Library <noreply@booklibrary.com>"
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=3000
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deployment

The application can be deployed using:

```bash
# Build for production
npm run build

# Run in production
npm run start:prod
```

For cloud deployment, consider using NestJS Mau:

```bash
npm install -g mau
mau deploy
```

## License

This project is [MIT licensed](LICENSE).

## Support

For support, please open an issue or join our [Discord channel](https://discord.gg/G7Qnnhy).

```

This README includes:
1. Project overview and features
2. Technology stack
3. Installation instructions
4. API documentation
5. Environment variables configuration
6. Testing and deployment instructions
7. License information

You can customize it further by adding:
- Screenshots of API responses
- More detailed API documentation with example requests/responses
- Contribution guidelines
- Roadmap for future features
```
