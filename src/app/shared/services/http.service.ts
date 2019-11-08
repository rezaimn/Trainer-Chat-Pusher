import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

/**
 * this service is for handling RESTFUL APIs
 */
@Injectable()
export class HttpService  {

  constructor(private http: HttpClient) { }
  /**
   *  it adds the input url to the base URL
   */
  getFullUrl(url: string) {
    return environment.chat_kit_base_url + url;
  }
  /**
   * @param {string:url}
   *  Here we can call a get request to get an/array item/s.
   *  @return {Observable}
   */
  get(url: string): Observable<any> {
    return this.http.get(this.getFullUrl(url), this.getHeaders('get')).pipe(
      tap(
        (res: any) => {

        },
        (error: any) => {

        }
      )
    )
  }

  /**
   * @param {string:url},{json:body}
   *  Here we can call a post request to add an item.
   *  @return {Observable}
   */
  post(url: string, body: any): Observable<any>{
    return this.http.post(this.getFullUrl(url) , body).pipe(
      tap(
        (res: any) => {
        },
        (error: any) => {

        }
      )
    )
  }

  /**
   * @param {string:url},{json:body}
   *  Here we can call a put request to update an item.
   *  @return {Observable}
   */
  put(url: string, body: any): Observable<any>{
    return this.http.put(this.getFullUrl(url) , body, this.getHeaders('put')).pipe(
      tap(
        (res: any) => {
        },
        (error: any) => {

        }
      )
    )
  }

  /**
   * @param {string:url}
   *  Here we can call a delete request to delete an item.
   *  @return {Observable}
   */
  delete(url: string ): Observable<any> {
    return this.http.delete(this.getFullUrl(url), this.getHeaders('delete')).pipe(
      tap(
        (res: any) => {

        },
        (error: any) => {

        }
      )
    )
  }



  /**
   * @param {string}
   * Here we set up headers for each request type
   * @return {HttpHeaders}
   */
  getHeaders(requestType){
    let requestsHeader;
    switch (requestType) {
      case 'login':{
        requestsHeader=new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        break;
      }
      case 'get':{
        requestsHeader=new HttpHeaders({
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        break;
      }
      case 'post':{
        requestsHeader=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        });
        break;
      }
      default:{
        requestsHeader=new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Accept': 'application/json'
        });
      }
    }
    return {headers: requestsHeader};
  }
}
