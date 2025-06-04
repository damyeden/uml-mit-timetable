import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

export const getRequiredUser = async () => {
  const user = await getUser();

  if (!user) {
    //or call unauthorized()
    redirect("/login");
  }

  return user;
};
