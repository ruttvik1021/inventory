const baseUrls = {
  auth: "http://localhost:3001",
  inventory: "http://localhost:3002",
};

const authUrls = {
  signUp: "/api/auth/signup",
  signIn: "/api/auth/signin",
  signOut: "/api/auth/signout",
  currentUser: "/api/auth/currentuser",
  completeProfile: "/api/auth/completeprofile",
  forgotPassword: "/api/auth/forgotpassword",
  countryList: "/api/auth/countryList",
  indutryList: "/api/auth/industries",
};

const inventoryUrls = {
  createCategory: "/api/create/category",
  getAllCategories: "/api/getAll/category",
  updateCategory: "/api/update/category",
  deleteCategory: "/api/delete/category",
  getCategoryByID: "/api/getCategory",

  getAllProducts: "/api/getAll/Products",
};

export { baseUrls, authUrls, inventoryUrls };
