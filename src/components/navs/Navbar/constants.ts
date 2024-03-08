export interface NavLink {
  id: string;
  name: string;
  path: string;
  external: boolean;
}

export const NavLinks = [
  {
    id: "home",
    name: "home",
    path: "/",
    external: false,
  },
  {
    id: "events",
    name: "events",
    path: "/events",
    external: false,
  },
  // {
  //   id: "about",
  //   name: "about",
  //   path: "/about",
  //   external: false,
  // },
];
