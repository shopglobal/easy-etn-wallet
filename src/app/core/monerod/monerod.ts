import { request, makeUrl } from './request'
import { Observable } from 'rxjs/Observable'

export { makeUrl }

export const Daemon = (url) => ({

  getheight: (): Observable<Height> =>
    request(url)('getheight'),

  other: (method: string, arg?: any): Observable<any> =>
    request(url)(method, arg),

});

interface Height {
  height: number;
}