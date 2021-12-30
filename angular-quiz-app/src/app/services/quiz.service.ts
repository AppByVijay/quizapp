import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ASPNET } from 'src/data/aspnet.data';
import { CSHARP } from 'src/data/csharp.data';
import { DESIGNPATTERNS } from 'src/data/designPatterns.data';
import { JAVASCRIPT } from 'src/data/javascript.data';
import { UserModel } from '../models/user-model';




@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  get(type: string): any {
    let data: any;
    switch (type) {
      case 'javascript':
        return JAVASCRIPT;
      case 'aspnet':
        return ASPNET;
      case 'csharp':
        return CSHARP;
      case 'designPatterns':
        return DESIGNPATTERNS;
    }
  }

  getAll() {
    return [
      { id: "javascript", name: "JavaScript" },
      { id: "aspnet", name: "Asp.Net" },
      { id: "csharp", name: "C Sharp" },
      { id: "designPatterns", name: "Design Patterns" }
    ];
  }


  registerUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/register`, user);
  }

  getUser(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/login`);
  }

}
