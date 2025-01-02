export const headerLinks = [
  {
    label: "Home",
    route: "/",
    isProtected: false,
  },
  {
    label: "Create Event",
    route: "/events/create",
    isProtected: true,
  },
  {
    label: "My Profile",
    route: "/profile",
    isProtected: true,
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};
