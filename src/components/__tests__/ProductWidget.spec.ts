import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductWidget from '../ProductWidget.vue'

import type { ProductWidgetProps } from '../types'

const mockProps: ProductWidgetProps = {
  id: 1,
  type: 'plastic bottles',
  amount: 100,
  action: 'collects',
  active: true,
  linked: true,
  selectedColor: 'green'
}

function setupAndMount() {
  return mount(ProductWidget, {
    props: { ...mockProps }
  })
}

describe('ProductWidget', () => {
  it('renders with given props', () => {
    const wrapper = setupAndMount()

    const spanElements = wrapper.findAll('span')
    expect(spanElements[0].text()).toBe(`This product ${mockProps.action}`)
    expect(spanElements[1].text()).toBe(`${mockProps.amount} ${mockProps.type}`)

    const linkedCheckbox = wrapper.find('#linked')
    expect(linkedCheckbox.element.checked).toBe(mockProps.linked)

    const activeToggle = wrapper.find('[data-test="active-toggle"]')
    expect(activeToggle.classes()).toContain('border-[#B0B0B0]')
    expect(activeToggle.classes()).toContain('bg-gs-green')
    expect(activeToggle.classes()).not.toContain('border-[#AFC6BD]')

    const badge = wrapper.find('[data-test="badge"]')
    expect(badge.classes()).toContain(`bg-gs-${mockProps.selectedColor}`)

    const activeBadgeColor = wrapper.find(`[data-test="badge-color-${mockProps.selectedColor}"]`)
    expect(activeBadgeColor.classes()).toContain(`bg-gs-${mockProps.selectedColor}`)
    expect(activeBadgeColor.classes()).toContain('border-[#B0B0B0]')
    expect(activeBadgeColor.classes()).not.toContain('bg-gs-blue')
  })

  it('emits updateWidgetState when the linked checkbox is toggled', async () => {
    const wrapper = setupAndMount();

    // Find the checkbox and trigger a click event
    const linkedCheckbox = wrapper.find('#linked');
    await linkedCheckbox.setValue(!mockProps.linked)

    // Check if the emit was called correctly
    expect(wrapper.emitted()).toHaveProperty('updateWidgetState');
    const emittedEvent = wrapper.emitted('updateWidgetState');
    expect(emittedEvent?.[0]).toEqual([{ id: mockProps.id, linked: !mockProps.linked }]);
  });

  it('emits updateWidgetState when a color option is clicked', async () => {
    const wrapper = setupAndMount();
    const newColor = 'blue';

    // Find the div for the new color and trigger a click event
    const newBadgeColor = wrapper.find(`[data-test="badge-color-${newColor}"]`);
    await newBadgeColor.trigger('click');

    // Verify the emit
    expect(wrapper.emitted()).toHaveProperty('updateWidgetState');
    const emittedEvent = wrapper.emitted('updateWidgetState');
    expect(emittedEvent?.[0]).toEqual([{ id: mockProps.id, selectedColor: newColor }]);
  });

  it('emits updateWidgetState when the active toggle is clicked', async () => {
    const wrapper = setupAndMount();

    // Find the active toggle and click it
    const activeToggle = wrapper.find('[data-test="active-toggle"]');
    await activeToggle.trigger('click');

    // Assert that the correct event was emitted with the right payload
    expect(wrapper.emitted()).toHaveProperty('updateWidgetState');
    const emittedEvent = wrapper.emitted('updateWidgetState');
    expect(emittedEvent?.[0]).toEqual([{ id: mockProps.id, active: !mockProps.active }]);
  });
})
