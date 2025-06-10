"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useToast } from "@/src/hooks/use-toast";
import { Mention } from "@/src/lib/models/Mention/Mention";
import { type MentionFormValues, mentionSchema } from "./schema/mentionSchema";

export default function DialogAddMention() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<MentionFormValues>({
    resolver: zodResolver(mentionSchema),
    defaultValues: {
      nom: "",
      responsable: "",
      logo: undefined,
    },
  });

  const onSubmit: (data: MentionFormValues) => Promise<void> = async (data) => {
    try {
      setPending(true);

      // Convert FileList to File if needed
      const formData = {
        ...data,
        logo: data.logo && data.logo.length > 0 ? data.logo[0] : null,
      };

      // Logic submit
      await Mention.save(formData);

      // Show success toast
      toast({
        title: "Salle ajoutée",
        description: "La salle a été ajoutée avec succès",
      });

      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);

      // Refresh data if needed
      router.refresh();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la salle",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Building2 className="mr-2 h-4 w-4" />
          Ajouter mention
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter Mention</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la mention. Cliquez sur "Ajouter" lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="MIT" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Mr Tahiry" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          onChange(files);
                        } else {
                          onChange(undefined);
                        }
                      }}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full font-medium text-lg mt-2"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Veuillez patienter...
                </>
              ) : (
                "Ajouter"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
