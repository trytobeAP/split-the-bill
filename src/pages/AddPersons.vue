<template>
  <v-card
    class="d-flex align-center flex-column"
    width="800"
    title="Экран добавления персон"
    subtitle="Добавьте людей"
    color="primary"
  >
    <v-row class="ma-5 pa-6">
      <v-form v-model="isValid">
        <v-text-field
          class="default-input"
          v-model="personName"
          @keydown.enter="checkPersonName"
          placeholder="Введите имя"
          :rules="[rules.required, rules.counter, rules.isUniqueName]"
        />
      </v-form>
    </v-row>

    <v-card
      width="300"
      class="ma-2 pa-4"
      v-for="person in persons"
      :key="person.name"
      :value="person.name"
    >
      <v-btn @click="handleDeletePerson(person)" icon="mdi-delete-outline" />
      {{ person.name }}
    </v-card>

    <v-btn
      @click="checkPersonName"
      :disabled="!isValid"
      class="ma-5 pa-6"
      prepend-icon="mdi-plus-circle-outline"
      rounded="xl"
      stacked
      variant="tonal"
    >
      Добавить человека
    </v-btn>

    <div v-if="isReadyToDishes">
      <router-link :to="{ name: 'AddDishes' }" active-class="active">
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
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      personsNames: [],
      personName: "",

      isValid: false,
      rules: {
        required: (value) => !!value || "Необходимо значение.",
        counter: (value) =>
          value.length >= 3 || "Имя должно содержать минимум 3 символа!",
        isUniqueName: () =>
          !this.persons.find((p) => p.name === this.personName) ||
          "Имя должно быть уникальным",
      },
    };
  },

  methods: {
    ...mapActions(usePersonsStore, ["addPerson", "handleDeletePerson"]),

    checkPersonName() {
      if (this.isValid) {
        this.addPerson(this.personName);
        this.personName = "";
      }
    },
  },

  computed: {
    ...mapState(usePersonsStore, ["persons"]),

    isReadyToDishes() {
      return this.persons.length > 1;
    },
  },
};
</script>
