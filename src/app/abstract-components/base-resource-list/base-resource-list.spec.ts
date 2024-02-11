import { faker } from '@faker-js/faker';
import { UserFactory } from './../../utils/factory/user-factory';
import { of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { BaseResourceService } from '../base-resource.service';
import { BaseResourceList } from './base-resource-list';

describe('BaseResourceList', () => {
  let service: BaseResourceList<any>;
  let baseResourceService: BaseResourceService<any>;

  beforeEach(() => {
    const injectorStub = () => ({});
    const baseResourceServiceStub = () => ({
      getAll: () => ({ pipe: () => ({ subscribe: () => ({}) }) }),
      delete: (id: number) => ({ subscribe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        BaseResourceList,
        { provide: Injector, useFactory: injectorStub },
        { provide: BaseResourceService, useFactory: baseResourceServiceStub }
      ]
    });
    service = TestBed.inject(BaseResourceList);
    baseResourceService = TestBed.inject(BaseResourceService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call method and makes expected calls', () => {
      const mockList = new UserFactory().buildRandomUserList(4);
      const spy = spyOn(baseResourceService, 'getAll').and.returnValues(of(mockList));
      service.ngOnInit();
      expect(spy).toHaveBeenCalled();
      expect(service.resources).toEqual(mockList);
    });

    it('should call method and throw error on getAll', () => {
      spyOn(baseResourceService, 'getAll').and.returnValue(throwError(() => 'Error'));
      const alertSpy = spyOn(window, 'alert');
      service.ngOnInit();
      expect(alertSpy).toHaveBeenCalledWith('Erro ao carregar a listagem');
    });
  });

  describe('deleteById', () => {
    it('should call method and dont confirm to delete', () => {
      const id = faker.number.int();
      const serviceSpy = spyOn(baseResourceService, 'delete');
      const confirmSpy = spyOn(window, 'confirm').and.returnValue(false);
      service.deleteById(id);
      expect(confirmSpy).toHaveBeenCalled();
      expect(serviceSpy).not.toHaveBeenCalled();
    });

    it('should call method and do the delete', () => {
      const id = faker.number.int();
      const mockList = [
        { id }
      ];
      service.resources = mockList;
      const serviceSpy = spyOn(baseResourceService, 'delete').and.returnValue(of(null));
      const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
      service.deleteById(mockList[0].id);
      expect(confirmSpy).toHaveBeenCalled();
      expect(serviceSpy).toHaveBeenCalled();
      expect(service.resources.length).toBe(0);
    });

  });
});
