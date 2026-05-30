declare global {
  namespace Express {
    interface UserPayload {
      id: number;
      email: string;
      role: "customer" | "admin";
    }

    interface Request {
      user?: UserPayload;
      validated?: unknown;
    }
  }
}

export {};
