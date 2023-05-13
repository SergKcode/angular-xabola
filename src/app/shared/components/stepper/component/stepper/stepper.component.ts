import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input() step:number = 1
  stepperPercentage:string= 'w-1/3'

  constructor() { }

  ngOnInit(): void {
  }

  

}
