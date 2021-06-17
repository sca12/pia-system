import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from '../shared/services/endpoint/endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class MaterialClientService {
  private getApiUrl() {
    return this.endpoint.getUrl() + '/api/v1/sample/';
  }

  constructor(private http: HttpClient, private endpoint: EndpointService) {}

  requestMaterial(username: string): Promise<void> {
    return this.http
      .post<void>(
        this.getApiUrl() + 'probands/' + username + '/needsMaterial',
        {}
      )
      .toPromise();
  }
}
