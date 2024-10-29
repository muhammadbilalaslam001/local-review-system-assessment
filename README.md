# Restaurant Review App

A Vue.js and Nuxt 3 web application for viewing and reviewing restaurants. Users can filter restaurants by rating, view restaurant details, add reviews, and create new restaurant entries. This project uses Pinia for state management and Tailwind CSS for responsive styling.

## Features

1. **Homepage (Restaurant List View)**
   - Displays a list of restaurants with their names and average ratings.
   - Filter restaurants by rating (e.g., only restaurants with a rating of 4 stars or higher).
   - Navigate to restaurant details by clicking on a restaurant card.
   - "Add New Restaurant" button to navigate to the form for adding a new restaurant.

2. **Restaurant Detail Page**
   - Shows detailed information about a selected restaurant, including name, description, average rating, and a list of reviews.
   - Allows users to add new reviews with a comment and rating (1 to 5 stars).
   - Automatically updates the restaurant's average rating based on reviews.

3. **New Restaurant Page**
   - A form where users can add a new restaurant with fields for name, description, and an image URL.
   - On submission, the restaurant is added to the list and displayed on the homepage.

4. **Mock API Integration**
   - Uses `json-server` as a mock REST API for storing restaurant data and reviews.
   - Supports `GET`, `POST`, and `PUT` requests to interact with the data.

## Technical Stack

- **Vue.js 3** with the Composition API
- **Nuxt 3** for server-side rendering and routing
- **Pinia** for state management
- **Tailwind CSS** for styling
- **json-server** for mock API

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   https://github.com/muhammadbilalaslam001/local-review-system-assessment
   cd local-review-system-assessment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up `json-server`**:
   - Create a `db.json` file in the root directory with the following initial structure:
   
     ```json
     {
       "restaurants": [
         {
           "id": 1,
           "name": "The Great Burger",
           "description": "Best burgers in town",
           "averageRating": 4.5,
           "image": "/images/great-burger.jpg",
           "reviews": []
         }
       ]
     }
     ```

   - Start `json-server`:
     ```bash
     npx json-server --watch db.json --port 3001
     ```

4. **Run the Nuxt Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Project Structure

- **Home Page** (`pages/restaurants/index.vue`):
  - Displays a grid of restaurants.
  - Allows filtering by minimum rating.
  - Includes an "Add New Restaurant" button that navigates to `/restaurants/new`.
  
- **Restaurant Details Page** (`pages/restaurants/[id].vue`):
  - Displays detailed information about a restaurant, including reviews.
  - Provides a form to add new reviews, with automatic average rating calculation.

- **New Restaurant Page** (`pages/restaurants/new.vue`):
  - Form to add a new restaurant entry, including name, description, and image URL fields.

## State Management

The application state is managed using Pinia in `stores/restaurants.js`:

- **fetchRestaurants**: Fetches restaurant data from `json-server`.
- **addRestaurant**: Sends a `POST` request to add a new restaurant to `json-server`.
- **addReview**: Updates reviews for a specific restaurant using a `PUT` request (replaces entire restaurant object to support JSON server limitations).

## Key Components

- **Filtering and Navigation**: The homepage includes a filtering input and navigation functionality for adding new restaurants or viewing details.
- **Restaurant Card Layout**: Each restaurant is displayed in a responsive card grid.
- **Review Form**: Users can add reviews to individual restaurants, which dynamically updates the restaurant's average rating.

## Styling and UI

- **Tailwind CSS**: Used for responsive design and styling consistency.
- **Form Validation**: All input fields are required, providing basic form validation.
- **Responsive Layout**: The app adapts to different screen sizes, making it user-friendly on both desktop and mobile devices.
