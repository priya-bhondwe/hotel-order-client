export default {
  serverBaseUrl: "https://hotel-order-app.onrender.com",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    tables: {
      create: "/tables",
      update: "/tables/",
      delete: "/tables/",
      getOne: "/tables/",
      getAll: "/tables",
    },
    dishes: {
      create: "/dishes",
      update: "/dishes/",
      delete: "/dishes/",
      getOne: "/dishes/",
      getAll: "/dishes",
    },
    data: {
      create: "/data",
      update: "/data/",
      delete: "/data/",
      getOne: "/data/",
      getAll: "/data",
    },
    orders: {
      create: "/orders",
      update: "/orders/",
      delete: "/orders/",
      getOne: "/orders/getOne",
      getAll: "/orders",
    },
    auth: {
      userLogin: "/auth/login",
      passwordResetLink: "/auth/password-reset-link",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
  },
};
