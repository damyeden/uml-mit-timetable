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
import DialogDeleteProfessor from "./DialogDeleteProfessor";
import DialogModifyProfessor from "./DialogModifyProfessor";
import { Professor } from "./ProfessorManagement";

interface ProfessorListProps {
  professors: Professor[];
}

export default function ProfessorList({ professors }: ProfessorListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Actif";
      case "inactive":
        return "Inactif";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des professeurs</CardTitle>
        <CardDescription>
          Gérez tous vos professeurs depuis cette interface
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Matières</TableHead>
              <TableHead>Heures/semaine</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professors.map((professor) => (
              <TableRow key={professor.id}>
                <TableCell className="font-medium">{professor.name}</TableCell>
                <TableCell>{professor.email}</TableCell>
                <TableCell>{professor.department}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {professor.subjects.map((subject, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{professor.weeklyHours}h</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(professor.status)}>
                    {getStatusLabel(professor.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <DialogModifyProfessor professor={professor} />
                    <DialogDeleteProfessor professor={professor} />
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
