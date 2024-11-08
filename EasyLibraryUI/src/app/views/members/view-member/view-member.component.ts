import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MemberFormComponent } from "../../../components/forms/member-form/member-form.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITransaction } from '../../../../models/ITransaction';
import { TransactionService } from '../../../../services/transaction.service';
import { MemberService } from '../../../../services/member.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-member',
  standalone: true,
  imports: [
    MemberFormComponent,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    RouterLink
  ],
  templateUrl: './view-member.component.html',
  styleUrl: './view-member.component.scss'
})
export class ViewMemberComponent {
  member_form : FormGroup;
  displayedColumns: string[] = [ 'member','staff','number of books', 'status', 'date','due_date', 'action'];
  dataSource: MatTableDataSource<ITransaction>;
  id: number;

  constructor(
    private form_builder: FormBuilder,
    private transaction_service: TransactionService,
    private member_service: MemberService,
    private route: ActivatedRoute
  ){
    this.id = route.snapshot.params['id'];
    this.dataSource = new MatTableDataSource();
      this.member_form = form_builder.group({
        name: ['',Validators.required],
        surname: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        id_number: ['',[Validators.required, Validators.maxLength(13)]],
        phone_number: ['',Validators.required, Validators.maxLength(10)],
        status: ['',[Validators.required]]
      });
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
      },error: (err)=>{
        //ToDo: Err Message
      }
    })
  }
}
