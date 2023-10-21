import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/orders",
    component: () => import("../views/Orders.vue"),
  },
  {
    path: "/products",
    component: () => import("../core/products/views/Products.vue"),
  },
  {
    path: "/create-product",
    component: () => import("../core/products/views/CreateProduct.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
