import {
    Directive,
    EmbeddedViewRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { IResizeConfig, TSizes } from '../resize.types';
import { ResizeService } from '../services/resize.service';
import { RESIZE_CONFIG } from '../resize.constants';
import { Subscription } from 'rxjs';


@Directive({
    selector: '[ifViewportSize]',
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
    @Input() ifViewportSize: TSizes;

    private subscription: Subscription = new Subscription();
    private embeddedViewRef: EmbeddedViewRef<any>;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private resizeService: ResizeService,
        @Inject(RESIZE_CONFIG) private config: IResizeConfig,
    ) {
    }

    public ngOnInit(): void {
        this.subscription.add(this.onResizeRender());
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private onResizeRender(): Subscription {
        return this.resizeService.viewportWidth$
            .subscribe((viewportWidth) => {
                if (this.isInViewport(viewportWidth)) {
                    if (!this.embeddedViewRef || this.embeddedViewRef.destroyed) {
                        this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
                    }
                } else {
                    if (this.embeddedViewRef && !this.embeddedViewRef.destroyed) {
                        this.viewContainerRef.clear();
                    }
                }
            });
    }

    private isInViewport(viewportWidth: number): boolean {
        switch (this.ifViewportSize) {
            case 'large':
                return viewportWidth >= this.config.large;
            case 'medium':
                return viewportWidth >= this.config.medium && viewportWidth < this.config.large;
            case 'small':
                return viewportWidth < this.config.medium;
            default:
                throw new Error('Invalid viewport size');
        }
    }
}
