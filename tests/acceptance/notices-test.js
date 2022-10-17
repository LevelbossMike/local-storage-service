import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'local-storage-test/tests/helpers';
import LocalStorageService from 'local-storage-test/services/local-storage';

class StorageStub {
  constructor(data) {
    this.data = data || new Map();
  }

  getItem(key) {
    return this.data.get(key);
  }

  setItem(key, value) {
    this.data.set(key, value.toString());
  }
}
module('Acceptance | notices', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      'service:local-storage',
      class Stub extends LocalStorageService {
        get storage() {
          return new StorageStub();
        }
      }
    );
  });

  test('working with notices', async function (assert) {
    await visit('/');

    assert.dom('[data-test-notice-a]').exists('notica-a is displayed');
  });

  test('after dismissing notice-a it is not displayed anymore', async function (assert) {
    await visit('/');

    assert.dom('[data-test-notice-a]').exists('notica-a is displayed');

    await click('[data-test-dismiss-notice-a]');

    assert
      .dom('[data-test-notice-a]')
      .doesNotExist('notica-a is not displayed anymore');
  });

  test('when data is present in local storage', async function (assert) {
    const data = new Map();
    data.set('notices', 'notice-a');

    this.owner.register(
      'service:local-storage',
      class Stub extends LocalStorageService {
        get storage() {
          return new StorageStub(data);
        }
      }
    );

    await visit('/');

    assert
      .dom('[data-test-notice-a]')
      .doesNotExist('notica-a is not displayed');
  });
});
