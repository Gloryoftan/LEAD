import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'members',
    loadComponent: () => import('./pages/members/members.component').then(m => m.MembersComponent)
  },
  {
    path: 'members/:id',
    loadComponent: () => import('./pages/member-detail/member-detail.component').then(m => m.MemberDetailComponent)
  },
  {
    path: 'admission-certificate',
    loadComponent: () => import('./pages/admission-certificate/admission-certificate.component').then(m => m.AdmissionCertificateComponent)
  },
  {
    path: 'admission-certificate/:id',
    loadComponent: () => import('./pages/admission-certificate/admission-certificate.component').then(m => m.AdmissionCertificateComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];