import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role_id?: number | null;
      village?: string | null;
      city?: string | null;
      province?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role_id?: number | null;
    village?: string | null;
    city?: string | null;
    province?: string | null;
    latitude?: number | null;
    longitude?: number | null;
  }
}