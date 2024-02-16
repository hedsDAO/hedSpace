export interface NavLink {
  id: string;
  name: string;
  path: string;
  external: boolean;
}

export const NavLinks = [
  {
    id: "events",
    name: "events",
    path: "/",
    external: false,
  },
  // {
  //   id: "past-events",
  //   name: "past events",
  //   path: "/past-events",
  //   external: false,
  // },
];
