<script lang="ts" setup>
import type { StepBare } from '@mono/server/src/shared/entities'

const { step } = defineProps<{
  step: StepBare
}>()
</script>

<template>
  <div class="flex flex-row-">
  <div class="flex flex-col flex-wrap justify-between gap-2 p-4">
    <div class="font-customFont text-sm font-semibold text-gray-900">
      {{ step.name }}:
    </div>
     <div class="font-customFont text-sm text-gray-700">
      <p >
        {{ step.description }}
      </p>
    </div>
  </div>
</div>
</template>

