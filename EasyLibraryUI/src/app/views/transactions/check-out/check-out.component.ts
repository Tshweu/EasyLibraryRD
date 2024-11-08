import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IBook } from '../../../../models/IBook';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from '../../../../services/book.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberService } from '../../../../services/member.service';
import { ILibraryMember } from '../../../../models/ILibraryMember';
import { TransactionService } from '../../../../services/transaction.service';
import { ICheckout } from '../../../../models/ICheckout';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss',
})
export class CheckOutComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'isbn',
    'year',
    'publisher',
    'author',
    'action',
  ];
  dataSource: MatTableDataSource<IBook> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  member_id: number = 1;
  book_id: number = 1;
  member: ILibraryMember = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    id_number: ''
  };
  books: number[] = [];
  member_found = false;
  constructor(
    private book_service: BookService,
    private member_service: MemberService,
    private transaction: TransactionService
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  searchBook() {
    if (!this.isBookInList()) {
      this.book_service.getBook(this.book_id).subscribe({
        next: (res) => {
          this.dataSource.data.push(res);
          const data = this.dataSource.data;
          this.dataSource.data = data;
          console.log(res);
        },
        error: (err) => {},
      });
    } else {
      //Pop up book already in list
    }
  }

  isBookInList(): boolean {
    if (this.dataSource.data.find((x) => x.book_id === this.book_id)) {
      return true;
    }
    return false;
  }

  searchMember() {
    this.member_service.getMember(this.member_id).subscribe({
      next: (res) => {
        console.log(res);
        this.member = res;
        this.member_found = true;
      },
      error: (err) => {
        this.member_found = false;
        console.log(err);
      },
    });
  }

  addToBookList(){
   this.books.push(this.book_id);
  }

  removeBook(index: number){
    this.dataSource.data.splice(index,1);
    this.dataSource.data = this.dataSource.data;
  }

  submit() {
    //validate data
    let books: number[] = [];
    this.dataSource.data.forEach( x =>{
      if(x.book_id){
        books.push(x.book_id);
      }
    });
    const checkout: ICheckout = {
      member_id: this.member_id,
      books: books
    };
    this.transaction.checkout(checkout).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }
}
