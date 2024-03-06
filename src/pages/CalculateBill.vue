<template>
  <v-card
    class="d-flex align-center flex-column"
    width="800"
    title="Экран рассчета чека"
    subtitle="Выберите человека"
    color="primary"
  >
    <div>
      <v-card
        v-for="person in this.persons"
        :key="person.name"
        :value="person.personalBill"
        width="500"
        class="ma-2 pa-3 card-spacer"
      >
        {{
          person.name +
          " " +
          "потратил " +
          " " +
          person.personalBill.toFixed(2) +
          "р"
        }}
      </v-card>
    </div>

    <div>
      <router-link :to="{ name: 'AddPersons' }" active-class="active">
        <v-btn
          class="ma-5 pa-6"
          prepend-icon="mdi-home-circle-outline"
          rounded="xl"
          stacked
          color="white"
          variant="outlined"
        >
          Вернуться на главную
        </v-btn>
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { usePersonsStore } from "../store/persons";
import { useDishesStore } from "../store/dishes";
import { mapState } from "pinia";

export default {
  created() {
    //обнуление на случай пересчета чека
    this.persons.forEach((person) => {
      person.personalBill = 0;
    });

    //расчет чека
    this.dishes.forEach((d) => {
      let splittedPriceForDish = d.price / d.whoEated.length;

      d.whoEated.forEach((person) => {
        let personToOperateWith = this.persons.find((p) => p.name === person);
        personToOperateWith.personalBill += splittedPriceForDish;
      });
    });
  },

  computed: {
    ...mapState(usePersonsStore, ["persons"]),
    ...mapState(useDishesStore, ["dishes"]),
  },
};
</script>
