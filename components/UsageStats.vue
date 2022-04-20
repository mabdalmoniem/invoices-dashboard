<template>
  <div class="w-full">
    <div class="my-8">
      <label
        :for="`${title} fee`"
        class="block text-sm font-medium text-gray-700"
      >
        {{ title }} Fee
      </label>
      <div class="mt-1">
        <input
          type="number"
          :name="`${title} fee`"
          :id="`${title} fee`"
          v-model="trattaBasePrice"
          oninput="if(this.value < 0) this.value = 0;"
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div
      class="mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
    >
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <ul v-if="!isObjectEmpty(usage)" role="list" class="mt-6 space-y-6">
          <li v-for="(key, i) in keys" :key="i" class="flex">
            <CheckIcon
              class="flex-shrink-0 w-6 h-6 text-indigo-500"
              aria-hidden="true"
            />
            <span class="ml-3 text-gray-500"
              >{{ key | titleCase }}: {{ usage[key] }}</span
            >
          </li>
          <li class="flex">
            <CheckIcon
              class="flex-shrink-0 w-6 h-6 text-indigo-500"
              aria-hidden="true"
            />
            <span class="ml-3 text-gray-500"
              >Tratta Price: {{ trattaBasePrice * usage.usage }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from "@vue-hero-icons/outline";
import helpersMixin from "../mixins/helpers";

export default {
  components: { CheckIcon },
  props: {
    title: { required: true, type: String },
    usage: { required: true, type: Object },
  },
  mixins: [helpersMixin],
  data() {
    return {
      trattaBasePrice: 0,
      keys: ["count", "usage", "usage_unit", "price"],
    };
  },
  filters: {
    titleCase: function (value) {
      return value.replace(/^_*(.)|_+(.)/g, (s, c, d) =>
        c ? c.toUpperCase() : " " + d.toUpperCase()
      );
    },
  },
};
</script>
