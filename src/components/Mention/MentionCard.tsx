import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Mention } from "@/src/lib/models/Mention";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface MentionProps {
  mention: Mention;
  className?: string;
}

export default function MentionCard({ mention, className }: MentionProps) {
  return (
    <Card
      key={mention.getMentionId()}
      className={`hover:shadow-lg transition-shadow ${className || ""}`}
    >
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border">
          <Image
            src={mention.logo || "/placeholder.svg"}
            alt={`Logo de ${mention.nom}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{mention.nom}</CardTitle>
          {mention.annee_fondation && (
            <p className="text-sm text-muted-foreground">
              Fondée en {mention.annee_fondation}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Responsable</p>
            <p className="text-sm text-muted-foreground">
              {mention.responsable}
            </p>
          </div>
          <div className="flex justify-between items-center">
            {mention.salles && mention.salles.length > 0 && (
              <Badge variant="outline">{mention.salles.length} salles</Badge>
            )}
          </div>
        </div>
        <div className="w-full mt-4 flex items-center justify-end space-x-2">
          <Link href={`/mention/${mention.getMentionId()}`}>
            <Button size="sm" variant="outline">
              Voir détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
