<template>
  <form
    @submit.prevent="submitForm"
    class="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md space-y-4"
  >
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Add New Restaurant</h2>

    <input
      v-model="name"
      placeholder="Restaurant Name"
      required
      class="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
    />

    <textarea
      v-model="description"
      placeholder="Description"
      required
      class="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
      rows="3"
    ></textarea>

    <button
      type="submit"
      class="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
    >
      Add Restaurant
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRestaurantStore } from "~/stores/restaurants";

const name = ref("");
const description = ref("");
const router = useRouter();

const restaurantStore = useRestaurantStore();

function submitForm() {
  restaurantStore.addRestaurant({
    name: name.value,
    description: description.value,
    averageRating: 0,
  });
  name.value = "";
  description.value = "";
  router.push(`/`);
}
</script>
