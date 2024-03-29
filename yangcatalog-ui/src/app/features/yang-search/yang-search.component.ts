import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { YcValidationsService } from '../../core/yc-validations.service';
import { AppAgGridComponent } from '../../shared/ag-grid/app-ag-grid.component';
import { YangShowNodeModalComponent } from '../yang-show-node/yang-show-node-modal/yang-show-node-modal.component';
import { AdvancedSubSearchInput } from './models/advanced-search-input';
import { YangSearchService } from './yang-search.service';

@Component({
  selector: 'yc-yang-search',
  templateUrl: './yang-search.component.html',
  styleUrls: ['./yang-search.component.scss']
})
export class YangSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('resultsGrid') resultsGrid: AppAgGridComponent;
  @ViewChild('contentCol') contentCol: ElementRef;

  myBaseUrl = environment.WEBROOT_BASE_URL;

  form: FormGroup;
  searchingProgress = false;
  error: any;
  warnings = [];
  showWarnings = true;

  resultsContainerWidth = '100%';

  active = 1;
  private componentDestroyed: Subject<void> = new Subject<void>();
  results: any;

  // todo: move to separate file
  headerComponentParams = {
    template:
      '<div class="ag-cell-label-container" role="presentation">' +
      '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
      '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
      '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
      '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
      '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
      '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
      '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
      '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
      '  </div>' +
      '</div>'
  };

  allColDefs: ColDef[] = [
    { colId: 'name', field: 'name', maxWidth: 150, headerName: 'Name' },
    { colId: 'revision', field: 'revision', maxWidth: 90, headerName: 'Revision' },
    { colId: 'path', field: 'path', maxWidth: 270, headerName: 'Path' },
    { colId: 'module', field: 'module-name', headerName: 'Module', maxWidth: 150 },
    { colId: 'organization', field: 'organization', maxWidth: 140, headerName: 'Organization' },
    { colId: 'maturity', field: 'maturity', maxWidth: 100, headerName: 'Maturity' },
    { colId: 'description', field: 'description', headerName: 'Description', maxWidth: 400 },
  ];
  currentColDefs = [];
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'notValidRegex',
      format: (label, error) => `Regular expression "${error.value}" is not valid`
    }
  ];

  defaultColDef = {
    autoHeight: true,
    resizable: false,
    sortable: true,
    cellStyle: { 'white-space': 'normal' },
    headerComponentParams: this.headerComponentParams
  };
  gridOptions: GridOptions = {
    onFirstDataRendered: () => this.headerHeightGetter,
    onColumnResized: () => this.headerHeightGetter
  };
  resultsMaximized = false;
  searchedTermToBeHighlighted = '';
  columnsList: { name: string; value: string; }[];

  constructor(
    private fb: FormBuilder,
    private dataService: YangSearchService,
    private modalService: NgbModal,
    private ycValidations: YcValidationsService
  ) { }


  headerHeightGetter = () => {
    const columnHeaderTexts = [
      document.querySelectorAll('.ag-header-cell-text')
    ];
    const clientHeights = columnHeaderTexts.map(
      headerText => headerText['clientHeight']
    );
    const tallestHeaderTextHeight = Math.max(...clientHeights);

    return tallestHeaderTextHeight;
  }

  ngOnInit() {
    this.setColumnsList();
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.adjustColumnsOutput();
  }

  private adjustColumnsOutput() {
    let screenWidth = 0;
    if (this.contentCol) {
      screenWidth = this.contentCol.nativeElement.scrollWidth;
    } else {
      return;
    }
    const formArray: FormArray = this.form.get('outputColumns') as FormArray;
    const allCols = formArray.controls.map(ctrl => ctrl.value);
    const smallScreenCols = ['name', 'revision', 'schema-type', 'path', 'module', 'description'];

    let i = 0;
    if (screenWidth < 1000) {
      allCols.forEach((col) => {
        if (smallScreenCols.indexOf(col) === -1) {
          const index = formArray.controls.indexOf(col);
          formArray.removeAt(index);
        }
        i++;
      });
    }

  }

  private initForm() {
    this.form = this.fb.group({
      searchTerm: ['', [Validators.minLength(3), Validators.required, this.ycValidations.regexpValidation()]],
      searchOptions: this.fb.group({
        caseSensitive: [false],
        regularExpression: [false],
        includeMibs: [false],
        onlyLatestRevs: [true],
        useSynonyms: [true],
        includeDrafts: [true],
      }),
      searchFields: this.fb.array(
        [
          this.fb.control('module'),
          this.fb.control('argument'),
          this.fb.control('description')
        ]
      ),
      yangVersions: this.fb.array([
        this.fb.control('1.0'),
        this.fb.control('1.1')
      ]),
      schemaTypes: this.fb.array([
        this.fb.control('typedef'),
        this.fb.control('grouping'),
        this.fb.control('feature'),
        this.fb.control('identity'),
        this.fb.control('extension'),
        this.fb.control('rpc'),
        this.fb.control('container'),
        this.fb.control('list'),
        this.fb.control('leaf-list'),
        this.fb.control('leaf'),
        this.fb.control('notification'),
        this.fb.control('action'),
      ]),
      outputColumns: this.fb.array([
        this.fb.control('name'),
        this.fb.control('revision'),
        this.fb.control('schema-type'),
        this.fb.control('path'),
        this.fb.control('module-name'),
        this.fb.control('origin'),
        this.fb.control('organization'),
        this.fb.control('maturity'),
        this.fb.control('dependents'),
        this.fb.control('compilation-status'),
        this.fb.control('description'),
      ]),
      advanced: this.fb.array([
        this.fb.array([
          this.fb.group(
            {
              index: [0],
              term: [''],
              col: ['name'],
              must: [true],
              regex: [false],
              case_insensitive: [true],
              use_synonyms: [false],
              op: ['and'],
            }
          )
        ])
      ])
    });

    this.adjustColumnsOutput();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  onCloseError() {
    this.error = null;
  }

  onCheckChange(formControlName, event) {

    const formArray: FormArray = this.form.get(formControlName) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSearchTypeChange() {
    this.form.controls['searchTerm'].updateValueAndValidity();
  }

  checkCheckedField(formGroupName: string, myValue: string): boolean {
    return this.form.get(formGroupName).value.indexOf(myValue) !== -1;
  }

  selectAdvanceSearch(isAdvTab: boolean) {
    const termInput = document.getElementById('searchTermInput');
    const termLabel = document.getElementById('searchTermInputLabel');

    if (isAdvTab && termInput.style.display !== 'none') {
      termInput.style.display = 'none';
      termLabel.style.display = 'none';

      // Updating validator so that main search term is empty
      this.form.get('searchTerm').setValidators([]);

    } else if (!isAdvTab && termInput.style.display === 'none') {
      termInput.style.display = 'block';
      termLabel.style.display = 'block';

      // Updating validator so that main search term is not empty
      this.form.get('searchTerm').setValidators([Validators.required, Validators.minLength(3), this.ycValidations.regexpValidation()]);

    }
    this.form.get('searchTerm').updateValueAndValidity();
  }

  onSearchClick() {
    this.searchingProgress = true;
    this.error = null;
    this.searchedTermToBeHighlighted = this.form.get('searchTerm').value;
    this.results = null;
    this.showWarnings = true;
    this.warnings = [];
    this.currentColDefs = this.allColDefs.filter((col: ColDef) => this.form.get('outputColumns').value.indexOf(col.field) !== -1);
    const subSearchInput = this.prepareSubSearchInput();  // params in Advanced Search tab

    if (subSearchInput.length === 0) {
      // simple search
      console.log('simple search without advanced params');

      const input = {
        'searched-term': this.form.get('searchTerm').value,
        'case-sensitive': this.form.get('searchOptions').get('caseSensitive').value,
        type: this.form.get('searchOptions').get('regularExpression').value ? 'regexp' : 'term',
        'include-mibs': this.form.get('searchOptions').get('includeMibs').value,
        'latest-revision': this.form.get('searchOptions').get('onlyLatestRevs').value,
        'use-synonyms': this.form.get('searchOptions').get('useSynonyms').value,
        'include-drafts': this.form.get('searchOptions').get('includeDrafts').value,
        'searched-fields': this.form.get('searchFields').value,
        'yang-versions': this.form.get('yangVersions').value,
        'schema-types': this.form.get('schemaTypes').value,
        'output-columns': this.form.get('outputColumns').value,
        'sub-search': subSearchInput
      };

      this.dataService.getSearchResults(input).pipe(
        finalize(() => this.searchingProgress = false),
        takeUntil(this.componentDestroyed)
      ).subscribe(
        results => {
          if (results['max-hits']) {
            this.warnings.push('Maximum number of results reached. Not all results will be shown.');
          }
          if (results['timeout']) {
            this.warnings.push('Timeout while searching. Please try searching for something more specific.');
          }
          this.results = results;
        },
        err => {
          this.error = err;
          console.error(err);
        }
      );

    } else {
      // advanced search
      console.log('advanced search with params:');
      console.log(subSearchInput);

      const processedSubSearchInput: AdvancedSubSearchInput = {};
      // TODO - now we just use the first group, maybe in the future we will return to multiple
      console.log(subSearchInput);
      Object.keys(subSearchInput[0]).forEach(key => {
        processedSubSearchInput[key] = { string: subSearchInput[0][key][0]['term'], must: subSearchInput[0][key][0]['must'] };
        if (subSearchInput[0][key][0].hasOwnProperty('regex')) {
          processedSubSearchInput[key]['regex'] = subSearchInput[0][key][0]['regex'];
        }
        if (key === 'module-name') {  // backend uses another notion of this parameter
          processedSubSearchInput['module'] = processedSubSearchInput['module-name'];
          delete processedSubSearchInput['module-name'];
        }
        if (key === 'description') {  // need to add additional parameters to description
          processedSubSearchInput[key]['case_insensitive'] = subSearchInput[0][key][0]['case_insensitive'];
          processedSubSearchInput[key]['use_synonyms'] = subSearchInput[0][key][0]['use_synonyms'];
        }
      });

      const input = {
        'include-mibs': this.form.get('searchOptions').get('includeMibs').value,
        'latest-revision': this.form.get('searchOptions').get('onlyLatestRevs').value,
        'yang-versions': this.form.get('yangVersions').value,
        'schema-types': this.form.get('schemaTypes').value,
        'output-columns': this.form.get('outputColumns').value,
        'include-drafts': this.form.get('searchOptions').get('includeDrafts').value,
        'sub-search': processedSubSearchInput
      };
      console.log(input);

      this.dataService.getAdvancedSearchResults(input).pipe(
        finalize(() => this.searchingProgress = false),
        takeUntil(this.componentDestroyed)
      ).subscribe(
        results => {
          if (results['max-hits']) {
            this.warnings.push('Maximum number of results reached. Not all results will be shown.');
          }
          if (results['timeout']) {
            this.warnings.push('Timeout while searching. Please try searching for something more specific.');
          }
          this.results = results;
        },
        err => {
          this.error = err;
          console.error(err);
        }
      );

    }
  }

  onGridReady(event: any) {
    // setTimeout(() => {
    //   const newSize = this.resultsGrid.getColsViewportScrollWidth() + 25;
    //   this.resultsContainerWidth = (newSize) + 'px';
    // });
  }

  onMaximizeResultsClick() {
    this.resultsMaximized = true;
  }

  onRestoreResultsClick() {
    this.resultsMaximized = false;
  }

  setColumnsList() {
    this.columnsList = this.allColDefs.map(
      c => {
        return { value: c['field'], name: c['headerName'] };
      }
    );
  }


  private prepareSubSearchInput() {
    const advancedGroupsFormArray: FormArray = this.form.get('advanced') as FormArray;

    const result = [];

    advancedGroupsFormArray.controls.forEach(
      (searchGroup: FormGroup, i) => {
        const advGroupArray: FormArray = advancedGroupsFormArray.at(i) as FormArray;
        let hasSomeInput = false;
        const subResult = {};

        advGroupArray.controls.forEach(control => {
          if (control.get('term').value.length > 0) {
            if (!subResult.hasOwnProperty(control.get('col').value)) {
              subResult[control.get('col').value] = [];
            }
            if ('description' === control.get('col').value) {
              subResult[control.get('col').value].push({
                term: control.get('term').value,
                must: control.get('must').value,
                regex: control.get('regex').value,
                case_insensitive: control.get('case_insensitive').value,
                use_synonyms: control.get('use_synonyms').value
              });
            }
            else if (['name', 'module-name'].includes(control.get('col').value)) {
              subResult[control.get('col').value].push({
                term: control.get('term').value,
                must: control.get('must').value,
                regex: control.get('regex').value
              });
            } else {
              subResult[control.get('col').value].push({
                term: control.get('term').value,
                must: control.get('must').value
              });
            }
            hasSomeInput = true;
          }
        });
        if (hasSomeInput) {
          result.push(subResult);
        }
      }
    );

    return result;
  }

  prepareNodeDetailUri(row: any) {
    let result = this.myBaseUrl + '/yang-search/show_node/';
    result = result + encodeURIComponent(row['module-name']) + '/' + encodeURIComponent(row['path']) + '/' + encodeURIComponent(row['revision']);
    return result;
  }

  addAdvSearchTerm(groupIndex: number, termIndex: number) {
    const advancedFormArray: FormArray = this.form.get('advanced') as FormArray;
    const advGroupArray: FormArray = advancedFormArray.at(groupIndex) as FormArray;
    const newGroup = this.fb.group({
      index: [groupIndex + 1],
      term: [''],
      col: ['name'],
      must: [true],
      regex: [false],
      case_insensitive: [true],
      use_synonyms: [false],
      op: ['and'],
    }
    );
    advGroupArray.insert((termIndex + 1), newGroup);
  }

  removeAdvSearchTerm(groupIndex: number, termIndex: number) {
    const advancedFormArray: FormArray = this.form.get('advanced') as FormArray;
    const advGroupArray: FormArray = advancedFormArray.at(groupIndex) as FormArray;
    advGroupArray.removeAt(termIndex);
    if (advGroupArray.length === 0) {
      advancedFormArray.removeAt(groupIndex);
    }
  }

  openNodeDetail(row: any) {
    const modalNodeDetail: YangShowNodeModalComponent = this.modalService.open(YangShowNodeModalComponent, {
      size: 'lg',
    }).componentInstance;
    modalNodeDetail.node = row['module-name'];
    modalNodeDetail.path = row['path'];
    modalNodeDetail.revision = row['revision'];
    modalNodeDetail.paramsSetManually.next(true);
  }

  onCloseWarnings() {
    this.showWarnings = false;
  }
}
