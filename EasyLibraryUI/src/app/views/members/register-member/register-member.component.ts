import { Component } from '@angular/core';
import { MemberFormComponent } from "../../../components/forms/member-form/member-form.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../../services/member.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-member',
  standalone: true,
  imports: [
    MemberFormComponent,
    MatButtonModule
  ],
  templateUrl: './register-member.component.html',
  styleUrl: './register-member.component.scss'
})
export class RegisterMemberComponent {
  member_form : FormGroup;

  constructor(private form_builder: FormBuilder,private member_service: MemberService){
      this.member_form = form_builder.group({
        name: ['',Validators.required],
        surname: ['',Validators.required],
        email: ['',[Validators.required,Validators.email]],
        id_number: ['',[Validators.required, Validators.maxLength(13)]],
        phone_number: ['',Validators.required, Validators.maxLength(10)],
        status: ['',[Validators.required]]
      });
  }

  register(){
    this.member_service.createMember(this.member_form.value).subscribe({
      next: (res)=>{

      },
      error: (err)=>{

      }
    })
  }
}
