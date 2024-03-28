<script setup lang="ts">
import GSLogo from '../assets/gs-logo.vue'
import InfoIcon from '../assets/info-icon.vue'
import { ref, onUnmounted } from 'vue'
import { colorOptions } from '../config'

import type {
  ProductWidgetProps,
  WidgetPropertyUpdate,
  WidgetColor,
  WidgetUpdatePayload
} from '../types.ts'

const emit = defineEmits(['updateWidgetState'])
const props = defineProps<ProductWidgetProps>()
const showTooltip = ref(false)
const tooltipVisibilityDelay = 250
let hideTooltipTimeoutId: number | null = null

function showTooltipNow() {
  if (hideTooltipTimeoutId !== null) {
    clearTimeout(hideTooltipTimeoutId)
    hideTooltipTimeoutId = null
  }
  showTooltip.value = true
}

function hideTooltipSoon() {
  if (hideTooltipTimeoutId !== null) {
    clearTimeout(hideTooltipTimeoutId)
  }
  hideTooltipTimeoutId = window.setTimeout(() => {
    showTooltip.value = false
    hideTooltipTimeoutId = null
  }, tooltipVisibilityDelay)
}

function updateWidgetProperty(property: keyof WidgetPropertyUpdate, value: boolean | WidgetColor) {
  const payload: WidgetUpdatePayload = { id: props.id, [property]: value }
  emit('updateWidgetState', payload)
}

onUnmounted(() => {
  if (hideTooltipTimeoutId !== null) {
    clearTimeout(hideTooltipTimeoutId)
  }
})
</script>

<template>
  <div class="w-56">
    <div
      data-test="badge"
      class="rounded-md w-56 py-2.5 px-3 flex flex-row flex-wrap justify-start mb-2.5"
      :class="colorOptions.find((option) => option.name === props.selectedColor)?.class"
    >
      <div>
        <GSLogo
          :class="
            props.selectedColor === 'white' || props.selectedColor === 'beige'
              ? 'fill-gs-green'
              : 'fill-gs-white'
          "
        />
      </div>
      <div
        class="flex flex-col ml-3 justify-center"
        :class="
          props.selectedColor === 'white' || props.selectedColor === 'beige'
            ? 'text-gs-green'
            : 'text-gs-white'
        "
      >
        <span class="font-cabin text-xs mb-1">This product {{ props.action }}</span>
        <span class="font-cabin font-bold text-md">{{ props.amount }} {{ props.type }}</span>
      </div>
    </div>
    <div>
      <div class="flex justify-between mb-2.5">
        <label class="flex flex-row" :for="`linked-${props.id}`">
          <span class="font-cabin text-sm text-gs-green">Link to public profile</span>
          <a
            tabindex="0"
            role="link"
            aria-label="tooltip"
            :aria-haspopup="true"
            :aria-expanded="showTooltip"
            @mouseover="showTooltipNow"
            @mouseout="hideTooltipSoon"
            class="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
          >
            <InfoIcon class="cursor-pointer" />
            <div
              v-show="showTooltip"
              id="tooltip"
              role="tooltip"
              class="tooltip-wrapper z-20 -mt-20 w-[250px] absolute left-0 ml-5 bg-white py-4 px-6 rounded"
              @mouseover="showTooltipNow"
              @mouseout="hideTooltipSoon"
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
          :id="`linked-${props.id}`"
          :checked="props.linked"
          @change="
            (event) => updateWidgetProperty('linked', (event.target as HTMLInputElement).checked)
          "
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
            class="w-10 h-5 flex items-center rounded-[34px] cursor-pointer box-border border relative active-toggle-wrapper"
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

<style scoped>
.active-toggle-wrapper {
  box-shadow: inset 0.88px 5.9px rgba(0, 0, 0, 0.015);
}

.tooltip-wrapper {
  box-shadow:
    0px 42px 76px rgba(0, 0, 0, 0.05),
    0px 27.22px 44.51px rgba(0, 0, 0, 0.038),
    0px 16.18px 24.21px rgba(0, 0, 0, 0.03),
    0px 8.4px 12.35px rgba(0, 0, 0, 0.025),
    0px 3.42px 6.19px rgba(0, 0, 0, 0.019),
    0px 0.78px 2.99px rgba(0, 0, 0, 0.012);
}
</style>
