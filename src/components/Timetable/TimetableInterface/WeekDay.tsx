interface WeekDayProps {
  day: string;
}

export default function WeekDay({ day }: WeekDayProps) {
  return (
    <div className="h-12 flex items-center justify-center border-border">
      <span className="font-medium">{day}</span>
    </div>
  );
}
