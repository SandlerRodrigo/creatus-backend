export interface User {
    id: string | number;
    name: string;
    email: string;
    password: string;
    level: 1 | 2 | 3 | 4 | 5;
  }