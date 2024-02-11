import { ComponentFixture, TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { MatchersJasmineComponent } from './matchers-jasmine.component';

describe('MatchersJasmineComponent', () => {
  let component: MatchersJasmineComponent;
  let fixture: ComponentFixture<MatchersJasmineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchersJasmineComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MatchersJasmineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toEqual Matcher', () => {
    it('should test toEqual matcher use', () => {
      const randomString = faker.string.alphanumeric({ length: 4 });
      expect(typeof (randomString)).toEqual('string');
      expect(randomString.length).toEqual(4);
    });
  });

  describe('toBe Matcher', () => {
    it('should test toBe matcher use', () => {
      const randomArray = faker.helpers.uniqueArray(faker.word.sample, 3);
      const randomArray2 = randomArray;

      expect(randomArray).toBe(randomArray2);
    });
  });

  describe('toBeTruthy Matcher', () => {
    it('should test toBeTruthy matcher use', () => {
      const trueBoolean = true;
      expect(trueBoolean).toBeTruthy();
    });

    it('should test toBeTruthy empty initialized object', () => {
      const object = {};
      expect(object).toBeTruthy();
    });
  });

  describe('toBeFalsy Matcher', () => {
    it('should test toBeFalsy matcher use', () => {
      const trueBoolean = false;
      expect(trueBoolean).toBeFalsy();
    });

    it('should test toBeFalsy empty string', () => {
      const emptyString = '';
      expect(emptyString).toBeFalsy();
    });

    it('should test toBeFalsy empty array', () => {
      const emptyArray = [];
      expect(emptyArray.length).toBeFalsy();
    });

    it('should test toBeFalsy non initialized object', () => {
      const nullObject = null;
      expect(nullObject).toBeFalsy();
    });

    it('should test toBeFalsy NaN', () => {
      const emptyString = faker.string.alpha({ length: 3 });
      expect(Number(emptyString)).toBeFalsy();
    });
  });

  describe('toBeTrue Matcher', () => {
    it('should test toBeTrue matcher use', () => {
      const trueBool = true;
      expect(trueBool).toBeTrue();
    });
  });

  describe('toBeFalse Matcher', () => {
    it('should test toBeFalse matcher use', () => {
      const falseBool = false;
      expect(falseBool).toBeFalse();
    });
  });

  describe('not Matcher', () => {
    it('should test not matcher use', () => {
      const randomString = faker.string.alphanumeric({ length: 3 });
      const randomString2 = faker.string.alphanumeric({ length: 4 });

      expect(randomString).not.toEqual(randomString2);
      expect(randomString.length).not.toEqual(randomString2.length);
    });
  });

  describe('toContain Matcher', () => {
    it('should test toContain matcher use', () => {
      let concatString = faker.word.sample();
      const anotherString = faker.word.sample();
      concatString += anotherString;
      expect(concatString).toContain(anotherString);
    });

    it('should test toContain with array', () => {
      const word = faker.word.sample;
      const randomArray = faker.helpers.uniqueArray([word, faker.word.sample], 3);
      expect(randomArray).toContain(word);
    });
  });

  describe('toBeDefined Matcher', () => {
    let string: string;
    let object: any;

    beforeEach(() => {
      string = faker.word.sample();
      object = {
        string
      };
    });

    it('should test toBeDefined matcher use', () => {
      expect(string).toBeDefined();
    });

    it('should test toBeDefined with object', () => {
      expect(object).toBeDefined();
    });
  });

  describe('toBeUndefined Matcher', () => {
    let string: string;
    let object: any;

    it('should test toBeUndefined matcher use', () => {
      expect(string).toBeUndefined();
    });

    it('should test toBeUndefined with object', () => {
      expect(object).toBeUndefined();
    });
  });

  describe('toBeNull Matcher', () => {
    it('should test not toBeNull', () => {
      let object: any;
      expect(object).not.toBeNull();
    });

    it('should test toBeNull with object', () => {
      const object: any = null;
      expect(object).toBeNull();
    });
  });

  describe('toBeNaN Matcher', () => {
    it('should test not toBeNaN', () => {
      const string = faker.word.sample();
      expect(Number(string)).toBeNaN();
    });
  });

  describe('toBeGreaterThan Matcher', () => {
    it('should test not toBeGreaterThan', () => {
      const value = faker.number.int({ max: 4 });
      const greaterValue = faker.number.int({ min: 5 });
      expect(greaterValue).toBeGreaterThan(value);
    });
  });

  describe('toBeLessThan Matcher', () => {
    it('should test not toBeLessThan', () => {
      const value = faker.number.int({ min: 4 });
      const lessValue = faker.number.int({ max: 3 });
      expect(lessValue).toBeLessThan(value);
    });
  });

  describe('toBeCloseTo Matcher', () => {
    it('should test not toBeCloseTo', () => {
      const value = 4;
      expect(value).toBeCloseTo(4);
    });
  });

  describe('toMatch Matcher', () => {
    it('should test not toMatch', () => {
      const value = "Matcher";
      expect(value).toMatch(/M/);
      expect(value).not.toMatch(/m/);
    });
  });

  describe('toMatch Matcher', () => {
    it('should test not toMatch', () => {
      const errorFunction = () => {
        throw new Error('Error');
      };
      expect(errorFunction).toThrow();
    });
  });

});


