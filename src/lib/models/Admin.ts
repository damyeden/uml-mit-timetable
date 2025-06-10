export class Admin {
  lastname: string;

  constructor(lastname = "admin") {
    this.lastname = lastname;
  }

  greet(): string {
    return `Hello, my name is ${this.lastname}`;
  }
}

