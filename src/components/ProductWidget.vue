<script setup lang="ts">
import GSLogo from '../assets/gs-logo.vue'
import InfoIcon from '../assets/info-icon.vue'
import { ref, computed } from 'vue'
import { colorOptions } from '../config.ts'

import type { ProductWidgetProps } from '../types.ts'

const emit = defineEmits(['updateWidgetState'])
const props = defineProps<ProductWidgetProps>()

const showTooltip = ref(false)

function toggleTooltip() {
  showTooltip.value = !showTooltip.value
}

function updateWidgetProperty(property, value) {
  const payload = { id: props.id }
  payload[property] = value

  emit('updateWidgetState', payload)
}

const bgColorClass = computed(() => {
  const colorClass = `bg-${props.selectedColor}`
  // Check if the constructed class name exists in your colorOptions.
  const isValidColor = colorOptions.some((option) => option.class === colorClass)
  return isValidColor ? colorClass : 'bg-gs-blue' // Default to 'bg-gs-blue' if not valid.
})
</script>

<template>
  <div class="w-56">
    <div
      data-test="badge"
      class="rounded-md w-56 py-2.5 px-3 flex flex-row flex-wrap justify-start mb-2.5 shadow-gs-shadow"
      :class="colorOptions.find((option) => option.name === props.selectedColor)?.class"
    >
      <div>
        <GSLogo />
      </div>
      <div class="text-white flex flex-col ml-3 justify-center">
        <span class="font-cabin text-xs mb-1">This product {{ props.action }}</span>
        <span class="font-cabin font-bold text-md">{{ props.amount }} {{ props.type }}</span>
      </div>
    </div>
    <div>
      <div class="flex justify-between mb-2.5">
        <label class="flex flex-row" for="linked">
          <span class="font-cabin text-sm text-gs-green">Link to public profile</span>
          <a
            tabindex="0"
            role="link"
            aria-label="tooltip"
            :aria-haspopup="true"
            :aria-expanded="showTooltip.toString()"
            @mouseover="showTooltip = true"
            @focus="showTooltip = true"
            @mouseout="showTooltip = false"
            @blur="showTooltip = false"
            @keydown.space.prevent="toggleTooltip"
            @keydown.enter.prevent="toggleTooltip"
            class="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
          >
            <div class="cursor-pointer">
              <InfoIcon />
            </div>
            <div
              v-if="showTooltip"
              id="tooltip"
              role="tooltip"
              class="z-20 -mt-20 w-[250px] absolute transition duration-150 ease-in-out left-0 ml-3 shadow-lg bg-white py-4 px-6 rounded"
            >
              <p class="font-cabin font-normal text-sm text-gs-black text-center">
                This widget links directly to your public profile so that you can easily share your
                impact with your customers. Turn it off here if you do not want the badge to link to
                it.
              </p>
              <div class="flex flex-row justify-center mt-3">
                <a href="#" target="_blank" class="font-cabin font-bold text-sm text-gs-green"
                  >View public profile</a
                >
              </div>
            </div>
          </a>
        </label>
        <input
          type="checkbox"
          id="linked"
          :checked="props.linked"
          @change="(event) => updateWidgetProperty('linked', event.target.checked)"
          class="appearance-none checked:appearance-auto w-[18px] h-[18px] rounded border-2 border-gs-black accent-gs-green relative peer cursor-pointer before:content[''] before:absolute before:block before:h-[36px] before:w-[36px] before:rounded-full before:bg-gs-light-green before:opacity-0 before:-translate-y-2/4 before:-translate-x-2/4 before:top-2/4 before:left-2/4 hover:before:opacity-10"
        />
      </div>

      <div class="flex justify-between mb-2.5">
        <span class="font-cabin text-sm text-gs-green">Badge Color</span>
        <div class="flex space-x-2">
          <div
            v-for="option in colorOptions"
            :key="option.name"
            class="w-4 h-4 cursor-pointer"
            :class="[
              option.class,
              { 'border-[1.5px] border-[#B0B0B0]': selectedColor === option.name }
            ]"
            @click="updateWidgetProperty('selectedColor', option.name)"
            :data-test="'badge-color-' + option.name"
          ></div>
        </div>
      </div>

      <div class="flex justify-between mb-2.5">
        <span class="font-cabin text-sm text-gs-green">Activate badge</span>
        <div>
          <div
            data-test="active-toggle"
            class="w-10 h-5 flex items-center rounded-[34px] cursor-pointer box-border border relative"
            :class="[props.active ? 'bg-gs-green border-[#B0B0B0]' : 'border-[#AFC6BD]']"
            @click="updateWidgetProperty('active', !props.active)"
          >
            <div
              class="bg-white w-5 h-5 rounded-full transform border -ml-[1px] before:content before:content[''] before:absolute before:block before:h-7 before:w-7 before:rounded-full before:bg-gs-light-green before:opacity-0 before:-translate-y-2/4 before:-translate-x-2/4 before:top-2/4 before:left-2/4 hover:before:opacity-10"
              :class="[props.active ? 'translate-x-5 border-gs-green' : 'border-[#F2EBDB]']"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
