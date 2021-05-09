import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FutureValueCalculatorComponent extends Component {
  @tracked numPeriod = 10;

  @tracked startingAmount = 1000;

  @tracked interestRate = 12;

  @tracked periodicDeposit = 1000;

  @tracked futureValue;

  constructor() {
    super(...arguments);
    this.futureValue = this.calculateFutureValue();
  }

  get isSubmitDisabled() {
    return this.isValidValue(
      +this.presentValue,
      +this.interestRate,
      +this.periods,
      +this.periodicDeposit
    );
  }

  isValidValue(presentValue, interest, periods, periodicDeposit) {
    const isValidPresentValue = presentValue > 0 || presentValue === 0;
    const isValidInterest = interest > 0 && interest < 100;
    const isValidPeriod = periods > 0;
    const isValidPeriodicDeposit = periodicDeposit > 0 || periodicDeposit === 0;

    return (
      isValidPeriod &&
      isValidPresentValue &&
      isValidInterest &&
      isValidPeriodicDeposit
    );
  }

  calculateFutureValue() {
    const PV = +this.startingAmount;
    const r = +this.interestRate;
    const n = +this.numPeriod;
    const pD = +this.periodicDeposit;

    if(!this.isValidValue(PV, r, n, pD)){
      return
    };

    const rate = r / 100;
    const FutureFixedValue = PV * Math.pow(1 + rate, n);
    // debugger
    const FuturePeriodicValue = pD * (Math.pow(1 + rate, n) - 1) / rate;
    const FV = FutureFixedValue + FuturePeriodicValue;

    return FV.toFixed(2);
  }

  @action
  submitForm(evt) {
    // debugger;
    evt.preventDefault();
    this.futureValue = this.calculateFutureValue();
    // console.log(
    //   this.numPeriod,
    //   this.startingAmount,
    //   this.interestRate,
    //   this.periodicDeposit
    // );
    // window.alert('To be implemented');
  }
}
