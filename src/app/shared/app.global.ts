import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly url: string = 'http://localhost:3000/api/v1';
}