import mm from 'egg-mock';
import path from 'path';
import assert from 'assert';

describe('test/DynamicInject.test.ts', () => {
  let app;

  after(async () => {
    await app.close();
  });

  afterEach(() => {
    mm.restore();
  });

  before(async () => {
    mm(process.env, 'EGG_TYPESCRIPT', true);
    mm(process, 'cwd', () => {
      return path.join(__dirname, '..');
    });
    app = mm.app({
      baseDir: path.join(__dirname, 'fixtures/apps/dynamic-inject-app'),
      framework: require.resolve('egg'),
    });
    await app.ready();
  });

  it('background task should work', async () => {
    app.mockCsrf();
    const res = await app.httpRequest()
      .get('/dynamicInject')
      .expect(200);
    assert.deepStrictEqual(res.body, [
      'hello, foo(context:0)',
      'hello, bar(context:0)',
      'hello, foo(singleton:0)',
      'hello, bar(singleton:0)',
    ]);
  });
});
