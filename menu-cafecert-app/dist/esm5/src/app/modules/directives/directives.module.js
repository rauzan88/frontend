import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DatatableDirective } from '../directives/datatable.directive';
import { NumberDirective } from './number.directive';
var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = tslib_1.__decorate([
        NgModule({
            declarations: [DatatableDirective, NumberDirective],
            imports: [
                CommonModule,
                BrowserModule,
            ], exports: [DatatableDirective, NumberDirective]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());
export { DirectivesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9tZW51LWNhZmVjZXJ0LWFwcC8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBU3JEO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFQNUIsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDO1lBQ25ELE9BQU8sRUFBRTtnQkFDUCxZQUFZO2dCQUNaLGFBQWE7YUFDZCxFQUFFLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQztTQUNsRCxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO1NBQXBCLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRGF0YXRhYmxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9kYXRhdGFibGUuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTnVtYmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9udW1iZXIuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbRGF0YXRhYmxlRGlyZWN0aXZlLCBOdW1iZXJEaXJlY3RpdmVdLFxyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIEJyb3dzZXJNb2R1bGUsXHJcbiAgXSwgZXhwb3J0czogW0RhdGF0YWJsZURpcmVjdGl2ZSwgTnVtYmVyRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlc01vZHVsZSB7IH1cclxuIl19