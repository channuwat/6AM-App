import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FoodConfigComponent } from "./pages/foods/food-config/food-config.component";

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from "./api.service";
import { PickOptionsComponent } from './pages/foods/food-config/pick-options/pick-options.component';
import { OptionsConfigComponent } from './pages/options/options-config/options-config.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PickOptionsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    NgbModule,
    HttpClientModule
  ],
  entryComponents:[
    FoodConfigComponent
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
