import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import ILoginStatusModel from '../model/login/login-status.interface';
import ILoginResModel from '../model/login/login-response.interface';
import ILoginReqModel from '../model/login/login-request.interface';
import API from '../../API';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatus: ILoginStatusModel = { isLoggedIn: false };

  constructor(private localStorageService: LocalStorageService, private httpClient: HttpClient) {}

  public login(model: ILoginReqModel): Observable<boolean> {
    return this.httpClient.post<ILoginResModel>(`${API.auth}/login`, model, { observe: 'response' })
      .pipe(map(res => {
        if (res.ok) {
          this.localStorageService.setItem("login", JSON.stringify(res.body!.firebaseConfig))
          return true;
        }
        return false;
      }));
    }

  public getLoginStatus(): ILoginStatusModel {
    let login = this.localStorageService.getItem("login");
    if (login) {
      this.loginStatus.isLoggedIn = true;
      this.loginStatus.token = JSON.parse(login!);
    }
    return this.loginStatus;
  }

  public logout() {
    this.localStorageService.removeItem("login");
    window.location.href = '/'
  }
}
