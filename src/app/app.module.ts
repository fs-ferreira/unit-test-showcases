import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FillFormComponent } from './showcases/fill-form/fill-form.component';
import { FixtureDetectChangeComponent } from './showcases/fixture-detect-change/fixture-detect-change.component';
import { HandleEventComponent } from './showcases/handle-event/handle-event.component';
import { RequestComponent } from './showcases/request/request.component';
import { TestingComponentComponent } from './showcases/testing-component/testing-component.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsynchronousComponentComponent } from './showcases/asynchronous-component/asynchronous-component.component';
import { AutoDetectChangeComponent } from './showcases/auto-detect-change/auto-detect-change.component';
import { ConceptsTestsComponent } from './showcases/concepts-tests/concepts-tests.component';
import { DebuggerTestsComponent } from './showcases/debugger-tests/debugger-tests.component';
import { FixProblemsComponent } from './showcases/fix-problems/fix-problems.component';
import { HomeComponent } from './showcases/home/home.component';
import { InputOutputComponent } from './showcases/input-output/input-output.component';
import { MatchersJasmineComponent } from './showcases/matchers-jasmine/matchers-jasmine.component';
import { MockServiceComponent } from './showcases/mock-service/mock-service.component';
import { SpyonComponent } from './showcases/spyon/spyon.component';
import { StubServiceComponent } from './showcases/stub-service/stub-service.component';
import { StubComponent } from './showcases/stub/stub.component';

import { MatDialogModule } from '@angular/material/dialog';
import { HoverFocusDirective } from './hover-focus.directive';
import { HttpPipe } from './http.pipe';
import { DashboardComponent } from './showcases/dashboard/dashboard.component';
import { ExtratoComponent } from './showcases/extrato/extrato.component';
import { FormLoginComponent } from './showcases/form-login/form-login.component';
import { LoginComponent } from './showcases/login/login.component';
import { MenuDropdownComponent } from './showcases/menu-dropdown/menu-dropdown.component';
import { SpyOnPropertyComponent } from './showcases/spy-on-property/spy-on-property.component';
import { TestingDirectiveComponent } from './showcases/testing-directive/testing-directive.component';
import { TestingPipesDirectiveRouteComponent } from './showcases/testing-pipes-directive-route/testing-pipes-directive-route.component';
import { TestingRouteComponent } from './showcases/testing-route/testing-route.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    TestingComponentComponent,
    FixtureDetectChangeComponent,
    HandleEventComponent,
    FillFormComponent,
    InputOutputComponent,
    AutoDetectChangeComponent,
    ConceptsTestsComponent,
    DebuggerTestsComponent,
    AsynchronousComponentComponent,
    MatchersJasmineComponent,
    MockServiceComponent,
    StubServiceComponent,
    StubComponent,
    HomeComponent,
    SpyonComponent,
    FixProblemsComponent,
    HttpPipe,
    TestingPipesDirectiveRouteComponent,
    DashboardComponent,
    LoginComponent,
    TestingDirectiveComponent,
    HoverFocusDirective,
    FormLoginComponent,
    TestingRouteComponent,
    ExtratoComponent,
    MenuDropdownComponent,
    SpyOnPropertyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
