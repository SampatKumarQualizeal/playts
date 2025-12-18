import { request, expect } from '@playwright/test';

class BaseAPI {
  baseURL: string;
  token?: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async getAuthToken(username: string, password: string): Promise<string> {
    const endpoint = `auth/`;
    let payload = {
      email: username,
      password: password,
    };
    const data = await this.post(endpoint, {}, payload);
    this.token = data.response.token;
    return this.token as string;
  }

  async post(endpoint: string, headers: Record<string, string>, payload: any): Promise<any> {
    const context = await request.newContext();
    const response = await context.post(this.baseURL + endpoint, {
      headers: headers,
      data: payload,
    });
    expect(response.status()).toBe(201);
    return await response.json();
  }

  async get(endpoint: string, headers: Record<string, string>, payload: any): Promise<any> {
    const context = await request.newContext();
    const response = await context.get(this.baseURL + endpoint, {
      headers: headers,
      data: payload,
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async delete(endpoint: string, headers: Record<string, string>, payload: any): Promise<any> {
    const context = await request.newContext();
    const response = await context.delete(this.baseURL + endpoint, {
      headers: headers,
      data: payload,
    });
    expect(response.status()).toBe(200);
    return await response.json();
  }
}

export default BaseAPI;
