import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PERCENTAJE_STEPPER_LINE } from '../../model/stepper.config';

@Component({
	selector: 'app-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnChanges {
	@Input() step: number | null = null;

	completeWidth: string = 'w-0';

	constructor() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['step']) {
			this.step = this.step ? this.step : 1;
			//Pinta la linea de progreso segun el paso en el que estemos
			this.completeWidth = PERCENTAJE_STEPPER_LINE[this.step.toString() || '1'];
		}
	}
}
