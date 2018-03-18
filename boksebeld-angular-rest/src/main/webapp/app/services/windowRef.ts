import {Injectable} from '@angular/core';

import 'rxjs/Rx';

function getWindow (): any {
  return window;
}

@Injectable()
export class WindowRefService {

  get nativeWindow (): any {
    return getWindow();
  }
}
