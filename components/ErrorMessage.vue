<template>
  <div v-if="message" class="flex mt-8 items-center justify-center">
    <span class="rounded p-2 text-sm bg-red-50 text-red-400">
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
