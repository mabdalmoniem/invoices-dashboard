<template>
  <form class="space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <h1
            class="text-xl font-extrabold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight"
          >
            Twilio Usage Report
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepeipsa?
          </p>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-8">
          <div class="sm:col-span-4">
            <label
              for="account-number"
              class="block text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <div class="mt-1">
              <input
                type="text"
                name="account-number"
                id="account-number"
                v-model="formInput.account_number"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="start-date"
              class="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div class="mt-1">
              <input
                type="date"
                name="start-date"
                id="start-date"
                v-model="formInput.start_date"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="end-date"
              class="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div class="mt-1">
              <input
                type="date"
                name="end-date"
                id="end-date"
                v-model="formInput.end_date"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { debounce, omitBy, isNil, isUndefined } from "lodash";

export default {
  name: "UsageInput",
  data() {
    return {
      formInput: {
        account_number: "",
        start_date: "",
        end_date: "",
      },
    };
  },
  methods: {
    camelToSnakeCase(str) {
      return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    },
  },
  watch: {
    formInput: {
      handler: debounce(function (newValue) {
        const params = omitBy(
          newValue,
          (v) => isUndefined(v) || isNil(v) || v === ""
        );
        this.$emit("inputWasUpdated", { ...params });
      }, 0),
      deep: true,
    },
  },
};
</script>
