import { z } from "zod";

export const mentionSchema = z.object({
  nom: z.string().min(3, { message: "Please enter valid name mention" }),
  responsable: z
    .string()
    .min(1, { message: "Please enter a responsable name" }),
  logo: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0)
    .optional(),
});

export type MentionFormValues = z.infer<typeof mentionSchema>;
