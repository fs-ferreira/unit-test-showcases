import { faker } from '@faker-js/faker';
import { BaseResourceModel } from 'src/app/utils/interfaces/base-resource.model';
export class BaseResourceFactory {

  public buildRandomUser(): BaseResourceModel {
    return {
      id: faker.number.int(),
    };
  }
  public buildRandomUserList(length: number) {
    return faker.helpers.uniqueArray(() => this.buildRandomUser(), length);
  }
}