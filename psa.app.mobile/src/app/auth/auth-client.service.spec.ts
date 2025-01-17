/*
 * SPDX-FileCopyrightText: 2021 Helmholtz-Zentrum für Infektionsforschung GmbH (HZI) <PiaPost@helmholtz-hzi.de>
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import SpyObj = jasmine.SpyObj;

import { AuthClientService } from './auth-client.service';
import { EndpointService } from '../shared/services/endpoint/endpoint.service';

describe('AuthClientService', () => {
  let service: AuthClientService;

  let endpoint: SpyObj<EndpointService>;

  beforeEach(() => {
    endpoint = jasmine.createSpyObj('EndpointService', ['getUrl']);
    endpoint.getUrl.and.returnValue('http://localhost');

    TestBed.configureTestingModule({
      providers: [{ provide: EndpointService, useValue: endpoint }],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
