import type { Meta, StoryObj } from '@storybook/vue3';
import ProductWidget from '../components/ProductWidget.vue';

const meta: Meta<typeof ProductWidget> = {
  title: 'Components/ProductWidget',
  component: ProductWidget,
  argTypes: {
    selectedColor: {
      options: ['blue', 'green', 'beige', 'white', 'black'], 
    },
    active: { control: 'boolean' },
    linked: { control: 'boolean' },
  },
  tags: ['autodocs'],
  args: {
    id: 1,
    type: 'plastic bottles',
    amount: 100,
    action: 'collects',
    active: false,
    linked: false,
    selectedColor: 'blue',
  },
};

export default meta;

type ProductWidgetStory = StoryObj<typeof meta>;

export const Default: ProductWidgetStory = {
  args: {
    selectedColor: 'blue',
  },
};

export const DefaultGreen: ProductWidgetStory = {
  args: {
    selectedColor: 'green',
  },
};

export const DefaultBeige: ProductWidgetStory = {
  args: {
    selectedColor: 'beige',
  },
};

export const LinkedToPublicProfile: ProductWidgetStory = {
  args: {
    linked: true,
  },
};

export const UnlinkedToPublicProfile: ProductWidgetStory = {
  args: {
    linked: false,
  },
};

export const ActiveBadge: ProductWidgetStory = {
  args: {
    active: true,
  },
};

export const InactiveBadge: ProductWidgetStory = {
  args: {
    active: false,
  },
};


