import { createRouter, createWebHistory } from "vue-router";

import AddPersons from "../pages/AddPersons.vue";
import AddDishes from "../pages/AddDishes.vue";
import CalculateBill from "../pages/CalculateBill.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "AddPersons",
      component: AddPersons,
    },
    {
      path: "/dishes",
      name: "AddDishes",
      component: AddDishes,
    },
    {
      path: "/bill",
      name: "CalculateBill",
      component: CalculateBill,
    },
  ],
});

export default router;
