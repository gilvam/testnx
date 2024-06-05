# Testnx

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

## Start the application

Run `npx nx serve testnx` to start the development server. Happy coding!

## Build for production

Run `npx nx build testnx` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)

```javascript

export class DateUtil {
   static getTrimestrer(offset: number = 0, fromDate?: Date): DateRange {
        const currentDate = fromDate ?? new Date();
        const currentMonth = currentDate.getMonth() + 1; // Janeiro é 1, fevereiro é 2, etc.
        const currentYear = currentDate.getFullYear();
    
        // Determinar o trimestre atual
        const currentTrimester = Math.floor((currentMonth - 1) / 3) + 1;
    
        // Ajustar o trimestre com base no deslocamento
        const targetTrimester = currentTrimester + offset;
    
        // Calcular o início do trimestre
        const startMonth = (targetTrimester - 1) * 3 + 1;
        const startDate = new Date(currentYear, startMonth - 1, 1); // Primeiro dia do mês
    
        // Calcular o final do trimestre
        const endMonth = startMonth + 2;
        const lastDayOfMonth = new Date(currentYear, endMonth, 0).getDate();
        const endDate = new Date(currentYear, endMonth - 1, lastDayOfMonth); // Último dia do mês
    
        return new DateRange(startDate, endDate);
    }
}

export class DateRange {
    init: Date;
    end: Date;

    constructor(init: Date, end: Date) {
        this.init = init;
        this.end = end;
    }
}

console.log(DateUtil.getTrimestrer(0, new Date(2024, 2)))  // ['2024-01-01', '2024-03-31'];
console.log(DateUtil.getTrimestrer(0, new Date(2024, 5)))  // ['2024-04-01', '2024-06-30'];
console.log(DateUtil.getTrimestrer(0, new Date(2024, 6)))  // ['2024-07-01', '2024-09-30'];
console.log(DateUtil.getTrimestrer(0, new Date(2024, 10))) // ['2024-10-01', '2024-12-31'];



@Injectable({ providedIn: 'root' })
export class StoreService {
	user$ = new BehaviorSubject<UserDto>(new UserDto());

	origin = new StoreAddressList(new BehaviorSubject([]), AddressTypeEnum.ORIGIN);
	destination = new StoreAddressList(new BehaviorSubject([]), AddressTypeEnum.DESTINATION);

	volumeList$ = new BehaviorSubject<VolumeModel[]>([new VolumeModel()]);
	cotacao$ = new BehaviorSubject<CotacaoDto>(new CotacaoDto());
	card$ = new BehaviorSubject<CreditCardModel>(new CreditCardModel());

	formValid$ = new BehaviorSubject<FormValidModel>(new FormValidModel());
	contractFinalize$ = new BehaviorSubject<ContractFinalizeDto>(new ContractFinalizeDto());
	coupon$ = new BehaviorSubject<CouponDto>(new CouponDto());

	config: ConfigDto;
	private blackList = [StorageKeyEnum.COTACAO, StorageKeyEnum.FORM_VALID];
	private subscribedList: Map<StorageKeyEnum, Subscription> = new Map();

	constructor() {
		this.initStorage();
	}

	get isContractFinalize(): boolean {
		return !!this.contractFinalize$.value?.status;
	}

	private static async getStorage(key: string): Promise<any> {
		const storage = localStorage.getItem(key);
		if (!storage) {
			return null;
		}
		return JSON.parse(storage);
	}

	private static async setStorage(key: StorageKeyEnum, obj: any) {
		localStorage.setItem(key, JSON.stringify(obj));
	}

	private static async clearStorage(): Promise<any> {
		return localStorage.clear();
	}

	refreshStorage(): void {
		// [this.user$, this.origin.list$, this.destination.list$, this.cotacao$, this.card$, this.formValid$, this.coupon$].map(it => {
		// 	if (it instanceof BehaviorSubject) {
		// 		it.complete();
		//
		// 		if (it.observers.length) {
		// 			it.unsubscribe();
		// 		}
		// 	}
		// 	return it;
		// });

		this.initStorage();
	}

	resetAndInitStorage(): Promise<any> {
		return StoreService.clearStorage();
	}

	resetAndInitStorageAndVariables(): void {
		this.resetAndInitStorage();
		this.clearValues();
	}

	setUserLogged(user: UserDto): void {
		this.user$.next(user);
	}

	deleteUserLogged(): void {
		this.user$.next(new UserDto());
	}

	nextVolume(volume: VolumeModel): void {
		this.volumeList$.next([...this.volumeList$.value, volume]);

		const formValid = this.formValid$.value;
		formValid.volumeList.push(false);
		this.formValid$.next(formValid);
	}

	editVolume(index: number, volume: VolumeModel): void {
		this.volumeList$.value[index] = volume;
		this.volumeList$.next(this.volumeList$.value);
	}

	editAllVolumes(volumeList: VolumeModel[]): void {
		this.volumeList$.next(volumeList);
	}

	cloneVolume(index: number) {
		const volumeCloned: VolumeModel = { ...this.volumeList$.value[index] };
		const volumeList = [...this.volumeList$.value];
		volumeList.splice(index + 1, 0, volumeCloned);
		this.volumeList$.next(volumeList);
	}

	deleteVolume(indexList: number | number[]) {
		const index = Array.isArray(indexList) ? indexList : [indexList];
		const volumesLast = this.volumeList$.value.filter((item, i) => !index.includes(i));
		const formValid = this.formValid$.value;

		this.volumeList$.next(volumesLast.length ? volumesLast : [new VolumeModel()]);
		formValid.volumeList = formValid.volumeList.filter((_, i) => !index.includes(i));
		this.formValid$.next(formValid);
	}

	editCard(card: CreditCardModel) {
		const c = new CreditCardModel(card.nameOwner, card.cardNumber, card.expiration, card.cvv, card.brand, card.iuguId);
		this.card$.next(c);
	}

	editformValid(formValid: FormValidModel) {
		this.formValid$.next(formValid);
	}

	setFormValidCreditCard(val: boolean): void {
		const fo = this.formValid$.value;
		fo.creditCard = val;
		this.formValid$.next(fo);
	}

	setFormValidTermsOfUser(val: boolean): void {
		const fo = this.formValid$.value;
		fo.termsOfUser = val;
		this.formValid$.next(fo);
	}

	setFormValidVolumeList(index: number, val: boolean): void {
		const formValid = this.formValid$.value;
		formValid.volumeList[index] = val;

		this.formValid$.next(formValid);
	}

	setQuotation(quotation: CotacaoDto) {
		this.cotacao$.next(quotation);
	}

	deleteQuotation() {
		this.cotacao$.next(new CotacaoDto());
	}

	nextCoupon(coupon: CouponDto) {
		this.coupon$.next(coupon);
	}

	private clearValues() {
		this.user$.next(new UserDto());

		this.origin.list$.next([]);
		this.destination.list$.next([]);
		this.volumeList$.next([new VolumeModel()]);
		this.cotacao$.next(new CotacaoDto());
		this.card$.next(new CreditCardModel());

		this.formValid$.next(new FormValidModel());
		this.contractFinalize$.next(new ContractFinalizeDto());
		this.coupon$.next(new CouponDto());
	}

	private initStorage(): void {
		/** TODO para melhorar, serian interessante cirar uma instância nova de cada classe quando pegar do localStorage */
		this.loading(StorageKeyEnum.USER, this.user$);
		this.loading(StorageKeyEnum.ORIGIN_LIST, this.origin.list$);
		this.loading(StorageKeyEnum.DESTINATION_LIST, this.destination.list$);
		this.loading(StorageKeyEnum.COTACAO, this.cotacao$);
		this.loading(StorageKeyEnum.CARD, this.card$);
		this.loading(StorageKeyEnum.FORM_VALID, this.formValid$);
		this.loading(StorageKeyEnum.COUPON, this.coupon$);

		const sub = this.loading(StorageKeyEnum.VOLUME_LIST, this.volumeList$)
			.pipe(skip(1))
			.subscribe(it => {
				const formValid = this.formValid$.value;
				formValid.volumeList = it.map(_ => false);
				this.formValid$.next(formValid);
				sub.unsubscribe();
			});
	}

	private loading(key: StorageKeyEnum, behavior: BehaviorSubject<any[] | any>) {
		StoreService.getStorage(key).then((items: any[] | any | null) => {
			if (this.blackList.some(item => item === key)) {
				return behavior.next(behavior.value);
			}
			return behavior.next(items ? items : behavior.value);
		});

		if (!this.subscribedList.has(key)) {
			const subscription = behavior.subscribe(items => {
				StoreService.setStorage(key, items).then();
				if (!ObjectUtil.isEmpty(items) || items.length) {
					console.log(`%c ----$ ${key}$:`, 'color: #8b48bf', items);
				}
			});

			this.subscribedList.set(key, subscription);
		}

		return behavior;
	}
}





export class StringUtil<T> {
  static capitalize(text: string) {
    return `${ text.charAt(0).toUpperCase() }${ text.slice(1).toLowerCase() }`;
  }

  static onlyNumber(text: string | number): string {
    return String(text).match(/\d/gi)?.join('') || '';
  }

  static snakeToCamel(str: any) {
    return str.toLowerCase().replace(/([-_][a-z])/g, (group: any) => group.toUpperCase().replace('-', '').replace('_', ''));
  }
}




import { StringUtil } from './string.util';

export class ObjectUtil {
  static isEquals(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  static isEmpty(obj: any): boolean {
    if (!obj) {
      return true;
    }
    return !Object.keys(obj).length || !Object.keys(obj).some(key => !!obj[key]);
  }

  static isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  static isArrayOfObject(array: any[]): boolean {
    if (!Array.isArray(array)) {
      return false;
    }
    return array.some(it => ObjectUtil.isObject(it));
  }

  private static keyMapper([key, val]: [any, any]): [any, any] {
    const keyCamel = StringUtil.snakeToCamel(key);

    if (ObjectUtil.isObject(val)) {
      return [keyCamel, ObjectUtil.lowerCaseKey({ obj: val })];
    } else if (ObjectUtil.isArrayOfObject(val)) {
      return [keyCamel, val.map((it: any) => ObjectUtil.lowerCaseKey({ obj: it }))];
    }

    return [keyCamel, val];
  }

  private static lowerCaseKey({ obj }: { obj: any }) {
    return Object.entries(obj)
      .map(ObjectUtil.keyMapper)
      .reduce((acc: any, [k, v]) => {
        return (acc[k] = v), acc;
      }, {});
  }

  static snakeToCamel(object: any) {
    return ObjectUtil.lowerCaseKey({ obj: object });
  }
}




import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ObjectUtil } from '../_shared/utils/object.util';
import { DOCUMENT } from '@angular/common';

export enum HierarchyTypeEnum {
  ADMIN = 4,
  TERR = 3,
  Z = 2,
  OF = 1,
  MANA = 0,
}

export enum StorageKeyEnum {
  HIERARCHY = '#hierarchy',
}

export class Hierarchy {
  id: string;
  level: HierarchyTypeEnum;

  constructor(id = '', level = HierarchyTypeEnum.MANA) {
    this.id = id;
    this.level = level;
  }

  isEmpty() {
    return ObjectUtil.isEmpty(this);
  }
}

class StoreHierarchyList {
  list$: BehaviorSubject<Hierarchy[]>;

  constructor(list$: BehaviorSubject<Hierarchy[]>) {
    this.list$ = list$;
  }

  add(address: Hierarchy): void {
    this.list$.next(this.pushUnique(this.list$.value, address));
  }

  edit(index: number, address: Hierarchy): void {
    this.list$.value[index] = address;
    this.list$.next(this.list$.value);
  }

  get(index: number): Hierarchy | undefined {
    return this.list$.value.find((it, i) => i === index);
  }

  getById(id: string): Hierarchy | undefined {
    return this.list$.value.find(it => it.id === id);
  }

  getByLevel(level: HierarchyTypeEnum): Hierarchy | undefined {
    return this.list$.value.find(it => it.level === level);
  }

  private pushUnique(list: Hierarchy[], hierarchy: Hierarchy): Hierarchy[] {
    return list?.length ? [...list.filter(item => item.id !== hierarchy.id || item.level !== hierarchy.level), hierarchy] : [hierarchy];
  }
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  hierarchy = new StoreHierarchyList(new BehaviorSubject<Hierarchy[]>([]));

  private blackList = [];
  private subscribedList: Map<StorageKeyEnum, Subscription> = new Map();
  private static storage: Storage;


  constructor(@Inject(DOCUMENT) private document: Document) {
    this.init();
  }

  get storage(): Storage {
    return this.document.defaultView?.sessionStorage as Storage;
  }

  private static async getStorage(key: string): Promise<any> {
    const values = this.storage.getItem(key);
    if (!values) {
      return null;
    }
    return JSON.parse(values);
  }

  private static async setStorage(key: StorageKeyEnum, obj: any) {
    this.storage.setItem(key, JSON.stringify(obj));
  }

  private static async clearStorage(): Promise<any> {
    return this.storage.clear();
  }

  clear(): void {
    this.clearStorage().then(() => {
      this.hierarchy.list$.next([]);
    });
  }

  private clearStorage() {
    return StoreService.clearStorage();
  }

  private init(): void {
    this.loading(StorageKeyEnum.HIERARCHY, this.hierarchy.list$);
  }

  private loading(key: StorageKeyEnum, behavior: BehaviorSubject<any[] | any>) {
    StoreService.getStorage(key).then((items: any[] | any | null) => {
      if (this.blackList.some(item => item === key)) {
        return behavior.next(behavior.value);
      }
      return behavior.next(items ? items : behavior.value);
    });

    if (!this.subscribedList.has(key)) {
      const subscription = behavior.subscribe(items => {
        StoreService.setStorage(key, items).then();
        if (!ObjectUtil.isEmpty(items) || items.length) {
        }
        console.log(`%c ----$ ${ key }$:`, 'color: #8b48bf', items);
      });

      this.subscribedList.set(key, subscription);
    }

    return behavior;
  }
}


class NumberUtil {
    static simplifyNumber(input: string | number): string {
        const num = typeof input === 'string' ? parseFloat(input) : input;

        if (isNaN(num)) {
            throw new Error('Entrada inválida');
        }

        if (num === 0) {
            return '0';
        }

        const abbreviations = ['', 'K', 'MM', 'B', 'T'];
        const divisor = 1000;

        const tier = Math.log10(Math.abs(num)) / 3 | 0;

        if (tier === 0) {
            return num.toFixed(1);
        }

        const suffix = abbreviations[tier];
        const scale = Math.pow(divisor, tier);
        const scaled = num / scale;

        return scaled.toFixed(1) + ' ' + suffix;
    }
}



``

