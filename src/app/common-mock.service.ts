import { Injectable } from '@angular/core';

@Injectable()
export class CommonMockService {

  getToDoList(): Promise<any[]> {
    return Promise.resolve([
      {
        Task: 'Take interview of jenith',
        Date: '2018-05-10',
        Status: true
      },
      {
        Task: 'Do meeting with x-client',
        Date: '2018-05-22',
        Status: false
      },
      {
        Task: 'Take review of all employee related to new office',
        Date: '2018-05-31',
        Status: true
      }
    ]);
  }

  constructor() { }

}
