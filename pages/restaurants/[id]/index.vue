<template>
  <div class="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-2">
      {{ restaurant?.name }}
    </h1>
    <p class="text-gray-600 mb-4">{{ restaurant?.description }}</p>
    <p class="text-yellow-500 font-semibold mb-6">
      Rating: {{ restaurant?.averageRating.toFixed(1) }} ⭐
    </p>

    <h3 class="text-xl font-semibold text-gray-800 mb-2">Reviews</h3>
    <ul class="space-y-2 mb-6">
      <li
        v-for="review in restaurant?.reviews"
        :key="review.id"
        class="p-4 border rounded-lg bg-gray-50"
      >
        <p class="text-gray-700">{{ review.comment }}</p>
        <p class="text-yellow-500">Rating: {{ review.rating }} ⭐</p>
      </li>
    </ul>

    <form @submit.prevent="submitReview" class="space-y-4">
      <textarea
        v-model="comment"
        placeholder="Add a review"
        required
        class="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
      ></textarea>
      <input
        type="number"
        v-model.number="rating"
        min="1"
        max="5"
        required
        class="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Rating (1-5)"
      />
      <button
        type="submit"
        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Review
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRestaurantStore } from "~/stores/restaurants";

const route = useRoute();
const restaurantStore = useRestaurantStore();
const restaurantId = route.params.id;
const restaurant = computed(() =>
  restaurantStore.restaurants.find((r) => r.id === restaurantId)
);

const comment = ref("");
const rating = ref(5);

function submitReview() {
  restaurantStore.addReview(restaurantId, {
    comment: comment.value,
    rating: rating.value,
  });
  comment.value = "";
  rating.value = 5;
}

onMounted(() => {
  if (!restaurant.value) restaurantStore.fetchRestaurants();
});
</script>
