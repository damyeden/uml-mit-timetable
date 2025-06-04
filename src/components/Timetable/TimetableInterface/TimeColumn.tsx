interface TimeColumnProps {
  timeSlots: string[];
}

export default function TimeColumn({ timeSlots }: TimeColumnProps) {
  return (
    <div className="relative">
      <div className="h-12"></div> {/* Header spacer */}
      <div
        className="relative"
        style={{ height: `${timeSlots.length * 4}rem` }}
      >
        {timeSlots.map((time, index) => (
          <div
            key={index}
            className="absolute h-16 text-sm text-muted-foreground text-right pr-2 flex items-center justify-end w-full"
            style={{ top: `${index * 4 - 2}rem` }}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
}
