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
};

export { baseUrls, authUrls };
