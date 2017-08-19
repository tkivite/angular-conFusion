import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut } from '../animations/app.animations';
import { FeedbackService } from '../services/feedback.service';
import { Response } from "@angular/http";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
     '[@flyInOut]': 'true',
     'style': 'display: block;'
 },
 animations: [
    flyInOut()
]
})
export class ContactComponent implements OnInit {

   feedbackForm: FormGroup;
   newFeedback: Feedback;
   feedback: Response;
   contactType = ContactType;
   submitting: boolean;
   formErrors = {
      'firstname': '',
      'lastname': '',
      'telnum': '',
      'email': ''
   };

   validationMessages = {
      'firstname': {
         'required': 'First Name is required.',
         'minlength': 'First Name must be at least 2 characters long',
         'maxlength': 'First Name cannot be more than 25 characters long',
      },
      'lastname': {
         'required': 'Last Name is required.',
         'minlength': 'Last Name must be at least 2 characters long',
         'maxlength': 'Last Name cannot be more than 25 characters long',
      },
      'telnum': {
         'required': 'Tel. Number is required.',
         'pattern': 'Tel. Number must contain only numbers.',
      },
      'email': {
         'required': 'Email is required.',
         'email': 'Email not in valid format'
      }
   };

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService) {
     this.createForm();
     this.submitting = false;
 }

  ngOnInit() {
  }

  createForm(){
     this.feedbackForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        telnum: [0, [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]],
        agree: false,
        contacttype: 'None',
        message: ''
     });

     this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));

     this.onValueChanged(); //(re)set form validation messages
 }

 onValueChanged(data?: any){
    if(!this.feedbackForm){
      return;
   }
   const form = this.feedbackForm;
   for(const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
         const messages = this.validationMessages[field];
         for(const key in control.errors){
            this.formErrors[field] += messages[key] + ' ';
         }
      }
   }
}

 onSubmit() {
    this.newFeedback = this.feedbackForm.value;
    console.log(this.feedback);
    var temp = this;
    this.feedbackservice.submitFeedback(this.newFeedback).subscribe(
      function(response){
         temp.feedback = response;
         temp.submitting = true;
         setTimeout(function(){
            temp.newFeedback=null;
            temp.feedback = null;
            temp.submitting = false;
         }, 5000);
      },
      function(errmess){
         errmess => (this.errMess = <any>errmess);
      }
   )

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
   });
   this.submitting = false;
}

}
