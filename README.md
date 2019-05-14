# Http Interceptors Minimal Example
A example that shows to use http interceptors for handle error or adding headers while request conditionally in angular 2+ application


## Usage

Import the incepters in `app.module.ts` file

```bash
import { HttpErrorInterceptor } from './interceptors/error-interceptor';
import { HttpConfigInterceptor} from './interceptors/httpconfig.interceptor';
```

and use in providers section in ``NgModule``

```bash
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfigInterceptor, 
      multi: true 
    }
  ]
```

## Alter the way you want in ``error-interceptor.ts`` file

```bash
  catchError( (error: HttpErrorResponse) => {   
    let errMsg = 'My own error message, status :' + error.status || 0;
    return throwError(errMsg);
  })

```

## Alter the way you want in ``httpconfig.interceptor.ts`` file

```bash
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const conditionForBypass = request.url.indexOf('google') == -1;
    if(conditionForBypass) { 
      request = request.clone({ headers: request.headers.set('Authorization', 'XYZ') });
    }
    return next.handle(request);
  }

```


## Reference: 
[Angular 6 & 7 HTTP Client Interceptor with Error handling.](https://scotch.io/@vigneshsithirai/angular-6-7-http-client-interceptor-with-error-handling)
