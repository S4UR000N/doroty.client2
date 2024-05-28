import { Routes } from '@angular/router';
import { RecordComponent } from './page/record/record.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { CustomerComponent } from './page/customer/customer.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/record', pathMatch: 'full' },
    { path: 'record',  component: RecordComponent, pathMatch: 'full' },
    { path: 'record/customer/:id',  component: CustomerComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
];
