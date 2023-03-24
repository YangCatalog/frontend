export interface AdvancedSubSearchInput {
    'name'?: {'string': string, 'must': boolean, 'regex': boolean};
    'revision'?: {'string': string, 'must': boolean};
    'path'?: {'string': string, 'must': boolean};
    'module'?: {'string': string, 'must': boolean, 'regex': boolean};
    'organization'?: {'string': string, 'must': boolean};
    'maturity'?: {'string': string, 'must': boolean};
    'description'?: {
        'string': string,
        'must': boolean,
        'case_insensitive': boolean,
        'use_synonyms': boolean,
        'regex': boolean
    };
}

export interface AdvancedSearchInput {
    'include-mibs': boolean;
    'latest-revision': boolean;
    'yang-versions': string[];
    'schema-types': string[];
    'output-columns': string[];
    'include-drafts': boolean;
    'sub-search': AdvancedSubSearchInput;
}
