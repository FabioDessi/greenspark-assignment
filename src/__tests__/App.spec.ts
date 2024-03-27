import { describe, it, expect, vi, afterAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import App from '../App.vue'

import type { Mock } from 'vitest'

const mockData = [
  {
    id: 1,
    type: 'plastic bottles',
    amount: 100,
    action: 'collects',
    active: true,
    linked: true,
    selectedColor: 'green'
  }
]

function setupAndMount() {
  return mount(App, {
    global: {
      stubs: {
        ProductWidget: {
          template: '<span data-test="product-widget" />'
        }
      }
    }
  })
}

afterAll(() => {
  vi.restoreAllMocks()
})

describe('App.vue', () => {
  it('loads and displays widgets on successful fetch', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData)
      })
    ) as Mock

    const wrapper = setupAndMount()
    expect(wrapper.find('span').text()).toBe('Loading...')

    await flushPromises()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(wrapper.findAll('[data-test="product-widget"]').length).toBe(1)
  })

  it('handles fetch error gracefully', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as Mock

    const wrapper = setupAndMount()
    expect(wrapper.find('span').text()).toBe('Loading...')

    await flushPromises()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(wrapper.find('span').text()).toBe('Failed to load data')
  })
})
