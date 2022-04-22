<template>
  <div v-if="message" class="flex mt-12 items-center justify-center">
    <p class="text-md text-gray-400">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
