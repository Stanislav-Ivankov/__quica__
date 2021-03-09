import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'quica-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	public panelState: boolean = false;

	public QUICAInformation = [
		{
			title: "how it works for sellers ?",
			summary: [
				"information...",
				"information... information...",
				"information... information... information... information...",
			],
			imageURL: "../../assets/Leaf.jpg"
		},
		{
			title: "how it works for buyers ?",
			summary: [
				"information...",
				"information... information...",
				"information... information... information...",
				"information... information... information... information...",
			],
			imageURL: "../../assets/Paper.jpg"
		},
		{
			title: "how it works for people for share ?",
			summary: [
				"information...",
				"information... information...",
				"information... information... information...",
				"information... information... information... information..."
			],
			imageURL: "../../assets/Woman.jpg"
		}
	];

	public FAQs = [
		{
			question: "sample question ?",
			answer: "sample asnwer."
		},
		{
			question: "another sample question ?",
			answer: "another sample asnwer."
		},
		{
			question: "third sample question ?",
			answer: "third asnwer."
		},
		{
			question: "forth sample question ?",
			answer: "forth sample asnwer."
		}
	];

	constructor() { }

	ngOnInit() { }
}
