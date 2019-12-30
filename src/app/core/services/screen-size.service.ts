import { Injectable } from "@angular/core";
// import { Platform } from '@angular/cdk/';

@Injectable()
export class ScreenSizeService {
  constructor(){
    console.log('window in service', window);
  }


}