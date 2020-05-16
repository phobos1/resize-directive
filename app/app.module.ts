import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ResizeModule } from './modules/resize/resize.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TestComponent } from './test.component';
import { RESIZE_CONFIG } from './app.constants';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,

        ResizeModule.forRoot(RESIZE_CONFIG)
    ],
    declarations: [
        AppComponent,
        HelloComponent,
        TestComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
