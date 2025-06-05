export class Person {
  constructor(
    public idPerson: string,
    public lastname: string,
    public firstname: string
  ) {}

  getIdPerson(): string {
    return this.idPerson;
  }

  setIdPerson(idPerson: string): void {
    this.idPerson = idPerson;
  }

  getAll(): any {
    // Dummy implementation
    return null;
  }
}
