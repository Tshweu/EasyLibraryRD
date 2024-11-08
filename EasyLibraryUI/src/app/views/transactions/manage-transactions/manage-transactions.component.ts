import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITransaction } from '../../../../models/ITransaction';
import { TransactionService } from '../../../../services/transaction.service';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-transactions',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    RouterModule
  ],
  templateUrl: './manage-transactions.component.html',
  styleUrl: './manage-transactions.component.scss'
})
export class ManageTransactionsComponent {
  displayedColumns: string[] = [ 'member','staff','number of books', 'status', 'date','due_date', 'action'];
  dataSource: MatTableDataSource<ITransaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private transaction_service: TransactionService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.transaction_service.getTransactions().subscribe({
      next: (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.filterPredicate = (data: ITransaction, filter: string) => {

          const searchString = filter.trim().toLowerCase();

          return data.member.name.toLowerCase().includes(searchString) ||
            data.member.surname.toLowerCase().includes(searchString) ||
            data.staff.name.toLowerCase().includes(searchString) ||
            data.staff.surname.toLowerCase().includes(searchString)
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
