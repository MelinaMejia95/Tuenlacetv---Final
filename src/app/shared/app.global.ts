import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly url: string = 'http://localhost:3000/api/v1';
    readonly token: string = '7ad0e17f33c7b76025abacb5da2dbf73';
}