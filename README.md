# Stock Pit Store Management

A React + Redux toolkit application for managing a store, including cart, orders, products, and user authentication. Features Redux Saga for async flows and custom middleware for logging user activity.

## Features

- Product listing, filtering, and details
- Cart management (add, remove, update quantity)
- Order placement and review system
- User authentication (login, edit profile)
- Redux state management with toolkit slices
- Redux Saga for async product fetching
- Custom logger middleware for user actions
- Unit tests with Jest and React Testing Library

## Project Structure

```
src/
  features/
    cart/
    orders/
    products/
    users/
  middleware/
  saga/
  services/
  ui/
  utility/
  constants/
  App.js
  store.js
  index.js
public/
  index.html
  logoIcon.svg
  ...
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

```sh
npm install
```

### Running the App

```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

```sh
npm test
```
Runs Jest unit tests in watch mode.

## Key Files

- [`src/store.js`](src/store.js): Configures Redux store, saga, and middleware.
- [`src/App.js`](src/App.js): Main app component and router.
- [`src/features/products/productSlice.js`](src/features/products/productSlice.js): Product state management.
- [`src/features/cart/cartSlice.js`](src/features/cart/cartSlice.js): Cart state management.
- [`src/features/orders/orderSlice.js`](src/features/orders/orderSlice.js): Orders and reviews state.
- [`src/saga/productSaga.js`](src/saga/productSaga.js): Saga for product fetching.
- [`src/middleware/loggerMiddleware.jsx`](src/middleware/loggerMiddleware.jsx): Logs user actions.

## Testing

Unit tests are located in `_test` or `_tests` folders. Example:
- [`src/features/products/_test/productList.test.jsx`](src/features/products/_test/productList.test.jsx)
- [`src/features/cart/_tests/cartItem.test.jsx`](src/features/cart/_tests/cartItem.test.jsx)


