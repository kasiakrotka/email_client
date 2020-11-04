import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
    //uruchamia kod przed wysłaniem requesta
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Request is on its way');
        //mozna modyfikowac request albo sprawdzic czy chcemy wyslac do tego url 
        //mozna zmienic parametry i naglowki wyslanego requesta 
        //zamiast pisac to samo w kazdym requescie 
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')});
        
        return next.handle(modifiedRequest);
    }
}