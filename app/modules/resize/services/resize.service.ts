import { Inject, Injectable } from '@angular/core';
import { RESIZE_CONFIG } from '../resize.constants';
import { IResizeConfig } from '../resize.types';
import { EventManager } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ResizeService {
    private readonly viewportWidth: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);
    public readonly viewportWidth$: Observable<number> = this.viewportWidth.asObservable();

    constructor(
        @Inject(RESIZE_CONFIG) private config: IResizeConfig,
        private eventManager: EventManager,
    ) {
        this.setResizeListener();
    }

    private setResizeListener() {
        this.eventManager.addGlobalEventListener('window', 'resize', () => {
            this.viewportWidth.next(window.innerWidth);
        });
    }
}
