import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidators } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent {

  updateFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateFormGroup = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), FormValidators.notOnlyWhiteSpace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(7)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(7), this.matchPasswordValidator()])
      }),
    });
  }

  matchPasswordValidator(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const password = this.updateFormGroup?.get('user.password')?.value;
      const confirmPassword = control.value;

      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  get firstName() { return this.updateFormGroup.get('user.firstName'); }
  get lastName() { return this.updateFormGroup.get('user.lastName'); }
  get email() { return this.updateFormGroup.get('user.email'); }
  get password() { return this.updateFormGroup.get('user.password'); }
  get confirmPassword() { return this.updateFormGroup.get('user.confirmPassword'); }

  onSubmit() {
    console.log("Handling registration form submit button.")
  }

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  closeModal(): void {
    this.cancel.emit();
  }
}