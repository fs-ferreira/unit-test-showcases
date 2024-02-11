
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseResourceModel } from '../utils/interfaces/base-resource.model';

@Injectable()
export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonToResourceFn: (data: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  public getAll(): Observable<T[]> {
    return this.http
      .get<any[]>(this.apiPath)
      .pipe(map(this.jsonToArray.bind(this)), catchError(this.handleError));
  }

  public getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http
      .get(url)
      .pipe(map(this.jsonToObject.bind(this)), catchError(this.handleError));
  }

  public create(resource: T): Observable<T> {
    return this.http
      .post(this.apiPath, resource)
      .pipe(map(this.jsonToObject.bind(this)), catchError(this.handleError));
  }

  public update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  public delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  protected jsonToArray(data: any[]): T[] {
    const resources: T[] = [];
    data.forEach((el) => resources.push(this.jsonToResourceFn(el)));
    return resources;
  }

  protected jsonToObject(data: any): T {
    return this.jsonToResourceFn(data);
  }

  protected handleError(error: any): Observable<any> {
    return throwError(() => new Error(error));
  }
}
