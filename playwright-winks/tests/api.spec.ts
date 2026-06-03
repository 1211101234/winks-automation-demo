import { test, expect } from '@playwright/test';
import { sendToWinks } from '../utils/winksReporter';

test('API - Get Users', async ({ request }) => {

  await sendToWinks('API test started', 'START');

  // GET request
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  await sendToWinks('GET /users called', 'INFO');

  expect(response.status()).toBe(200);
  await sendToWinks('Status 200 validated', 'PASS');

  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
  await sendToWinks(`Returned ${body.length} users`, 'PASS');

  await sendToWinks('API GET test finished', 'END');

});

test('API - Create Post', async ({ request }) => {

  await sendToWinks('API POST test started', 'START');

  // POST request
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Winks Demo Post',
      body: 'This is a test post from Playwright',
      userId: 1
    }
  });

  await sendToWinks('POST /posts called', 'INFO');

  expect(response.status()).toBe(201);
  await sendToWinks('Status 201 validated', 'PASS');

  const body = await response.json();
  expect(body.id).toBeDefined();
  await sendToWinks(`Post created with ID: ${body.id}`, 'PASS');

  await sendToWinks('API POST test finished', 'END');

});

test('API - Get Single Post', async ({ request }) => {

  await sendToWinks('API single post test started', 'START');

  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  await sendToWinks('GET /posts/1 called', 'INFO');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body.title).toBeDefined();

  await sendToWinks(`Post title: ${body.title}`, 'INFO');
  await sendToWinks('Single post validation passed', 'PASS');

  await sendToWinks('API single post test finished', 'END');

});