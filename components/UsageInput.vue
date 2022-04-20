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
                v-model="formInput.accountName"
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
                v-model="formInput.startData"
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
                v-model="formInput.endData"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="call-unit-fee"
              class="block text-sm font-medium text-gray-700"
            >
              Call Unit Fee
            </label>
            <div class="mt-1">
              <input
                type="number"
                name="call-unit-fee"
                id="call-unit-fee"
                v-model="formInput.callUnitFee"
                oninput="if(this.value < 0) this.value = 0;"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="sms-unit-fee"
              class="block text-sm font-medium text-gray-700"
            >
              SMS Unit Fee
            </label>
            <div class="mt-1">
              <input
                type="number"
                name="sms-unit-fee"
                id="sms-unit-fee"
                v-model="formInput.smsUnitFee"
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
import { debounce } from "lodash";

export default {
  name: "UsageInput",
  data() {
    return {
      formInput: {
        accountName: "",
        startData: "",
        endData: "",
        callUnitFee: 0,
        smsUnitFee: 0,
      },
    };
  },
  watch: {
    formInput: {
      handler: debounce(function (newValue) {
        this.$emit("inputWasUpdated", { ...newValue });
      }, 0),
      deep: true,
    },
  },
};
</script>
