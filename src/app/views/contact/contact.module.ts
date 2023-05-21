import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './component/contact/contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactFormModule } from 'src/app/shared/components/contact-form/contact-form.module';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ContactFormModule
  ]
})
export class ContactModule { }
