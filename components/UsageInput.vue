<template>
  <form class="p-8 lg:p-0 space-y-8 divide-y divide-gray-200">
    <div class="space-y-8 divide-y divide-gray-200">
      <div class="pt-8">
        <div>
          <div class="flex justify-between items-start">
            <h1
              class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-gray-800 sm:text-5xl sm:leading-none sm:tracking-tight pb-4"
            >
              Twilio Usage Report
            </h1>
            <button @click.prevent="reset" class="text-sm text-gray-400">
              Reset
            </button>
          </div>
          <p v-if="formInput.start_date" class="mt-1 text-sm text-gray-500">
            From: {{ formInput.start_date }}
          </p>
          <p v-if="formInput.end_date" class="mt-1 text-sm text-gray-500">
            To: {{ formInput.end_date }}
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

          <div class="sm:col-span-2">
            <label
              for="Call Unit Fee"
              class="block text-sm font-medium text-gray-700"
            >
              Call Unit Fee
            </label>
            <div class="mt-1">
              <input
                type="number"
                name="Call Unit Fee"
                id="Call Unit Fee"
                v-model="formInput.calls_inbound_fee"
                oninput="if(this.value < 0) this.value = 0;"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="SMS Unit Fee"
              class="block text-sm font-medium text-gray-700"
            >
              SMS Unit Fee
            </label>
            <div class="mt-1">
              <input
                type="number"
                name="SMS Unit Fee"
                id="SMS Unit Fee"
                v-model="formInput.sms_inbound_longcode_fee"
                oninput="if(this.value < 0) this.value = 0;"
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
        calls_inbound_fee: 0,
        sms_inbound_longcode_fee: 0,
      },
    };
  },
  methods: {
    reset() {
      this.formInput = {
        account_number: "",
        start_date: "",
        end_date: "",
        calls_inbound_fee: 0,
        sms_inbound_longcode_fee: 0,
      };
    },
    camelToSnakeCase(str) {
      return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    },
  },
  watch: {
    formInput: {
      handler: debounce(function (newValue) {
        const params = omitBy(
          newValue,
          (v) => isUndefined(v) || isNil(v) || v === "" || v === 0
        );
        if (Object.keys(params).length) {
          this.$emit("inputWasUpdated", { ...params });
        } else {
          this.$emit("inputWasReset");
        }
      }, 0),
      deep: true,
    },
  },
};
</script>
