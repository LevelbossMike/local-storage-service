import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'local-storage-test/tests/helpers';

module('Acceptance | notices', function (hooks) {
  setupApplicationTest(hooks);

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

    const localStorage = this.owner.lookup('service:local-storage');
    localStorage.storage.seed({
      notices: ['notice-a'],
    });

    await visit('/');

    assert
      .dom('[data-test-notice-a]')
      .doesNotExist('notica-a is not displayed');
  });
});
