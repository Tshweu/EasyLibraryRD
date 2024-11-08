import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookFormComponent } from "../../../components/forms/book-form/book-form.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-view-book',
  standalone: true,
  imports: [BookFormComponent,MatButtonModule],
  templateUrl: './view-book.component.html',
  styleUrl: './view-book.component.scss'
})
export class ViewBookComponent implements OnInit {
  id : number;
  book_form: FormGroup;
  loading: boolean = false;
  constructor(
    private book_service: BookService,
    private route: ActivatedRoute,
    private form_builder: FormBuilder,
    private snack_bar: MatSnackBar
  ){
    this.id = route.snapshot.params['id'];
    this.book_form = this.form_builder.group({
      book_id: [Validators.required],
      title: ['',Validators.required],
      author: ['',Validators.required],
      publisher: ['',Validators.required],
      year: [0,Validators.required],
      isbn: ['',Validators.required],
      status: ['Available',Validators.required],
      book_condition: ['New',Validators.required]
    })
  }

  ngOnInit(): void {
    this.load_book();
  }

  load_book(){
    this.book_service.getBook(this.id).subscribe({
      next: (res)=>{
        this.book_form.setValue({
          book_id: res.book_id,
          title: res.title,
          author: res.author,
          publisher: res.publisher,
          year: res.year,
          isbn: res.isbn,
          status: res.status,
          book_condition: res.book_condition
        })
      },
      error: (err)=>{
        this.open_snack_bar(err.message);
      }
    })
  }

  open_snack_bar(message: string) {
    this.snack_bar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  update_book(){
    this.loading = true;
    this.book_service.updateBook(this.book_form.value).subscribe({
      next: (res)=>{
        this.loading = false;
      },
      error: (err)=>{
        this.loading = false;
        this.open_snack_bar(err.message)
      }
    })
  }
}
