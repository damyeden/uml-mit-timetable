import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./email";
import { Person } from "./models/Person";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,

    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      const { error } = await resend.emails.send({
        from: process.env.SENDER_EMAIL || "Acme <onboarding@resend.dev>",
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
      if (error) {
        console.error("Error sending email:", error);
      }
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newSession = ctx.context.newSession;
      if (!newSession) return;

      const { user } = newSession;

      const person = await Person.getPersonFromUserId(user.id);

      console.log(person);
    }),
  },

  plugins: [nextCookies()],

  databaseHooks: {
    user: {
      create: {
        after: async (created) => {
          try {
            const user = await prisma.user.findUnique({
              where: {
                id: created.id,
              },
              select: {
                role: true,
              },
            });

            const person = await prisma.person.create({
              data: {
                lastname: created.name,
                user: { connect: { id: created.id } },
              },
            });

            if (user?.role === "ADMIN") {
              await prisma.admin.create({
                data: {
                  person: { connect: { personId: person.personId } },
                },
              });
            } else if (user?.role === "PROFESSOR") {
              await prisma.professor.create({
                data: {
                  person: { connect: { personId: person.personId } },
                },
              });
            } else if (user?.role === "STUDENT") {
              await prisma.student.create({
                data: {
                  person: { connect: { personId: person.personId } },
                },
              });
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    },
  },
});
