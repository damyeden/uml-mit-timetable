import { z } from "zod";

export const addRoomSchema = z.object({
  nom: z.string().min(3, { message: "Please enter valid salle name" }),
  capacite: z.coerce
    .number()
    .min(1, { message: "Capacity must be at least 1" }),
  photo: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0)
    .optional(),
  equipements: z.array(z.number()).optional(),
});

export type addRoomFormValues = z.infer<typeof addRoomSchema>;
