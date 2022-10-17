import Service from '@ember/service';
import { getOwner } from '@ember/application';

export function storageFor(key) {
  return function () {
    return {
      get() {
        const owner = getOwner(this);

        const localStorageService = owner.lookup('service:localStorage');

        return localStorageService.getBucket(key);
      },
    };
  };
}

/**
 * A service that wraps access to local-storage. We wrap
 * local-storage to not pollute local-storage during testing.
 */
export default class LocalStorageService extends Service {
  constructor() {
    super(...arguments);

    this.buckets = new Map();
  }

  getBucket(key) {
    const bucket = this.buckets.get(key);

    if (bucket) {
      return bucket;
    } else {
      return this._setupBucket(key);
    }
  }

  get storage() {
    return window.localStorage;
  }

  _setupBucket(key) {
    const owner = getOwner(this);
    const Klass = owner.factoryFor(`storage:${key}`).class;
    const storage = new Klass(key, this.storage);

    this.buckets.set(key, storage);

    return storage;
  }
}
