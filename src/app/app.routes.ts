import { Routes } from '@angular/router';
import { RecordComponent } from './page/record/record.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { CustomerComponent } from './page/customer/customer.component';
import { GroupComponent } from './page/group/group.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/record', pathMatch: 'full' },
    { path: 'record',  component: RecordComponent, pathMatch: 'full' },
    { path: 'record/customer/:customerId',  component: CustomerComponent, pathMatch: 'full' },
    { path: 'record/customer/:customerId/group/:groupId',  component: GroupComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },
];
