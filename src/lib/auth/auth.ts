/**
 * Utility to not recall stuff on each page that needs a session
 */

import { getServerSession } from "next-auth";
import { authConfig } from "../../../pages/api/auth/[...nextauth]";

export async function getAuthSession() {
  return getServerSession(authConfig);
}

export async function getRequiredAuthSession() {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Required session!");
  }
  return session;
}

export async function isAuthenticated() {
  const session = await getAuthSession();
  return session?.user;
}
