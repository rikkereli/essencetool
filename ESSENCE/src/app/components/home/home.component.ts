import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  firstSubscription: Subscription;

  subscriberOneValue: number = 0; 
  isSubscriberOneDivisible: boolean;
  secondSubscription: Subscription;

  subscriberTwoValue: number = 0; 
  isSubscriberTwoDivisible: boolean;


  divisibleByThreeObservable: BehaviorSubject<{isDivisibleByThree:boolean, number:number}>;
  constructor(
    public authService: AuthService, 
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.divisibleByThreeObservable = <BehaviorSubject<{isDivisibleByThree:boolean, number:number}>> new BehaviorSubject({isDivisibleByThree: false, number:2});
  }
  subscribe() {
    this.firstSubscription = this.divisibleByThreeObservable.subscribe({
      next: (value) => {
        console.log('Subscriber 1 - Number:' + value.number + value.isDivisibleByThree ? 'is' : 'is not' + 'divisible by three.');
        this.subscriberOneValue = value.number;
        this.isSubscriberOneDivisible = value.isDivisibleByThree;
      }
    })
  }
  add() {
    this.divisibleByThreeObservable.next({isDivisibleByThree: false, number:(this.subscriberOneValue+1)});
  }
  unsubscribe() {
    this.firstSubscription.unsubscribe();
    console.log('Subscriber unsubscribed from the observer');
  }
  subscribe2() {
    this.secondSubscription = this.divisibleByThreeObservable.subscribe({
      next: (value) => {
        console.log('Subscriber 1 - Number:' + value.number + value.isDivisibleByThree ? 'is' : 'is not' + 'divisible by three.');
        this.subscriberTwoValue = value.number;
        this.isSubscriberTwoDivisible = value.isDivisibleByThree;
      }
    })
  }
  unsubscribe2() {
    this.secondSubscription.unsubscribe();
    console.log('Subscriber unsubscribed from the observer');
  }

}
