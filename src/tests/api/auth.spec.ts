import { test as setup, APIRequestContext } from '@playwright/test';
import CompanyAPI from '../../utils/api/company_api';

setup('authenticate', async ({ request, baseURL }: { request: APIRequestContext; baseURL?: string }) => {
  const obj = new CompanyAPI('https://api.cogmento.com/api/1/');
  const data = await obj.getAuthToken('navyanalli9@gmail.com', 'Lvuhdad55@');
  console.log(data);
  // const data = await obj.getCompanyData("e60303e2-43a5-44c4-a4a4-7751a68cf609");
  // console.log(data);

});