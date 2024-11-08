import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authCanActivateGuard } from '../guards/auth-can-activate.guard';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ViewsComponent } from './views/views.component';
import { authCanActivateChildGuard } from '../guards/auth-can-activate-child.guard';
import { ManageBooksComponent } from './views/books/manage-books/manage-books.component';
import { CreateBookComponent } from './views/books/create-book/create-book.component';
import { ManageTransactionsComponent } from './views/transactions/manage-transactions/manage-transactions.component';
import { CheckOutComponent } from './views/transactions/check-out/check-out.component';
import { ViewBookComponent } from './views/books/view-book/view-book.component';
import { ReturnsComponent } from './views/transactions/returns/returns.component';
import { ManageMembersComponent } from './views/members/manage-members/manage-members.component';
import { RegisterMemberComponent } from './views/members/register-member/register-member.component';
import { ViewMemberComponent } from './views/members/view-member/view-member.component';
import { ViewTransactionComponent } from './views/transactions/view-transaction/view-transaction.component';

export const routes: Routes = [
 {
    path: 'views',
    component: ViewsComponent,
    canActivate: [authCanActivateGuard],
    canActivateChild: [authCanActivateChildGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'books/manage',
        component: ManageBooksComponent,
      },
      {
        path: 'books/create',
        component: CreateBookComponent,
      },
      {
        path: 'books/:id',
        component: ViewBookComponent,
      },
      {
        path: 'transactions/manage',
        component: ManageTransactionsComponent,
      },
      {
        path: 'transactions/check-out',
        component: CheckOutComponent,
      },
      {
        path: 'transactions/return',
        component: ReturnsComponent,
      },
      {
        path: 'transactions/:id',
        component: ViewTransactionComponent,
      },
      {
        path: 'members/manage',
        component: ManageMembersComponent,
      },
      {
        path: 'members/register',
        component: RegisterMemberComponent,
      },
      {
        path: 'members/:id',
        component: ViewMemberComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];
