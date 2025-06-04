import { Role } from "@/src/components/Auth/schema/signupSchema";
import { useMediaQuery } from "@/src/hooks/use-media-query";
import { ScheduleEvent } from "../Timetable";
import Event from "./Event";
import TimeColumn from "./TimeColumn";
import WeekDay from "./WeekDay";

interface TimeTableInterfaceProps {
  weekDays: string[];
  events: ScheduleEvent[];
  timeSlots: string[];
  userRole: Role;
}

export default function TimeTableInterface({
  weekDays,
  events,
  timeSlots,
  userRole,
}: TimeTableInterfaceProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <>
        {/*
            <div className="space-y-4">
        {weekDays.map((day, dayIndex) => {
          const dayEvents = events.filter(
            (event) => event.day === dayIndex + 1
          );
          const isExpanded = expandedDay === dayIndex + 1;

          return (
            <Card key={dayIndex} className="overflow-hidden">
              <CardHeader
                className="py-3 cursor-pointer"
                onClick={() => toggleDayExpansion(dayIndex + 1)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{day}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{dayEvents.length} cours</Badge>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-3 max-h-[70vh] overflow-y-auto pb-4">
                    {dayEvents.length > 0 ? (
                      dayEvents
                        .sort((a, b) => {
                          const aTime =
                            Number.parseInt(a.startTime.split(":")[0]) * 60 +
                            Number.parseInt(a.startTime.split(":")[1]);
                          const bTime =
                            Number.parseInt(b.startTime.split(":")[0]) * 60 +
                            Number.parseInt(b.startTime.split(":")[1]);
                          return aTime - bTime;
                        })
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`p-3 rounded-md border-l-4 ${getEventColor(event.type)}`}
                            onClick={() => handleEventClick(event)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-xs space-y-1 mt-1">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {event.startTime} - {event.endTime}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.room}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {event.professor}
                                  </div>
                                </div>
                              </div>
                              {userRole === "ADMIN" && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditEvent(event);
                                    }}
                                  >
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0 text-red-500"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteEvent(event);
                                    }}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p>Aucun cours ce jour</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>  
        */}
      </>
    );
  }

  {
    /* Desktop version */
  }
  return (
    <div className="grid grid-cols-9 gap-4">
      {/* Time column */}
      <TimeColumn timeSlots={timeSlots} />

      {/* Days columns */}
      {weekDays.map((day, dayIndex) => (
        <div key={dayIndex} className="space-y-1">
          <WeekDay day={day} />

          <div
            className="relative"
            style={{ height: `${timeSlots.length * 4}rem` }}
          >
            {/* Time grid lines */}
            {timeSlots.map((_, timeIndex) => (
              <div
                key={timeIndex}
                className="absolute w-full border-t border-border/50"
                style={{ top: `${timeIndex * 4}rem` }}
              />
            ))}

            {/* Events */}
            {events
              .filter((event) => event.day === dayIndex + 1)
              .map((event) => (
                <Event key={event.id} event={event} userRole={userRole} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
