import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", {
  state: () => ({
    persons: [],
  }),
  actions: {
    addPerson(personName) {
      this.persons.push({
        name: personName,
        personalBill: 0,
      });
    },

    handleDeletePerson(personToDelete) {
      this.persons = this.persons.filter(
        (p) => p !== personToDelete
      );
    },
  },
});
