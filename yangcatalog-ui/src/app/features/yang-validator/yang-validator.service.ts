import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../core/data.service';
import { ChosenMissingRevsInput } from './models/chosen-missing-revs-input';
import { ValidationOutput } from './models/validation-output';
import { ValidationError } from './models/validation-error';

@Injectable({
  providedIn: 'root'
})
export class YangValidatorService extends DataService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  validateRfcByNumber(rfcNumber: number): Observable<ValidationOutput> {
    return this.post('yangvalidator/v2/rfc', {
      rfc: rfcNumber,
      latest: false
    }).pipe(
      map(output => {
        if (output.hasOwnProperty('Type')) {
          if (output['Type'] == 'error' || output['Type'] == 'info') {
            throw new ValidationError(output['Message'], output['Type']);
          }
        }
        return new ValidationOutput(output['output']);
      })
    );
  }

  getDraftAutocomplete(searchStr: string): Observable<any> {
    return this.customGet('api/yang-search/v2/completions/draft/' + searchStr);
  }

  validateDraftByName(draftName: string): Observable<ValidationOutput> {
    return this.post('yangvalidator/v2/draft', {
      draft: draftName,
      latest: false
    }).pipe(
      map(output => {
        if (output.hasOwnProperty('Type')) {
          if (output['Type'] == 'error' || output['Type'] == 'info') {
            throw new ValidationError(output['Message'], output['Type']);
          }
        }
        return new ValidationOutput(output['output']);
      })
    );
  }

  preSetupFilesUpload(useLatest: boolean, getFromOptions: boolean): Observable<string> {
    return this.post('yangvalidator/v2/upload-files-setup', {
      latest: useLatest,
      'get-from-options': getFromOptions
    }).pipe(
      map(output => {
        return output['output']['cache'];
      })
    );
  }

  uploadPreSetFiles(cache: string, formData: FormData): Observable<any> {
    return this.post('yangvalidator/v2/validator/' + cache, formData)
      .pipe(
        map(output => {
          if (output.hasOwnProperty('Type')) {
            if (output['Type'] == 'error' || output['Type'] == 'info') {
              throw new ValidationError(output['Message'], output['Type']);
            }
          }
          return new ValidationOutput(output['output']);
        })
      );
  }

  uploadPreSetDraftFile(cache: string, formData: FormData): Observable<any> {
    return this.post('yangvalidator/v2/draft-validator/' + cache, formData)
      .pipe(
        map(output => {
          if (output.hasOwnProperty('Type')) {
            if (output['Type'] == 'error' || output['Type'] == 'info') {
              throw new ValidationError(output['Message'], output['Type']);
            }
          }
          if (output.hasOwnProperty('output') && output['output'].hasOwnProperty('error')) {
            throw new ValidationError(output['output']['error'], 'error');
          } else {
            return new ValidationOutput(output['output']);
          }
        })
      );
  }


  validateRfcByNumberWithLatestRevisions(rfcNumber: number): Observable<ValidationOutput> {
    return this.post('yangvalidator/v2/rfc', {
      rfc: rfcNumber,
      latest: true
    }).pipe(
      map(output => {
        return new ValidationOutput(output['output']);
      })
    );
  }

  chooseMissingRevsForPreviousRequest(previousOutput: ValidationOutput, missingInput: ChosenMissingRevsInput): Observable<void> {
    return this.post('yangvalidator/v2/validate', missingInput).pipe(
      map(output => {
        previousOutput.setValidationOutputData(output['output']);
      })
    );
  }

  getValidatorsVersion(): Observable<any> {
    return this.customGet('yangvalidator/v2/versions');
  }
}
