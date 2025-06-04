import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export default function Legend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Légende</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-300 rounded"></div>
            <span className="text-sm">Cours magistral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-l-4 border-green-300 rounded"></div>
            <span className="text-sm">Travaux dirigés (TD)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border-l-4 border-purple-300 rounded"></div>
            <span className="text-sm">Travaux pratiques (TP)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
