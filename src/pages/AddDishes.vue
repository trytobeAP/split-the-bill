<template>
  <v-card
    class="d-flex align-center flex-column"
    width="800"
    title="Экран добавления блюд"
    subtitle="Добавьте блюда"
    color="primary"
  >
    <v-form v-model="isValid">
      <div class="d-flex align-center flex-row mb-7 pa-5">
        <v-text-field
          class="input-add-dishes-dish-name"
          type="string"
          v-model="dishName"
          @keydown.enter="checkDishData"
          placeholder="Введите название блюда"
          :rules="[rules.required, rules.counter, rules.isUniqueName]"
        />

        <v-text-field
          class="input-add-dishes-dish-price"
          type="number"
          v-model="dishPrice"
          @keydown.enter="checkDishData"
          placeholder="Цена"
          :rules="[rules.required, rules.cost]"
        />
      </div>
    </v-form>

    <v-card
      width="500"
      class="ma-3 pa-2"
      v-for="dish in dishes"
      :key="dish.name"
      :value="dish.name"
    >
      <div class="card-spacer-row">
        <v-btn @click="handleDeleteDish(dish)" icon="mdi-delete-outline" />

        <div>{{ dish.name }} - {{ dish.price }} <span>р</span></div>
      </div>

      <v-select
        clearable
        chips
        label="Выберите людей"
        v-model="dish.whoEated"
        :items="personsNames"
        multiple
        variant="outlined"
      />
    </v-card>

    <v-btn
      @click="checkDishData"
      :disabled="!isValid"
      class="ma-5 pa-6"
      prepend-icon="mdi-plus-circle-outline"
      rounded="xl"
      stacked
      variant="tonal"
    >
      Добавить блюдо
    </v-btn>

    <div v-if="isReadyToBill">
      <router-link :to="{ name: 'CalculateBill' }" active-class="active">
        <v-btn
          class="ma-5 pa-6"
          prepend-icon="mdi-arrow-right-bold-circle-outline"
          rounded="xl"
          stacked
          color="white"
          variant="plain"
        >
          Дальше
        </v-btn>
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { usePersonsStore } from "../store/persons";
import { useDishesStore } from "../store/dishes";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      personsNames: [],

      dishName: "",
      dishPrice: 0,

      isValid: false,

      rules: {
        required: (value) => !!value || "Необходимо значение.",
        counter: (value) =>
          value.length >= 3 || "Имя должно содержать минимум 3 символа!",
        cost: (value) => value > 0 || "Не может быть бесплатным!",
        isUniqueName: () =>
          !this.dishes.find((d) => d.name === this.dishName) ||
          "Имя должно быть уникальным",
      },
    };
  },

  created() {
    this.dishes.forEach((d) => {
      d.whoEated = d.whoEated.filter((p) =>
        this.persons.find((person) => person.name === p)
      );
    });

    // занесение имен персон для отображения в селекте
    this.persons.forEach((p) => {
      this.personsNames.push(p.name);
    });
  },

  methods: {
    ...mapActions(useDishesStore, ["addDish", "handleDeleteDish"]),

    checkDishData() {
      if (this.isValid) {
        this.addDish(this.dishName, this.dishPrice);
        this.dishName = "";
        this.dishPrice = 0;
      }
    },
  },

  computed: {
    ...mapState(usePersonsStore, ["persons"]),
    ...mapState(useDishesStore, ["dishes"]),

    isReadyToBill() {
      return this.dishes.length > 0;
    },
  },
};
</script>
