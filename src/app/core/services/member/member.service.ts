import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../models/member.model';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private members = new BehaviorSubject<Member[]>([]);

  constructor(private http: HttpClient) {
    this.http
      .get<Member[]>(
        'https://run.mocky.io/v3/6f88b2a6-0df7-48ce-8337-b870280a2d76'
      )
      .subscribe((data) => this.members.next(data));
  }

  getMembers = () => {
    return this.members;
  };

  addMember = (member: Member) => {
    const currentMembers = this.members.value;
    this.members.next([
      ...currentMembers,
      {
        id: currentMembers.length + 1,
        ...member,
      },
    ]);
  };

  deleteMember = (id: number) => {
    const currentMembers = this.members.value;
    this.members.next(currentMembers.filter(member => member.id !== id));
  };
}
