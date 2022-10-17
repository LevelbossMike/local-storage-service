import Controller from '@ember/controller';
import { storageFor } from '../services/local-storage';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @storageFor('notices') notices;

  get showNotice() {
    return !this.notices.state.includes('notice-a');
  }

  @action dismissNotice() {
    this.notices.add('notice-a');
  }
}
