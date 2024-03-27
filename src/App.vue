<script setup lang="ts">
import ProductWidget from './components/ProductWidget.vue'
import { ref, onMounted } from 'vue'

import type { Ref } from 'vue'
import type { ProductWidgetProps, UpdateWidgetStateParams } from './types'

const data: Ref<ProductWidgetProps[]> = ref([])
const loading = ref(true)
const errorMessage = ref('')

function updateWidgetState({ id, selectedColor, linked, active }: UpdateWidgetStateParams) {
  const widgetIndex = data.value.findIndex((widget) => widget.id === id)

  if (widgetIndex === -1) return // Early return if widget is not found

  // When updating properties, doing it in a batch ensures Vue tracks them reactively
  const widgetToUpdate = { ...data.value[widgetIndex] }

  if (selectedColor !== undefined) widgetToUpdate.selectedColor = selectedColor
  if (linked !== undefined) widgetToUpdate.linked = linked
  if (active !== undefined) {
    data.value = data.value.map((widget, index) => {
      if (index === widgetIndex) {
        return {
          ...widget,
          active,
          selectedColor: widgetToUpdate.selectedColor,
          linked: widgetToUpdate.linked
        }
      }
      return active ? { ...widget, active: false } : widget
    })
  } else {
    // Directly update the widget if not dealing with active state
    data.value[widgetIndex] = widgetToUpdate
  }
}

onMounted(async () => {
  try {
    const response = await fetch('https://api.mocki.io/v2/016d11e8/product-widgets')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    data.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch: ', error)
    errorMessage.value = 'Failed to load data'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <div class="container mx-auto p-8 rounded-lg max-w-[851px]">
      <h3 class="font-cabin font-bold text-3xl">Per product widgets</h3>
      <hr class="mt-3 mb-5 border-2 border-[#B0B0B0]" />
      <span v-if="loading" class="block font-cabin font-bold text-xl text-center py-4"
        >Loading...</span
      >
      <span v-if="errorMessage" class="block font-cabin font-bold text-xl text-center py-4">{{
        errorMessage
      }}</span>
      <div v-if="!loading && !errorMessage" class="flex flex-row justify-between">
        <div v-for="widget in data" :key="widget.id" class="flex flex-row">
          <ProductWidget
            :id="widget.id"
            :action="widget.action"
            :type="widget.type"
            :amount="widget.amount"
            :active="widget.active"
            :linked="widget.linked"
            :selectedColor="widget.selectedColor"
            @updateWidgetState="updateWidgetState"
          />
        </div>
      </div>
    </div>
  </main>
</template>
