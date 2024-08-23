import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../../models/member.model';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private membersSubject = new BehaviorSubject<Member[] | undefined>(undefined);
  $membersData = this.membersSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.http
      .get<any[]>(
        'https://run.mocky.io/v3/6f88b2a6-0df7-48ce-8337-b870280a2d76'
      )
      .pipe(
        catchError((error) => {
          alert('Network Error, Please check your connection');
          return of([]);
        })
      )
      .subscribe((data) => {
        const mapped = data.map((d) => {
          return {
            ...d,
            firstName: d.first_name,
            lastName: d.last_name,
          } as Member;
        });
        this.membersSubject.next(mapped);
      });
  }

  getMembers = (): Observable<Member[] | undefined> => {
    return this.$membersData;
  };

  getMemberById = (memberId: number): Observable<Member | undefined> => {
    return this.$membersData.pipe(
      map((members) => {
        if (!members) return undefined;

        const member = members.find((member) => member.id === memberId);
        if (!member) {
          throw new Error(`User with ID ${memberId} not found`);
        }
        return member;
      })
    );
  };

  addMember = (member: Member) => {
    if (this.membersSubject?.value) {
      this.membersSubject.next([
        ...this.membersSubject.value,
        {
          id: new Date().getTime(),
          ...member,
        },
      ]);
    }
    this.router.navigate(['/members']);
  };

  updateMember = (member: Member) => {
    const memberList = this.membersSubject?.value;
    let index = memberList?.findIndex((m) => m.id === member.id);

    if (index !== undefined && index != -1 && memberList) {
      memberList[index] = member;
    }

    this.membersSubject.next(memberList);
    this.router.navigate(['/']);
  };

  deleteMember = (id: number) => {
    this.membersSubject.next(
      this.membersSubject?.value?.filter((member) => member.id !== id)
    );
  };
}
