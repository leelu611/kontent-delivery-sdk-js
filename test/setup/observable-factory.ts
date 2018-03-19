import { Observable } from 'rxjs/Observable';

import { IDeliveryClient, IQueryConfig } from '../../lib';
import { AllTestObjects, Movie } from './models';

class ObservableFactory {

    private readonly movieCodename: string = 'warrior';
    private readonly taxonomyCodename: string = 'movietype';
    private readonly typeCodename: string = 'movie';
    private readonly elementCodename: string = 'title';

    /**
     * Gets single observable containing all test object types
     * @param client
     * @param queryConfig
     */
    getAllTestObjects(client: IDeliveryClient, queryConfig?: IQueryConfig): Observable<AllTestObjects> {

        const all: AllTestObjects = new AllTestObjects();

        if (!queryConfig) {
            queryConfig = {};
        }

        const observables: Observable<any>[] = [];

        const itemObs = client.item<Movie>(this.movieCodename).queryConfig(queryConfig).get().map(r => all.item = r);
        const itemsObs = client.items<Movie>().queryConfig(queryConfig).get().map(r => all.items = r);
        const taxonomyObs = client.taxonomy(this.taxonomyCodename).queryConfig(queryConfig).get().map(r => all.taxonomy = r);
        const taxonomiesObs = client.taxonomies().queryConfig(queryConfig).get().map(r => all.taxonomies = r);
        const typeObs = client.type(this.typeCodename).queryConfig(queryConfig).get().map(r => all.type = r);
        const typesObs = client.types().queryConfig(queryConfig).get().map(r => all.types = r);
        const elementObs = client.element(this.typeCodename, this.elementCodename).queryConfig(queryConfig).get().map(r => all.element = r);

        observables.push(itemObs);
        observables.push(itemsObs);
        observables.push(taxonomyObs);
        observables.push(taxonomiesObs);
        observables.push(typeObs);
        observables.push(typesObs);
        observables.push(elementObs);

        const zippedObservable = this.zipObservables(observables);

        return zippedObservable.map(() => all);
    }

    /**
    * Zips array of observables into one that gets executed once all inner subscriptions complete
    * https://www.learnrxjs.io/operators/combination/zip.html
    * @param observables Observables zip
    */
    zipObservables(observables: Observable<any>[]): Observable<any> {
        if (!observables) {
            throw Error(`Given Observables are not valid`);
        }

        if (!Array.isArray(observables)) {
            throw Error(`Given observables are not in array`);
        }

        if (observables.length === 0) {
            throw Error(`Observables array doesn't contain any observable`);
        }

        if (observables.length === 1) {
            return observables[0];
        }

        let zippedObservable: Observable<any> = observables[0];

        for (let i = 1; i < observables.length; i++) {
            const currentObservable = observables[i];
            zippedObservable = zippedObservable.zip(currentObservable);
        }

        return zippedObservable;
    }
}

export let observableFactory = new ObservableFactory();



