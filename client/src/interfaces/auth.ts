export interface IUserInput {
  name: {
    first: string;
    last: string;
  };
  image: {
    alt: string;
    url: string;
  };
  email: string;
  password: string;
  role?: UserRole;
}

export interface IUser extends IUserInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJWTPayload {
  role: UserRole
  _id: string
}

export type UserRole = "admin" | "basic";
