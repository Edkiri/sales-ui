import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/products",
    component: () => import("../core/products/views/Products.vue"),
  },
  {
    path: "/create-product",
    component: () => import("../core/products/views/CreateProduct.vue"),
  },
  {
    path: "/update-product/:id",
    component: () => import("../core/products/views/UpdateProduct.vue"),
  },
  {
    path: "/clients",
    component: () => import("../core/clients/views/Clients.vue"),
  },
  {
    path: "/create-client",
    component: () => import("../core/clients/views/CreateClient.vue"),
  },
  {
    path: "/update-client/:id",
    component: () => import("../core/clients/views/UpdateClient.vue"),
  },
  {
    path: "/sales",
    component: () => import("../core/sales/views/Sales.vue"),
  },
  {
    path: "/create-sale",
    component: () => import("../core/sales/views/CreateSale.vue"),
  },
  {
    path: "/sales/:id",
    component: () => import("../core/sales/views/SaleDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
