# Greenspark Assignment

## Overview

This is my attempt on the technical assignment, my goal was to avoid using too many libraries and keep the code base simple given the requirements, for this reason i decided to use tailwind for styling and avoid any design system or ui kit library.

For testing i've used vitest with vue test utils for unit testing, and storybook for visuals.

Given the nature of the assignment, instead of using Vuex for state management, i've opted for
the emit solution, updating the state when interacting with the widget for the _active_ _linked_ and _selectedColor_ options.

## Setup & Installation

**Prerequisites:**
Node.js (>= 18.x)
Yarn or npm

**Installation:**

Clone the repository:

```bash
git clone https://github.com/FabioDessi/greenspark-assignment.git
```

Navigate to the project directory:

```bash
cd greenspark-assignment
```

Install dependencies:

```bash
npm install # or yarn install
```

Start the development server:

```bash
npm run dev # or yarn run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port displayed in your terminal) to view the application.

## Testing

Run the test suite in watch mode:

```bash
npm run test:unit # or yarn run test:unit
```

## Linting

Check code quality and adherence to standards using:

```bash
npm run lint # or yarn run lint
```

```bash
npm run format # or yarn run format
```
