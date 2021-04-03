import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'quica-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	public panelState = false;

	public generalInformation = [
		{
			title: 'what do we offer if you sell something ?',
			summary: ['first step', 'second step', 'third step'],
			imageURL: '../../assets/Undraw Transfer Money.svg'
		},
		{
			title: 'how can you buy ?',
			summary: ['first step', 'second step', 'third step'],
			imageURL: '../../assets/Undraw Credit Card Payment.svg'
		},
		{
			title: 'how can you make money by sharing ?',
			summary: ['first step', 'second step', 'third step'],
			imageURL: '../../assets/Undraw Online Shopping.svg'
		}
	];

	public FAQs = [
		{
			question: 'how does quica work ?',
			answer: `commission for sharing !
				an acquaintance shared a product with you for sale because they think you care.
				if you are right, you can buy it here and now.
				and if you don’t need it, but you know someone you think you’re interested in, you can share with it and make money with it !
				because if you tell the buyer first, you get a commission !`
		},
		{
			question: 'how do i get paid ?',
			answer: `commission for sharing !
				an acquaintance shared a product with you for sale because they think you care.
				if you are right, you can buy it here and now.
				and if you don’t need it, but you know someone you think you’re interested in, you can share with it and make money with it !
				because if you tell the buyer first, you get a commission !`
		},
		{
			question: 'is quica safe ?',
			answer: `commission for sharing !
				an acquaintance shared a product with you for sale because they think you care.
				if you are right, you can buy it here and now.
				and if you don’t need it, but you know someone you think you’re interested in, you can share with it and make money with it !
				because if you tell the buyer first, you get a commission !`
		},
		{
			question: 'what happens if the business fails due to some external factor ?',
			answer: `commission for sharing !
				an acquaintance shared a product with you for sale because they think you care.
				if you are right, you can buy it here and now.
				and if you don’t need it, but you know someone you think you’re interested in, you can share with it and make money with it !
				because if you tell the buyer first, you get a commission !`
		}
	];

	constructor() { }

	ngOnInit() { }
}
