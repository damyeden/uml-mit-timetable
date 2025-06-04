import { Badge } from "@/src/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import DialogDeleteUE from "./DialogDeleteUE";
import DialogModifyUE from "./DialogModifyUE";
import { UE } from "./UEManagement";

interface UEListProps {
  ues: UE[];
}

export default function UEList({ ues }: UEListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des UE</CardTitle>
        <CardDescription>
          Gérez toutes vos Unités d&apos;Enseignement depuis cette interface
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Crédits</TableHead>
              <TableHead>Heures</TableHead>
              <TableHead>Semestre</TableHead>
              <TableHead>Professeur</TableHead>
              <TableHead>Étudiants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ues.map((ue) => (
              <TableRow key={ue.id}>
                <TableCell className="font-medium">{ue.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{ue.code}</Badge>
                </TableCell>
                <TableCell>{ue.credits} ECTS</TableCell>
                <TableCell>{ue.hours}h</TableCell>
                <TableCell>
                  <Badge variant="secondary">{ue.semester}</Badge>
                </TableCell>
                <TableCell>{ue.professor}</TableCell>
                <TableCell>{ue.students}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <DialogModifyUE ue={ue} />
                    <DialogDeleteUE ue={ue} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
