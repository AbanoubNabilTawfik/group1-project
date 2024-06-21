import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthenticationService } from "./authentication.service";


@Injectable({
    providedIn: "root"
})
export class AuthenticationInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user || !user.token) {
                    return next.handle(req)
                }
                const modifiedRequest = req.clone({
                    params: new HttpParams().set("auth", user.token)
                })
                return next.handle(modifiedRequest)
            })
        )
    }

}