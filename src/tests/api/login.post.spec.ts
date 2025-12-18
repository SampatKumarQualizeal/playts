import { expect, test, APIRequestContext } from '@playwright/test';

test.describe('@companyapi', () => {
  let company_id: string | null = null;
  test('create', async ({ request, baseURL }: { request: APIRequestContext; baseURL?: string }) => {
    const res = await request.post((baseURL ?? '') + 'companies/', {
      headers: {
        Authorization: `token ${process.env.API_TOKEN}`,
      },
      data: { name: "D'Amore Inc" },
    });

    const status = res.status();
    console.log(`Login request status: ${status}`);

    const responseData = await res.json();
    console.log('Login response data:', responseData);
    console.log(responseData.response.result.id);

    company_id = responseData.response.result.id;

    const res2 = await request.get((baseURL ?? '') + `companies/${company_id}/`);
    const status2 = res2.status();
    console.log(`Login request status: ${status2}`);

    const search_data = await res2.json();

    console.log(search_data.response.results.name);
    expect(search_data.response.results.name).toEqual("D'Amore Inc");
  });
});