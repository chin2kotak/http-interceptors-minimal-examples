import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpConfigInterceptor  implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const conditionForBypass = request.url.indexOf('flipkart') == -1;
    if(conditionForBypass) { 
      request = request.clone({ headers: request.headers.set('Authorization', 'XYZ') });
    }
    return next.handle(request);
  }
} 