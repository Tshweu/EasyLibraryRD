import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICheckout } from '../../../../models/ICheckout';
import { ILibraryMember } from '../../../../models/ILibraryMember';
import { BookService } from '../../../../services/book.service';
import { MemberService } from '../../../../services/member.service';
import { TransactionService } from '../../../../services/transaction.service';
import { ITransaction } from '../../../../models/ITransaction';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IBook } from '../../../../models/IBook';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule
  ],
  templateUrl: './returns.component.html',
  styleUrl: './returns.component.scss'
})
export class ReturnsComponent {
  displayedColumns: string[] = [
    // 'id',
    'title',
    'isbn',
    'year',
    'publisher',
    'author',
    // 'fine',
    // 'due_date',
    // 'status'
  ];
  dataSource: MatTableDataSource<IBook> = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  member_id: number = 1;
  book_id: number = 1;
  selected_condition: string = '';
  member: ILibraryMember = {
    name: '',
    surname: '',
    email: '',
    phone_number: '',
    id_number: ''
  };
  books: number[] = [];
  conditions: string[] = [
    'Good',
    'Wear & Tear',
    'Damaged'
  ]
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
