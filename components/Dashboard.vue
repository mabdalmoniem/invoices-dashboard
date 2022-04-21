<template>
  <div class="p-8 block lg:flex lg:items-center lg:justify-center">
    <div class="max-w-7xl mx-auto p8 sm:p-6 bg-white rounded-lg">
      <UsageInput
        @inputWasUpdated="onInputUpdate"
        @inputWasReset="onInputReset"
      />
      <div v-if="message" class="flex mt-12 items-center justify-center">
        <p class="text-md text-gray-400">{{ message }}</p>
      </div>
      <div class="mt-12 flex space-x-4 justify-between p-4 lg:p-0">
        <template v-if="!isObjectEmpty(callsInboundUsage)">
          <UsageStats
            title="Calls Inbound Usage"
            :usage="this.callsInboundUsage"
          />
        </template>
        <template v-if="!isObjectEmpty(smsInboundLongcodeUsage)">
          <UsageStats
            title="SMS Inbound Longcode Usage"
            :usage="this.smsInboundLongcodeUsage"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import UsageInput from "./UsageInput.vue";
import { getTwilioUsage } from "../api-client";
import UsageStats from "./UsageStats.vue";
import helpersMixin from "../mixins/helpers";

export default {
  name: "Dashboard",
  components: { UsageInput, UsageStats },
  mixins: [helpersMixin],
  data() {
    return {
      isLoading: false,
      message: "Enter some input to get started 🏃",
      callsInboundUsage: {},
      smsInboundLongcodeUsage: {},
    };
  },
  methods: {
    resetOldUsage() {
      this.callsInboundUsage = {};
      this.smsInboundLongcodeUsage = {};
      this.message = "Enter some input to get started 🏃";
    },
    startLoading() {
      this.isLoading = true;
      this.message = "Loading 👀";
    },
    stopLoading(message) {
      this.isLoading = false;
      this.message = message;
    },
    onInputReset() {
      this.resetOldUsage();
    },
    onInputUpdate(queryParams) {
      this.resetOldUsage();
      this.startLoading();
      getTwilioUsage(queryParams)
        .then((response) => {
          let message = "Here is the results 👀";
          // TODO: handle error
          const usageRecords = response?.data?.data;
          if (usageRecords.length) {
            this.callsInboundUsage = usageRecords.find(
              (u) => u.category == "calls-inbound"
            );
            this.smsInboundLongcodeUsage = usageRecords.find(
              (u) => u.category == "sms-inbound-longcode"
            );
          } else {
            message =
              "The input you have entered doesn't match any usage records 😔";
          }
          this.stopLoading(message);
        })
        .catch((error) => {});
    },
  },
};
</script>
