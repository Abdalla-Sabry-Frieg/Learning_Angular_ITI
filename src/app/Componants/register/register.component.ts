import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
userRegisterForm : FormGroup;
errorMessage: string = '';

constructor (){
  this.userRegisterForm = new FormGroup({
    // Validators to add the validations
    name : new FormControl('',[Validators.required , Validators.maxLength(25),Validators.minLength(3), Validators.pattern('^[a-z-A-Z]{3,10}$')]),
    email : new FormControl('',[Validators.required , Validators.maxLength(25),Validators.minLength(3), Validators.pattern('^[a-z-A-Z]{3,10}$')]),
    password : new FormControl('', [Validators.required,Validators.minLength(6)]),
    address : new FormGroup({
      city:new FormControl('' ,[Validators.required , Validators.maxLength(25),Validators.minLength(3) , Validators.pattern('^[a-z-A-Z]{3,10}$')]),
      street:new FormControl('' , [Validators.required , Validators.maxLength(25),Validators.minLength(3) , Validators.pattern('^[a-z-A-Z]{3,10}$')])
    }),
    phoneNumbers: new FormArray([new FormControl('', Validators.required)])
  })
}

onSubmit()
{
  console.log(this.userRegisterForm.value);

}

// Getters for form arrays and controls
get phoneNumbers() {
  return this.userRegisterForm.get('phoneNumbers') as FormArray;
}

// Add a phone number
addPhoneNumber() {
  this.phoneNumbers.push(new FormControl('', Validators.required));
}

// Remove a phone number
removePhoneNumber(index: number) {
  if(this.phoneNumbers.length >1){
  this.phoneNumbers.removeAt(index);
  this.errorMessage = '';
  }else{
    this.errorMessage = 'You must have at least one phone number.';
  }
}

 // Function to easily access form controls
 get name() {
  return this.userRegisterForm.get('name');
}

get email() {
  return this.userRegisterForm.get('email');
}

get password() {
  return this.userRegisterForm.get('password');
}

get city() {
  return this.userRegisterForm.get('address.city');
}

get street() {
  return this.userRegisterForm.get('address.street');
}


}
