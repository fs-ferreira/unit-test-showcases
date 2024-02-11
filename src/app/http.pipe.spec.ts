import { faker } from '@faker-js/faker';
import { HttpPipe } from './http.pipe';

describe('HttpPipe', () => {
  const pipe = new HttpPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform http into https', () => {
    const url = faker.internet.url({ protocol: 'http' });
    expect(pipe.transform(url)).toContain('https');
  });
});
