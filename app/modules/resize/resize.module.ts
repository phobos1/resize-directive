import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IResizeConfig } from './resize.types';
import { RESIZE_CONFIG } from './resize.constants';
import { ResizeService } from './services/resize.service';
import { IfViewportSizeDirective } from './directives/if-viewport-size.directive';
import { EventManager } from '@angular/platform-browser';


@NgModule({
    declarations: [
        IfViewportSizeDirective,
    ],
    exports: [
        IfViewportSizeDirective,
    ],
    imports: [
        CommonModule,
    ],
})
export class ResizeModule {
    static forRoot(config: IResizeConfig): ModuleWithProviders<ResizeModule> {
        return {
            ngModule: ResizeModule,
            providers: [
                { provide: RESIZE_CONFIG, useValue: config },
                {
                    provide: ResizeService,
                    useFactory: resizeServiceFactory,
                    deps: [RESIZE_CONFIG, EventManager],
                },
            ],
        };
    }
}

/** https://www.bennadel.com/blog/3565-providing-module-configuration-using-forroot-and-ahead-of-time-compiling-in-angular-7-2-0.htm */
export function resizeServiceFactory(config: IResizeConfig, eventManager: EventManager): ResizeService {
    return new ResizeService(config, eventManager);
}
