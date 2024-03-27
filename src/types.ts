export type WidgetType = 'carbon' | 'plastic bottles' | 'trees'
export type WidgetAction = 'collects' | 'plants' | 'offsets'
export type WidgetColor = 'white' | 'black' | 'blue' | 'green' | 'beige'

export interface ProductWidgetProps {
  id: number
  type: WidgetType
  amount: number
  action: WidgetAction
  active: boolean
  linked: boolean
  selectedColor: WidgetColor
}

export interface UpdateWidgetStateParams {
  id: number
  selectedColor?: WidgetColor
  linked?: boolean
  active?: boolean
}

export type WidgetPropertyUpdate = {
  selectedColor?: WidgetColor
  linked?: boolean
  active?: boolean
}

export type WidgetUpdatePayload = {
  id: number
} & WidgetPropertyUpdate

export type ColorOption = {
  name: WidgetColor
  class: string
}
