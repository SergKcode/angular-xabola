import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { administrationAction } from 'src/app/shared/model/shared.model';

@Component({
	selector: 'app-administration',
	templateUrl: './administration.component.html',
	styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
	actionSelected$: Observable<administrationAction | null> = of(null);
	adminActionFormGroup: FormGroup = new FormGroup({});

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.adminActionFormGroup = this._formBuilder.group({
			action: this._formBuilder.control('', Validators.required)
		});

		this.actionSelected$ = this.adminActionFormGroup.valueChanges.pipe(
			map(({ action }: { action: administrationAction }) => action || null)
		);
	}
}
