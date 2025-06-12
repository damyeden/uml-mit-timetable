import { DayOfWeek } from "@prisma/client";
import prisma from "../prisma";

export class TimeSlot {
  private timeSlotId: number;
  public startTime: Date;
  public endTime: Date;
  public dayName: DayOfWeek;

  public getTimeSlotId(): number {
    return this.timeSlotId;
  }

  public setTimeSlotId(timeSlotId: number): void {
    this.timeSlotId = timeSlotId;
  }

  constructor(
    timeSlotId: number,
    startTime: Date,
    endTime: Date,
    dayName: DayOfWeek
  ) {
    this.timeSlotId = timeSlotId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.dayName = dayName;
  }

  static async create(data: {
    timeSlotId: number;
    startTime: Date;
    endTime: Date;
    dayName: DayOfWeek;
  }): Promise<TimeSlot> {
    const created = await prisma.timeSlot.create({ data });
    return new TimeSlot(
      created.timeSlotId,
      created.startTime,
      created.endTime,
      created.dayName
    );
  }

  static async read(timeSlotId: number): Promise<TimeSlot | null> {
    const found = await prisma.timeSlot.findUnique({ where: { timeSlotId } });
    if (!found) return null;
    return new TimeSlot(
      found.timeSlotId,
      found.startTime,
      found.endTime,
      found.dayName
    );
  }

  static async update(
    timeSlotId: number,
    data: Partial<{
      startTime: Date;
      endTime: Date;
      dayName: DayOfWeek;
    }>
  ): Promise<TimeSlot | null> {
    const updated = await prisma.timeSlot.update({
      where: { timeSlotId },
      data,
    });
    if (!updated) return null;
    return new TimeSlot(
      updated.timeSlotId,
      updated.startTime,
      updated.endTime,
      updated.dayName
    );
  }

  static async delete(timeSlotId: number): Promise<boolean> {
    try {
      await prisma.timeSlot.delete({ where: { timeSlotId } });
      return true;
    } catch {
      return false;
    }
  }
}
