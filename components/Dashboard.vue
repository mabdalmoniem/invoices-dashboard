<template>
  <div class="h-screen p-8 bg-gray-50">
    <div class="max-w-7xl mx-auto p8 sm:p-6 bg-white rounded-lg">
      <UsageInput @inputWasUpdated="onInputUpdate" />
      <div class="space-y-12 lg:space-y-0 flex space-x-4 justify-between">
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
      callsInboundUsage: {},
      smsInboundLongcodeUsage: {},
    };
  },
  methods: {
    resetOldUsage() {
      this.callsInboundUsage = {};
      this.smsInboundLongcodeUsage = {};
    },
    onInputUpdate(queryParams) {
      this.isLoading = true;
      this.resetOldUsage();
      getTwilioUsage(queryParams)
        .then((response) => {
          this.isLoading = false;
          // TODO: handle error
          const usageRecords = response?.data?.usage_records;
          if (usageRecords.length) {
            this.callsInboundUsage = usageRecords.find(
              (u) => u.category == "calls-inbound"
            );
            this.smsInboundLongcodeUsage = usageRecords.find(
              (u) => u.category == "sms-inbound-longcode"
            );
          }
        })
        .catch((error) => {});
    },
  },
};
</script>
