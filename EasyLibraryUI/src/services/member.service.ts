import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ILibraryMember } from '../models/ILibraryMember';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _http: HttpClient) { }

  getMember(id:number){
    return this._http.get<ILibraryMember>(`${environment.api}member/${id}`)
  }

  getMembers(){
    return this._http.get<ILibraryMember[]>(`${environment.api}member`)
  }

  createMember(member: ILibraryMember){
    return this._http.post<ILibraryMember>(`${environment.api}member`,member)
  }
}
