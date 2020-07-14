import { Component, OnInit, Input, ViewChild,Inject, inject} from '@angular/core';
import { Dish } from  '../shared/dish';
import {DishService} from '../service/dish.service';
import { Params, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Feedback } from '../shared/feedback';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import {comment} from '../shared/comment';
import { error } from 'protractor';
import { visibility,expand } from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [ visibility(),expand() ]
}) 
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
  commentform : FormGroup;
  visibility = 'shown';
  comments :comment;
  dish: Dish;
  dishIds  :string[];
  prev : string ;
  next: string;
  dat1=  new Date();
  tickInterval = 1;
  errmsg: string;
  dishcopy : Dish;
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb:FormBuilder,  @Inject('BaseURL') private BaseURL) { 
      this.createForm();
    }
    formerrors={
        'author': '',
        'comment':''
    };
    validatemessages={
      'author':{
        'required': 'Name is required',
        'minlength': 'Name must be 2 characters long',
        'maxlength': 'Name cannot be 25 characters long'
      },
      'comment':{
        'required': 'comment is required',
        'minlength': 'comment must be 2 characters long',
        'maxlength': 'comment cannot be 500 characters long'
      }
    }
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds=> this.dishIds=dishIds,error=>this.errmsg=<any> error);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setprevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errmsg = <any>errmess);
    }
    setprevNext(dishId: string)
    {
      const index=this.dishIds.indexOf(dishId);
      this.prev=this.dishIds[(this.dishIds.length+index-1)%this.dishIds.length];
      this.next=this.dishIds[(index+1)%this.dishIds.length];

    }
    
    goBack(): void
    {
        this.location.back();
    }
    createForm()
    {
      this.commentform=this.fb.group({
        author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        comment: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(500)]],
        rating :['0'],
        date: this.dat1.toISOString()  
      });
      this.commentform.valueChanges.subscribe(data=>this.onValueChanged(data));
      this.onValueChanged();      
    }
    onsubmit()
    {
      this.comments=this.commentform.value;
      this.dish['comments'].push(this.comments);
      this.dishcopy.comments.push(this.comments);
      this.dishservice.putDish(this.dishcopy).subscribe(dish=>{this.dish=dish;this.dishcopy=dish;},error=>{this.dish=null,this.dishcopy=null,this.errmsg=<any> error; });
    //  console.log(this.comments)
      this.commentform.reset({
        author:'',
        rating:'',
        comment:'',
        date:''
      });
      this.commentFormDirective.resetForm();
    }
    onValueChanged(data?:any)
    {
      if(!this.commentform){return;}
      const form =this.commentform;
      for(const feild in this.formerrors)
      {
        if(this.formerrors.hasOwnProperty(feild))
        {
          this.formerrors[feild]='';
          const control = form.get(feild);
          if(control&&control.dirty&&!control.valid)
          {
            const messages= this.validatemessages[feild];
            for(const key in control.errors)
            {
             
               if(control.errors.hasOwnProperty(key))
               {
                 console.log(feild)
                 this.formerrors[feild]+=messages[key]+'';
               }
            }
          }
        }
      }
  }
  getSliderTickInterval(): number {
      return this.tickInterval;
  }
}
