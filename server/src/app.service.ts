import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  private token: string;

  private async getCredentials() {
    const url = `https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`;
    try {
      const response = await axios.get<{ token: string }>(url);

      this.token = response.data.token;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }

  private async getConfig() {
    if (!this.token) await this.getCredentials();

    return {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  public async getToken() {
    if (!this.token) await this.getCredentials();
    return { token: this.token };
  }

  public async getCourses() {
    const url = `https://api.wisey.app/api/v1/core/preview-courses`;
    try {
      const response = await axios.get(url, await this.getConfig());

      return response.data;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }

  public async getCoursesV2(currentPage: number, perPage: number) {
    const currentPageUp = currentPage ? currentPage : 1;
    const perPageUp = perPage ? perPage : 10;

    const url = `https://api.wisey.app/api/v1/core/preview-courses`;
    try {
      const response = await axios.get(url, await this.getConfig());

      const currentPageCourses = [];
      const startIndex = (currentPageUp - 1) * perPageUp;
      const endIndex = currentPageUp * perPageUp;
      for (
        let i = startIndex;
        i < endIndex && i < response.data.courses.length;
        i++
      ) {
        currentPageCourses.push(response.data.courses[i]);
      }

      return {
        courses: currentPageCourses,
      };
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }

  public async getCourseById(id: string) {
    const url = `https://api.wisey.app/api/v1/core/preview-courses/${id}`;
    try {
      const response = await axios.get(url, await this.getConfig());

      return response.data;
    } catch (error) {
      if (error instanceof Error) throw Error(error.message);
    }
  }
}
