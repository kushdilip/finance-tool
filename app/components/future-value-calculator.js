import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class FutureValueCalculatorComponent extends Component {
  @action
  calculate() {
    window.alert('To be implemented')
  }
}
