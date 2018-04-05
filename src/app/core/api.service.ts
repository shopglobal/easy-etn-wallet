import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';

const routes = {
  options: (c: ApiContext) => `/${c.table}?${c.query}`,
  data:  (c: ApiContext) => c.data
};

export interface ApiContext {
  table: string;
  cache: boolean;
  query: string;
  data: any;
}

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  async getApiData(context: ApiContext): Promise<any> {
    const response = await this.http.get(routes.options(context), { cache: context.cache }).toPromise();
    return response.json();
  }

  async postApiData(context: ApiContext): Promise<any> {
    const response = await this.http.post(
      routes.options(context),
      routes.data(context),
      {cache: context.cache})
    .toPromise();
    return response.json();
  }

}
