import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IBook } from '../../../../models/IBook';
import { BookService } from '../../../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MemberService } from '../../../../services/member.service';
import { ILibraryMember } from '../../../../models/ILibraryMember';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatTableModule,
    MatInputModule,
    CommonModule,
    MatSortModule,
    MatChipsModule
  ],
  templateUrl: './manage-members.component.html',
  styleUrl: './manage-members.component.scss'
})
export class ManageMembersComponent {
  displayedColumns: string[] = [ 'name', 'surname', 'phone_number', 'id_number', 'status', 'action'];
  dataSource: MatTableDataSource<ILibraryMember>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private member_service: MemberService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.member_service.getMembers().subscribe({
      next: (res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: (err)=>{
        //ToDo: Err Message
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
