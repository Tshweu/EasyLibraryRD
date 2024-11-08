import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { ITransaction } from '../../../../models/ITransaction';
import { TransactionService } from '../../../../services/transaction.service';
import { IBook } from '../../../../models/IBook';
import { ITransactionDetails } from '../../../../models/ITransactionDetails';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-transaction',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    RouterModule,
    MatCardModule
  ],
  templateUrl: './view-transaction.component.html',
  styleUrl: './view-transaction.component.scss'
})
export class ViewTransactionComponent {
  displayedColumns: string[] = [ 'book_id','title', 'author', 'publisher', 'year', 'isbn', 'status', 'date_returned', 'returned'];
  dataSource: MatTableDataSource<IBook>;
  id: number;
  transaction: ITransactionDetails = {
    transaction_id: 0,
    staff: {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      id_number: ''
    },
    member: {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      id_number: ''
    },
    status: '',
    penalties: [],
    date_created: '',
    books: []
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transaction_service: TransactionService,private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.transaction_service.getTransaction(this.id).subscribe({
      next: (res)=>{
        this.transaction = res;
        console.log(res);
        this.dataSource = new MatTableDataSource(res.books);
        this.dataSource.filterPredicate = (data: IBook, filter: string) => {

          const searchString = filter.trim().toLowerCase();

          return data.title.toLowerCase().includes(searchString) ||

          data.isbn.toLowerCase().includes(searchString)

          };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },error: (err)=>{
        //ToDo: Err Message
      }
    })
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
