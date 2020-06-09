import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm : FormGroup;
  feedback: Feedback;
  contacttype = ContactType;
  constructor(private fb:FormBuilder ) {
    this.createForm();
   }
   createForm()
   {
     this.feedbackForm=this.fb.group({
      firstname: ['',Validators.required],
      Lastname: ['', Validators.required],
      telnum: [0,Validators.required],
      email: ['',Validators.required],
      agree: [false,Validators.required],
      contacttype: ['None',Validators.required],
      message: ['',Validators.required]
     })
   }
   onsubmit()
   {
     this.feedback=this.feedbackForm.value;
      console.log(this.feedback);
      this.feedbackForm.reset({
        fristname: '',
        lastname :'',
        telnum:0,
        email:'',
        agree: false,
        contacttype:'None',
        message: '',
      });
      this.feedbackFormDirective.resetForm();
   }

  ngOnInit() {
  }

}
