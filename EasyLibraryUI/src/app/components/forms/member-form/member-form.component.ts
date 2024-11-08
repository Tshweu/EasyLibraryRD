import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { conditions } from '../../../constants/condition';
import { statuses } from '../../../constants/status';

@Component({
  selector: 'app-member-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss'
})
export class MemberFormComponent {
  @Input() member_form: FormGroup;
  @Output() member_formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  statuses = statuses;
  conditions = conditions;

  constructor(private form_builder: FormBuilder){
    this.member_form = form_builder.group({});
  }
}
