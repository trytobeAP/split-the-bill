import { defineStore } from "pinia";

export const useDishesStore = defineStore("dishes", {
  state: () => ({
    dishes: [],
  }),
  actions: {
    addDish(dishName, dishPrice) {
      this.dishes.push({
        name: dishName,
        price: dishPrice,
        whoEated: [],
      });
    },
    handleDeleteDish(dishToDelete) {
      this.dishes = this.dishes.filter((d) => d !== dishToDelete);
    },
  },
});
