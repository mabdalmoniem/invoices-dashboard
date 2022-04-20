<template>
  <div class="h-screen p-8 bg-gray-50">
    <div class="h-full max-w-7xl mx-auto px-8 sm:px-6 bg-white rounded-lg">
      <UsageInput />
    </div>
  </div>
</template>

<script>
import UsageInput from "./UsageInput.vue";
export default {
  name: "Dashboard",
  components: { UsageInput },
};
</script>
