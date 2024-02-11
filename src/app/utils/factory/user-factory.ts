import { faker } from "@faker-js/faker";
import { User } from "../interfaces/user";

export class UserFactory {
  public buildRandomUser(): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 60 }),
    };
  }
  public buildRandomUserList(length: number) {
    return faker.helpers.uniqueArray(() => this.buildRandomUser(), length);
  }
}
