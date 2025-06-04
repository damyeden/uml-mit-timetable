import { Role } from "@/src/components/Auth/schema/signupSchema";
import { Badge } from "@/src/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { useRef } from "react";
import { ScheduleEvent } from "../Timetable";
import DialogDeleteEvent from "./DialogDeleteEvent";
import DialogModifyEvent from "./DialogModifyEvent";

const getEventColor = (type: string) => {
  switch (type) {
    case "cours":
      return "bg-blue-100 border-blue-300 text-blue-800";
    case "td":
      return "bg-green-100 border-green-300 text-green-800";
    case "tp":
      return "bg-purple-100 border-purple-300 text-purple-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-800";
  }
};

const getEventHoverColor = (type: string) => {
  switch (type) {
    case "cours":
      return "bg-blue-600 text-white";
    case "td":
      return "bg-green-600 text-white";
    case "tp":
      return "bg-purple-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "cours":
      return "Cours";
    case "td":
      return "TD";
    case "tp":
      return "TP";
    default:
      return type;
  }
};

const calculateEventPosition = (startTime: string, endTime: string) => {
  const start = Number.parseInt(startTime.split(":")[0]);
  const end = Number.parseInt(endTime.split(":")[0]);
  const startMinutes = Number.parseInt(startTime.split(":")[1]);
  const endMinutes = Number.parseInt(endTime.split(":")[1]);

  const startPos = (start - 8) * 60 + startMinutes;
  const duration = (end - start) * 60 + (endMinutes - startMinutes);

  return {
    top: `${(startPos / 60) * 4}rem`,
    height: `${(duration / 60) * 4}rem`,
  };
};

interface EventProps {
  event: ScheduleEvent;
  userRole: Role;
}

export default function Event({ event, userRole }: EventProps) {
  const position = calculateEventPosition(event.startTime, event.endTime);
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <Popover key={event.id}>
      <PopoverTrigger asChild>
        <div
          className={`absolute left-1 right-1 p-2 rounded-md border-l-4 ${getEventColor(event.type)} cursor-pointer hover:shadow-md transition-shadow group`}
          style={position}
        >
          <div className="text-xs font-medium mb-1">{event.title}</div>
          <div className="text-xs opacity-75 space-y-1">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {event.startTime} - {event.endTime}
            </div>
            <div className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{event.room}</span>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" ref={popoverRef}>
        <EventPopoverContent event={event} userRole={userRole} />
      </PopoverContent>
    </Popover>
  );
}

interface EventPopoverContentProps {
  event: ScheduleEvent;
  userRole: Role;
}

function EventPopoverContent({ event, userRole }: EventPopoverContentProps) {
  return (
    <>
      <div className={`p-0 ${getEventHoverColor(event.type)}`}>
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <div className="flex gap-1">
            {userRole === "ADMIN" && (
              <>
                <DialogModifyEvent event={event} />
                <DialogDeleteEvent event={event} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>
            {event.date} ({event.startTime} - {event.endTime})
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.room}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{event.professor}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{event.ue}</Badge>
            <Badge>{getTypeLabel(event.type)}</Badge>
          </div>
        </div>
      </div>
    </>
  );
}
