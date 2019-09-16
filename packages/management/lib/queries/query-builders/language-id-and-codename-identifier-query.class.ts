import { IManagementClientConfig } from '../../config';
import { Identifiers } from '../../models';
import { ContentManagementQueryService } from '../../services';

export class LanguageIdAndCodenameIdentifierQuery<TResult> {

    constructor(
        protected config: IManagementClientConfig,
        protected queryService: ContentManagementQueryService,
        protected buildResult: (
            config: IManagementClientConfig,
            queryService: ContentManagementQueryService,
            identifier: Identifiers.LanguageIdentifier) => TResult
    ) {
    }

    /**
    * Gets using internal Id
    * @param id Internal Id
    */
    byLanguageId(id: string): TResult {
        return this.buildResult(this.config, this.queryService, new Identifiers.LanguageIdentifier(Identifiers.LanguageIdentifierEnum.InternalId, id));
    }

    /**
    * Gets query using codename
    * @param codename Codename
    */
    byLanguageCodename(codename: string): TResult {
        return this.buildResult(this.config, this.queryService, new Identifiers.LanguageIdentifier(Identifiers.LanguageIdentifierEnum.Codename, codename));
    }
}