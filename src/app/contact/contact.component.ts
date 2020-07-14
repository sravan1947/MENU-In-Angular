import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { flyInOut} from '../animations/app.animation';
import { FeedbackService} from '../service/feedback.service';
import { privateEncrypt } from 'crypto';
import { load } from '@angular/core/src/render3/instructions';
import { expand } from '../animations/app.animation';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
       expand(),
    ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbackForm : FormGroup;
  feedback: Feedback;
  contacttype = ContactType;
  errmsg: string;
  loading :boolean;
  spinner: boolean;
  sform:boolean;
  constructor(private fb:FormBuilder ,private feedbackservices: FeedbackService) {
    this.loading =true;
    this.spinner=false;
    this.sform=false;
    this.createForm();
   }
   formErrors={
    'firstname' :'',
    'Lastname' :'',
    'telnum':'',
    'email':''
   };
   ValidationMessages={
     'firstname':{
       'required' : 'First Name is Required',
       'minlength': 'First Name Must be 2 characters long',
       'maxlength': 'First Name cannot be more than 25 characters long'
     },
     'Lastname':{
       'required' :'Last Name is required',
       'minlength': 'First Name must be atleast 2 characters long',
       'maxlength': 'First Name cannot be more than 25 characters long.'
     },
     'telnum': {
        'required': 'Tel number is required.',
        'pattern': 'Tel number must contain only numbers'
     },
     'email' : {
       'required' :'Email is  requrired',
       'email' : 'Email is not valid format'
     }
   };
   createForm()
   {
     this.feedbackForm=this.fb.group({
      firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      Lastname: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum: [0,[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.email]],
      agree: [false,Validators.required],
      contacttype: ['None',Validators.required],
      message: ['',Validators.required]
     })
    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
   }
   onsubmit()
   {
     this.feedback=this.feedbackForm.value;
     this.loading=false;
     this.spinner=true;
     this.feedbackservices.submitFeedback(this.feedback).subscribe(feedback=>{this.feedback=feedback;this.sform = true;this.loading =false;this.spinner=false;
      setTimeout(()=>{    

        this.loading=true;
        this.sform = false;
           }, 5000);},error=>{this.feedback=null,this.errmsg=<any> error; });
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

   onValueChanged(data?:any)
   {
    
     if(!this.feedbackForm){return;}
     const form =this.feedbackForm;
     for(const feild in this.formErrors)
     {
       if(this.formErrors.hasOwnProperty(feild))
       {
         this.formErrors[feild]='';
         const control = form.get(feild);
         if(control&&control.dirty&&!control.valid)
         {
           const messages= this.ValidationMessages[feild];
           
           for(const key in control.errors)
           {
             
              if(control.errors.hasOwnProperty(key))
              {
                this.formErrors[feild]+=messages[key]+' ';
              }
           }
         }
       }
     }
   }

  ngOnInit() {
  }

}
