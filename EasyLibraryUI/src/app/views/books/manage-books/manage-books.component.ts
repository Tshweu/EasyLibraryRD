import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { IBook } from '../../../../models/IBook';
import { BookService } from '../../../../services/book.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-manage-books',
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
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.scss'
})
export class ManageBooksComponent {
  displayedColumns: string[] = [ 'book_id','title', 'author', 'publisher', 'year', 'isbn', 'status', 'condition', 'action'];
  dataSource: MatTableDataSource<IBook>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private book_service: BookService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.book_service.getBooks().subscribe({
      next: (res)=>{
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
