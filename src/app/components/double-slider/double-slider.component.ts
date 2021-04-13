import { Component, Input } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
	selector: 'quica-double-slider',
	templateUrl: './double-slider.component.html',
	styleUrls: ['./double-slider.component.scss']
})
export class DoubleSliderComponent {
	@Input() min = 0;
	@Input() max = 1000000;
	@Input() minEnding = '';
	@Input() maxEnding = '';
	@Input() placeEnding = '';
	@Input() placeValue = '';
	@Input() isExponential = '';
	public minValue = 0;
	public maxValue = 100;
	public options: Options = {
	  floor: 0,
	  ceil: 100,
	  translate: (value: number, label: LabelType): string => {
		  	if(this.isExponential) {
				switch (label) {
					case LabelType.Low:
						return this.getScaledValue(value).toString();
					case LabelType.High:
						return this.getScaledValue(value).toString();
					default:
						return value.toString();
				}
			} else {
				return value.toString();
			}
	  	}
	};

	getScaledValue(percentage: number) {
		return Math.round(Math.exp((Math.log(this.max)/100) * percentage));
	}

	constructor() {}
}
