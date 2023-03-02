import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { HttpClient } from '@angular/common/http';
import { SearchInput } from './models/search-input';
import { AdvancedSearchInput, AdvancedSubSearchInput } from './models/advanced-search-input';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YangSearchService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getSearchResults(searchInput: SearchInput): Observable<any> {
    return this.post('api/yang-search/v2/search', searchInput);
  }

  getAdvancedSearchResults(advancedSearchInput: AdvancedSearchInput): Observable<any> {
    return this.post('api/yang-search/v2/advanced-search', advancedSearchInput);
  }

  getNodeDetails(node: string, path: string, revision: string): Observable<any> {
    return this.customGet(encodeURIComponent('api/yang-search/v2/show-node/' + node  + path + '/' + revision));
  }
}
