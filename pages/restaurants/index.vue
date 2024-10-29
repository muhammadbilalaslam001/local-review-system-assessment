<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="minRating"
        type="number"
        placeholder="Filter by rating"
        class="p-2 border"
      />
      <button
        @click="navigateToNewRestaurant"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Add New Restaurant
      </button>
    </div>

    <div v-if="restaurantStore.loading">Loading...</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="restaurant in filteredRestaurants"
        :key="restaurant.id"
        class="p-4 border rounded shadow-sm cursor-pointer"
        @click="navigateToRestaurant(restaurant.id)"
      >
        <h2 class="text-xl font-semibold">{{ restaurant.name }}</h2>
        <p>{{ restaurant.averageRating.toFixed(1) }} ⭐</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRestaurantStore } from "~/stores/restaurants";

const minRating = ref(0);
const restaurantStore = useRestaurantStore();
const router = useRouter();

const filteredRestaurants = computed(() =>
  restaurantStore.restaurants.filter((r) => r.averageRating >= minRating.value)
);

const navigateToRestaurant = (id) => {
  router.push(`/restaurants/${id}`);
};

const navigateToNewRestaurant = () => {
  router.push("/restaurants/new");
};

onMounted(() => {
  restaurantStore.fetchRestaurants();
});
</script>
