import { defineStore } from "pinia";

export const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    restaurants: [],
    loading: false,
  }),
  actions: {
    async fetchRestaurants() {
      this.loading = true;
      try {
        const response = await fetch("http://localhost:3001/restaurants");
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        this.restaurants = await response.json();
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        this.loading = false;
      }
    },
    async addRestaurant(restaurant) {
      try {
        const response = await fetch("http://localhost:3001/restaurants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...restaurant, reviews: [] }),
        });
        const newRestaurant = await response.json();
        this.restaurants.push(newRestaurant);
      } catch (error) {
        console.error("Error adding restaurant:", error);
      }
    },
    async addReview(restaurantId, review) {
      console.log(this.restaurants);
      const restaurant = this.restaurants.find((r) => r.id === restaurantId);
      console.log(restaurant);
      if (!restaurant) return;

      try {
        restaurant.reviews.push(review);
        restaurant.averageRating =
          restaurant.reviews.reduce((sum, r) => sum + r.rating, 0) /
          restaurant.reviews.length;
        await fetch(`http://localhost:3001/restaurants/${restaurantId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reviews: restaurant.reviews,
            averageRating: restaurant.averageRating,
          }),
        });
      } catch (error) {
        console.error("Error adding review:", error);
      }
    },
  },
});
