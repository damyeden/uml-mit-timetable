"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Check,
  ChevronsUpDown,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { useToast } from "@/src/hooks/use-toast";
import { cn } from "@/src/lib/utils";
import { addEquipment, addSalle } from "./action";
import { type addRoomFormValues, addRoomSchema } from "./schema/addRoomSchema";

type Equipment = {
  equipmentId: number;
  equipmentType: string;
  createdAt: string | null | undefined;
  updateAt: string | null | undefined;
};

interface DialogAddRoomProps {
  mentionId: number;
  equipments: Equipment[];
}

export default function DialogAddRoom({
  mentionId,
  equipments,
}: DialogAddRoomProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [equipmentsList, setEquipmentsList] = useState<Equipment[]>(equipments);
  const [newEquipment, setNewEquipment] = useState("");
  const [isAddingEquipment, setIsAddingEquipment] = useState(false);
  const [equipmentPopoverOpen, setEquipmentPopoverOpen] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<addRoomFormValues>({
    resolver: zodResolver(addRoomSchema),
    defaultValues: {
      nom: "",
      capacite: 1,
      photo: undefined,
      equipements: [],
    },
  });

  const selectedEquipmentIds = form.watch("equipements") || [];

  const addNewEquipment = async () => {
    if (newEquipment.trim()) {
      // Check if equipment type already exists
      const existingEquipment = equipmentsList.find(
        (eq) =>
          eq.equipmentType.toLowerCase() === newEquipment.trim().toLowerCase()
      );

      if (!existingEquipment) {
        // Create a temporary equipment object with a negative ID for new items

        const newEquipmentObj = (await addEquipment(newEquipment)) as Equipment;

        const updatedList = [...equipmentsList, newEquipmentObj];
        setEquipmentsList(updatedList);

        // Add to selected equipments
        const currentEquipments = form.getValues("equipements") || [];
        form.setValue("equipements", [
          ...currentEquipments,
          newEquipmentObj.equipmentId,
        ]);
      }

      setNewEquipment("");
      setIsAddingEquipment(false);
    }
  };

  const removeEquipment = (equipmentId: number) => {
    const updatedEquipments = selectedEquipmentIds.filter(
      (id) => id !== equipmentId
    );
    form.setValue("equipements", updatedEquipments);
  };

  const toggleEquipment = (equipmentId: number) => {
    const currentEquipments = selectedEquipmentIds;
    const updatedEquipments = currentEquipments.includes(equipmentId)
      ? currentEquipments.filter((id) => id !== equipmentId)
      : [...currentEquipments, equipmentId];

    form.setValue("equipements", updatedEquipments);
  };

  const getSelectedEquipmentNames = () => {
    return selectedEquipmentIds
      .map((id) => {
        const equipment = equipmentsList.find((eq) => eq.equipmentId === id);
        return equipment ? equipment.equipmentType : "";
      })
      .filter((name) => name !== "");
  };

  const onSubmit = async (data: addRoomFormValues) => {
    try {
      setPending(true);

      // Convert FileList to File if needed
      const formData = {
        ...data,
        photo: data.photo && data.photo.length > 0 ? data.photo[0] : null,
        equipments: data.equipements,
      };

      // Logic submit
      await addSalle(formData, mentionId);

      toast({
        title: "Salle ajoutée",
        description: "La salle a été ajoutée avec succès",
      });

      form.reset();
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error adding room:", error);
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
          Ajouter salle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter Salle</DialogTitle>
          <DialogDescription>
            Remplissez les informations de la salle. Cliquez sur "Ajouter"
            lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la salle</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Salle A101" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="capacite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacité</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="30"
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="equipements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipements</FormLabel>
                  <div className="space-y-2">
                    <Popover
                      open={equipmentPopoverOpen}
                      onOpenChange={setEquipmentPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            type="button"
                            className={cn(
                              "w-full justify-between",
                              !selectedEquipmentIds.length &&
                                "text-muted-foreground"
                            )}
                          >
                            {selectedEquipmentIds.length > 0
                              ? `${selectedEquipmentIds.length} équipement(s) sélectionné(s)`
                              : "Sélectionner des équipements"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput placeholder="Rechercher un équipement..." />
                          <CommandList>
                            <CommandEmpty>
                              Aucun équipement trouvé.
                            </CommandEmpty>
                            <CommandGroup>
                              {equipmentsList.map((equipment) => (
                                <CommandItem
                                  key={equipment.equipmentId}
                                  value={equipment.equipmentType}
                                  onSelect={() =>
                                    toggleEquipment(equipment.equipmentId)
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedEquipmentIds.includes(
                                        equipment.equipmentId
                                      )
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {equipment.equipmentType}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                          <div className="border-t p-2">
                            {!isAddingEquipment ? (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => setIsAddingEquipment(true)}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Ajouter un nouvel équipement
                              </Button>
                            ) : (
                              <div className="flex gap-2">
                                <Input
                                  placeholder="Nom de l'équipement"
                                  value={newEquipment}
                                  onChange={(e) =>
                                    setNewEquipment(e.target.value)
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addNewEquipment();
                                    }
                                    if (e.key === "Escape") {
                                      setIsAddingEquipment(false);
                                      setNewEquipment("");
                                    }
                                  }}
                                  className="flex-1 overflow-hidden resize-none"
                                  autoComplete="off"
                                />
                                <Button
                                  type="button"
                                  size="sm"
                                  onClick={addNewEquipment}
                                  disabled={!newEquipment.trim()}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setIsAddingEquipment(false);
                                    setNewEquipment("");
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Affichage des équipements sélectionnés */}
                    {selectedEquipmentIds.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {getSelectedEquipmentNames().map(
                          (equipmentName, index) => {
                            const equipmentId = selectedEquipmentIds[index];
                            return (
                              <Badge
                                key={equipmentId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {equipmentName}
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                                  onClick={() => removeEquipment(equipmentId)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            );
                          }
                        )}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
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
