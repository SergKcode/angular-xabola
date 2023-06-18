import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable, of , BehaviorSubject, first} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppRoutes } from 'src/app/shared/model/shared.model';
import { AuthCredential } from 'src/app/views/login/model/login.model';
import { AbstractLoginService } from 'src/app/views/login/service/abstract-login.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
	enableSubmitButton$: Observable<boolean> = of(false);
	loginFormGroup: FormGroup = new FormGroup({});
  formLoginValues$: BehaviorSubject<AuthCredential> = new BehaviorSubject<AuthCredential>({email:'' , password:''})
	isLoginEmailForm = true;

	constructor(private _formBuilder: FormBuilder, private _loginService: AbstractLoginService, private _router:Router) {}

	ngOnInit(): void {
		this.loginFormGroup = this._formBuilder.group({
			email: this._formBuilder.control('', [Validators.required, Validators.email]),
			password: this._formBuilder.control('', Validators.required)
		});

		this.enableSubmitButton$ = this.loginFormGroup.valueChanges.pipe(map((_) => this.loginFormGroup.valid));
	}

  /**
   * 
   */
	emailHandler() {}

  /**
   * 
   */
	loginFormSubmit() {
    const {value}= this.loginFormGroup
    this.formLoginValues$.next(value)
    this._authUser()
  }

  /**
   * 
   */
  _authUser(){
    this.formLoginValues$.pipe(first(),switchMap(credentials=> this._loginService.autenticateUser(credentials))).subscribe(canAccess=>{
      if(canAccess){
        this._router.navigate([`/${AppRoutes.ADMIN}`]);
      }
    })
  }

}
