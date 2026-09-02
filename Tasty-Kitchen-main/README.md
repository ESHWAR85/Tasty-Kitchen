# Tasty Kitchens

A React app (Vite + react-router v7) built to the Tasty Kitchens project spec:
login/auth, home feed with offers carousel + sortable/paginated restaurant
list, restaurant detail page, and a cart backed by Local Storage.

## Setup

```
npm install
npm run dev
```

## Structure

```
src/
  App.jsx                 routes + shared sortByOptions
  main.jsx                BrowserRouter + StrictMode entry
  components/
    Header/                navbar (logo, Home/Cart links, logout, mobile menu)
    Home/                  offers carousel, popular restaurants, sort by, pagination
    RestaurantsHeader/     "Popular Restaurants" heading + sort-by select
    RestaurantDetails/     single restaurant page + food items
    FoodItems/             one food item card (add / +/- quantity)
    Cart/                  cart page (+/- quantity, total, place order)
    CartEmpty/             empty-cart state
    Footer/                footer with social icons
    LoginForm/             /login
    NotFound/               404 / unknown routes
    ProtectedRoute/        redirects to /login when no jwt_token cookie
    SomethingWentWrong/    reusable API-failure view with retry
```

## Notes on the spec

- Auth token is stored as a cookie named `jwt_token` (js-cookie).
- Cart items are persisted in `localStorage` under the key `cartData`, with
  each entry shaped exactly as `{cost, quantity, id, imageUrl, name}`.
- All the `testid`/`alt` attributes called out in the project brief are
  wired up (e.g. `restaurant-item`, `pagination-left-button`,
  `active-page-number`, `foodItem`, `cartItem`, `total-price`, the four
  footer social-icon testids, etc.).
- Sort By defaults to **Lowest**, using the shared `sortByOptions` object
  exported from `src/App.jsx`.
- Loading uses the `Oval` loader from `react-loader-spinner`
  (`color="gold"`, `height={40}`, `width={50}`).
- The offers carousel uses `react-slick` per the project's quick tip.
