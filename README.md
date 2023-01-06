# Course Indoors ✍️

# Project Title

A web learning platform made for individuals and corporate based trainees using the `MERN` stack.

# Motivation 👍🏻

Course Indoors was made with the intent to make learning easier for everyone and anyone at any time or place

# Build Status 🏗

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Code Style ⌨️

We standardized our coding style by enforcing certain rules using `ESLint` and `Prettier` 

Our code style is simple and it consists of 3 main pillars :

- camelCasing for variables and functions
- PascalCasing for classes and `ReactJS` components
- Single quotes for strings and all lines ending in semi colons

# Screenshots 📸

<img width="1440" alt="Screen_Shot_2023-01-06_at_9 33 56_AM" src="https://user-images.githubusercontent.com/43939754/210964768-9aa11771-d63d-46fd-882a-862949b001e8.png">


<img width="1440" alt="Screen_Shot_2023-01-06_at_9 36 41_AM" src="https://user-images.githubusercontent.com/43939754/210964810-984396a2-9bc3-4f3f-806b-4b8dbc13f8de.png">


<img width="1440" alt="Screen_Shot_2023-01-06_at_9 46 02_AM" src="https://user-images.githubusercontent.com/43939754/210964838-da73d63d-9e3b-49e5-9d0e-68e7a4b8cd3c.png">

<img width="1440" alt="Screen_Shot_2023-01-06_at_9 49 32_AM" src="https://user-images.githubusercontent.com/43939754/210964863-3bb64348-4119-4095-b381-48f189366a36.png">


# Frameworks used  👨🏻‍💻

### Frontend 🎨

- ReactJS
- MaterialUI
- React-Bootstrap
- Sass
- Stripe-Checkout

### Backend 🔩

- Node.js
- Express
- Mongoose
- Stripe-js
- NodeMailer
- jspdf

### Database 📦

- MongoDB
- MongoDB Atlas

### Miscellaneous

- Git
- Postman
- VS Code

# Features ⚙️

- Authorization
- Authentication
- Credit card payment
- Write notes and download it on the fly
- Dedicated mailing service

# Code Examples 💭

```jsx
import BaseAxios from '../Requester/BaseAxios';

export const signUp = (userInfo) => {
  return BaseAxios.post('/guest/signup', userInfo);
};

export const signIn = (userInfo) => {
  return BaseAxios.post('/guest/signin', userInfo);
};
export const logOut = () => {
  sessionStorage.setItem('id', '');
  sessionStorage.setItem('type', '');
  localStorage.setItem('id', '');
  localStorage.setItem('type', '');
  return BaseAxios.post('/guest/logout');
};
```

```sass
@use './../../../scss/_variables' as *;
.hover {
  &:hover {
    cursor: pointer;
  }
}
.card {
  width: 12rem;
  margin: auto;
  background-color: $accent-light;
  border-radius: $border-radius;
  transition: 400ms;
  &:hover {
    transform: scale(1.06);
  }
}
.card-img-top {
  padding: 4%;
  border-radius: $border-radius + 8;
}

.font-primary {
  color: $primary;
  font-size: 1.5em;
}
.font-secondary {
  color: $secondary;
}
#currency {
  color: rgb(7, 189, 7);
  font-weight: 500;
}
#card-button {
  background-color: $accent;
  border: 0;
  border-radius: $border-radius;
  transform: scale(0.9);

  &:hover {
    background-color: $accent;
  }
}

```

```jsx
const getInstructorById = async (req, res) => {
  const { id } = req.query;
  const instructor = await Instructor.findById(id);

  if (instructor) {
    res.status(200).json(instructor);
  } else {
    res.status(404).json({ error: 'instructor not found' });
  }
};
```

# Installation 🏃🏻

### Frontend

1. Head into the ************************frontend************************  directory through your favorite terminal and type `npm i` 

### Backend

1. Head into the ************************backend************************ directory through your favorite terminal and type `npm i` 
2. Create a .env file and place it inside the ******************************backend****************************** directory and place inside of it the following variables
    1. `MONGO_URI`
    2. `PORT`
    3. `JWT_SECRET`
    4. `REFRESH_TOKEN_SECRET`
    5. `STRIPE_SECRET`

# API Reference 📄

- `/guest`
    - `POST/signup`
    - `POST/signin`
    - `POST/logout`
- `/admin`
    - `POST/grantrefund`
    - `POST/promotion`
    - `POST/grantaccesstocourse`
- `/instructor`
    - `PATCH/:id`
    - `POST/reports`
    - `POST/instructorreviews`
- `/individual`
    - `PATCH/:id`
    - `POST/:id`
    - `GET/courses`
- `/corporate`
    - `PATCH/:id`
    - `POST/:id`
    - `GET/courses`

# Contribute 🫂

Everyone is welcome to contribute, either ask to be assigned on one of the issues or create an issue yourself and it should be approved as soon as possible  

# License

Distributed under **MIT** license.
