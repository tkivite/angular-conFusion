import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { FeedbackService } from '../services/feedback.service';

import { flyInOut,visibility, expand } from '../animations/app.animation';
 

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
    visibility(),
    expand()  
  ]    
})

export class ContactComponent implements OnInit {

feedbackForm: FormGroup;
feedback: Feedback;
contactType = ContactType;
    
visibility = 'shown';

feedbackFromServer = null;  
posting = false;   
showFeedback = false;      
    
    
   
    
formErrors = {
'firstname': '',
'lastname': '',
'telnum': '',
'email': ''
};
validationMessages = {
'firstname': {
'required':
'First Name is required.',
'minlength':
'First Name must be at least 2 characters long.',
'maxlength':
'FirstName cannot be more than 25 characters long.'
},
'lastname': {
'required':
'Last Name is required.',
'minlength':
'Last Name must be at least 2 characters long.',
'maxlength':
'Last Name cannot be more than 25 characters long.'
},
'telnum': {
'required':
'Tel. number is required.',
'pattern':
'Tel. number must contain only numbers.'
},
'email': {
'required':
'Email is required.',
'email':
'Email not in valid format.'
},
};    
    
constructor(private fb: FormBuilder,private feedbackService: FeedbackService,@Inject('BaseURL') private BaseURL ) { 
this.createForm();
}
ngOnInit() {
}
createForm() {
this.feedbackForm = this.fb.group({
firstname: ['', [Validators.required, Validators.minLength(2), Validators
        .maxLength(25)] ],
lastname: ['', [Validators.required, Validators.minLength(2), Validators
        .maxLength(25)] ],
telnum: ['', [Validators.required, Validators.pattern] ],
email: ['', [Validators.required, Validators.email] ],
agree: false,
contacttype: 'None',
message: ''
});
    
this.feedbackForm.valueChanges
.subscribe(data => this.onValueChanged(data));
this.onValueChanged(); // (re)set validation messages now
    
}
onSubmit() {
    this.visibility = 'hidden';   
    this.posting = true;
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback ).subscribe(feedback => {  this.feedbackFromServer = feedback;this.posting = false; this.showFeedback = true;   console.log(this.feedbackFromServer);   setTimeout(function(){ this.showFeedback = false; 
    this.visibility = 'shown'; 
    this.feedbackFromServer = null; 
    this.feedbackForm.reset({
        firstname: '',
        lastname: '',
        telnum: '',
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
        });
    }.bind(this), 5000); });  
    

}
    
onValueChanged(data?: any) {
       if (!this.feedbackForm) { return; }
        const form = this.feedbackForm;
     for (const field in this.formErrors) {
               // clear previous error message (if any)
               this.formErrors[field] = '';
               const control = form.get(field);
            if (control && control.dirty && !control.valid) {
               const messages = this.validationMessages[field];
               for (const key in control.errors){
               this.formErrors[field] += messages[key] + ' ';
               }
            }
        }
}  
               
}