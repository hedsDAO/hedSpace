export interface NavLink {
  id: string;
  name: string;
  path: string;
  external: boolean;
  icon: string;
}

export const NavLinks = [
  {
    id: "home",
    name: "home",
    path: "/",
    external: false,
    icon: "fa-sharp fa-home"
  },
  {
    id: "events",
    name: "events",
    path: "/events",
    external: false,
    icon: "fa-sharp fa-calendar"
  },
  {
    id: "admin",
    name: "admin",
    path: "/admin",
    external: false,
    icon: "fa-sharp fa-wrench"
  },
];
