export default [
  {
    path: "/",
    meta: { name: "Home" },
    component: () => import("../views/Home"),
  },
  {
    path: "/plano-de-gestao",
    meta: { name: "Plano de Gestão" },
    component: () => import("../views/Plano"),
  },
  {
    path: "/contato",
    meta: { name: "Contato" },
    component: () => import("../views/Contato"),
  },
  {
    path: "/na-midia",
    meta: { name: "Na Mídia" },
    component: () => import("../views/Midia"),
  },
  {
    path: "/login",
    meta: { name: "Login" },
    component: () => import("../views/Login"),
  },
  {
    path: "/quem-sou",
    meta: { name: "Quem Sou" },
    component: () => import("../views/SobreMim"),
  },
  {
    path: "*",
    redirect: "/"
  }
];
