import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
var BodyModule = /** @class */ (function () {
    function BodyModule() {
    }
    BodyModule = tslib_1.__decorate([
        NgModule({
            declarations: [BodyComponent, MenuComponent, FooterComponent],
            imports: [
                CommonModule,
                BrowserModule,
            ], exports: [BodyComponent, MenuComponent, FooterComponent]
        })
    ], BodyModule);
    return BodyModule;
}());
export { BodyModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9keS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9ib2R5L2JvZHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsOEVBQThFO0FBVzlFO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFQdEIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxlQUFlLENBQUM7WUFDM0QsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osYUFBYTthQUNkLEVBQUUsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUU7U0FDN0QsQ0FBQztPQUNXLFVBQVUsQ0FBSTtJQUFELGlCQUFDO0NBQUEsQUFBM0IsSUFBMkI7U0FBZCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBCb2R5Q29tcG9uZW50IH0gZnJvbSAnLi9ib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb290ZXJDb21wb25lbnQgfSBmcm9tICcuLi9mb290ZXIvZm9vdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZW51Q29tcG9uZW50IH0gZnJvbSAnLi4vbWVudS9tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG4vLyBpbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0JvZHlDb21wb25lbnQsTWVudUNvbXBvbmVudCxGb290ZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gIF0sIGV4cG9ydHM6IFtCb2R5Q29tcG9uZW50LCBNZW51Q29tcG9uZW50LCBGb290ZXJDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBCb2R5TW9kdWxlIHsgfVxuIl19