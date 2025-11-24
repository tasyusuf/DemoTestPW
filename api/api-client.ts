import { APIRequestContext } from '@playwright/test';

/**
 * Base API Client for HTTP operations
 * Provides wrapper methods for GET, POST, PUT, DELETE
 */
export class ApiClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext, baseURL: string) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * GET request
   */
  async get(endpoint: string, options?: { params?: Record<string, any>; headers?: Record<string, string> }) {
    const url = `${this.baseURL}${endpoint}`;
    return await this.request.get(url, {
      params: options?.params,
      headers: options?.headers,
    });
  }

  /**
   * POST request
   */
  async post(endpoint: string, data: any, options?: { headers?: Record<string, string> }) {
    const url = `${this.baseURL}${endpoint}`;
    return await this.request.post(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }

  /**
   * PUT request
   */
  async put(endpoint: string, data: any, options?: { headers?: Record<string, string> }) {
    const url = `${this.baseURL}${endpoint}`;
    return await this.request.put(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint: string, data: any, options?: { headers?: Record<string, string> }) {
    const url = `${this.baseURL}${endpoint}`;
    return await this.request.patch(url, {
      data,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string, options?: { headers?: Record<string, string> }) {
    const url = `${this.baseURL}${endpoint}`;
    return await this.request.delete(url, {
      headers: options?.headers,
    });
  }
}

