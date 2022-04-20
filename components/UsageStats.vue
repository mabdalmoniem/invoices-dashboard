<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="mt-24 space-y-12 lg:space-y-0 flex space-x-4 justify-between">
    <div v-for="tier in pricing.tiers" :key="tier.title" class="w-full p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
      <div class="flex-1">
        <h3 class="text-xl font-semibold text-gray-900">{{ tier.title }}</h3>
        <p class="mt-4 flex items-baseline text-gray-900">
          <span class="text-5xl font-extrabold tracking-tight">${{ tier.price }}</span>
          <span class="ml-1 text-xl font-semibold">{{ tier.frequency }}</span>
        </p>
        <p class="mt-6 text-gray-500">{{ tier.description }}</p>

        <!-- Feature list -->
        <ul role="list" class="mt-6 space-y-6">
          <li v-for="feature in tier.features" :key="feature" class="flex">
            <CheckIcon class="flex-shrink-0 w-6 h-6 text-indigo-500" aria-hidden="true" />
            <span class="ml-3 text-gray-500">{{ feature }}</span>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { CheckIcon } from '@vue-hero-icons/outline'

export default {
  components: {
    CheckIcon,
  },
  data() {
    return {
      pricing: {
        tiers: [
          {
            title: 'Freelancer',
            price: 24,
            frequency: '/month',
            description: 'The essentials to provide your best work for clients.',
            features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
            cta: 'Monthly billing',
          },
          {
            title: 'Enterprise',
            price: 48,
            frequency: '/month',
            description: 'Dedicated support and infrastructure for your company.',
            features: [
              'Unlimited products',
              'Unlimited subscribers',
              'Advanced analytics',
              '1-hour, dedicated support response time',
              'Marketing automations',
            ],
            cta: 'Monthly billing',
          },
        ],
      }
    }
  }
}
</script>
