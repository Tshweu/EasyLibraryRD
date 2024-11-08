import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { conditions } from '../../../constants/condition';
import { statuses } from '../../../constants/status';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  @Input() book_form: FormGroup;
  @Output() book_formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  statuses = statuses;
  conditions = conditions;

  constructor(private fb: FormBuilder){
    this.book_form = this.fb.group({});
  }

}
