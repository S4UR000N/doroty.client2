import { Routes } from '@angular/router';
import { RecordComponent } from './page/record/record.component';
import { LoginComponent } from './page/login/login.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

export const routes: Routes = [
    { path: '',   redirectTo: '/record', pathMatch: 'full' },
    { path: 'record',  component: RecordComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent },
];
