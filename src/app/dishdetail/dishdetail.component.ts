import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';




@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
        state('shown', style({
            transform: 'scale(1.0)',
            opacity: 1
        })),
        state('hidden', style({
            transform: 'scale(0.5)',
            opacity: 0
        })),
        transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]    
})
export class DishdetailComponent implements OnInit {


dishIds: number[];
prev: number;
next: number;
    
dish: Dish;
    
commentForm: FormGroup;
comment: Comment;
errMess: string; 
dishcopy = null;   
    
visibility = 'shown';
 
    
formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
};
validationMessages = {
    'author': {
        'required':
        'Name is required.',
        'minlength':
        'Name must be at least 2 characters long.'
        },
    'comment': {
    'required':
    'Comments is a required field.'
    }
    
};    
        
  
constructor(private fb: FormBuilder,private dishservice: DishService,private route: ActivatedRoute,private location: Location,  @Inject('BaseURL') private BaseURL) {
this.createForm();
}
   
ngOnInit() {


 
    
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds,errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
    /*
    this.route.params
    .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
    */
}
setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds
          .length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds
          .length];
}    
    

goBack(): void {
    this.location.back();
}
    
    
createForm() {
    this.commentForm = this.fb.group({
    author: ['', [Validators.required, Validators.minLength(2), Validators
            .maxLength(25)] ],
    rating: 5,
    comment: ''
    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
    
}
onSubmit() {
    
var todate = new Date();  
this.comment = this.commentForm.value;
this.comment.date =  todate.toISOString();
//console.log(this.comment);
//this.dish.comments.push(this.comment); 
    
this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });    

this.commentForm.reset({
    author: '',
    rating: 5,
    comment: ''
    });
}
    
onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
            }
        }
    }
}        
    
}
