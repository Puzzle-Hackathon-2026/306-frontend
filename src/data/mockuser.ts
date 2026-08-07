export interface MockUser {
  name: string;
  email: string;
  password: string;
  neighborhood: string;
  memberSince: string;
}

export const mockUser: MockUser = {
  name: "Ana Rodríguez",
  email: "ana@smartcity.com",
  password: "123456",
  neighborhood: "Colonia Trejo",
  memberSince: "06 de agosto de 2026",
};

export const neighborhoods = [
  "Colonia Trejo",
  "Barrio Río de Piedras",
  "Colonia Universidad",
  "Colonia Moderna",
];
