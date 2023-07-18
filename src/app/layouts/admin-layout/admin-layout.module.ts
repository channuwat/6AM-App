import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent }       from '../../pages/dashboard/dashboard.component';
import { UserComponent }            from '../../pages/user/user.component';
import { TableComponent }           from '../../pages/table/table.component';
import { TypographyComponent }      from '../../pages/typography/typography.component';
import { IconsComponent }           from '../../pages/icons/icons.component';
import { MapsComponent }            from '../../pages/maps/maps.component';
import { NotificationsComponent }   from '../../pages/notifications/notifications.component';
import { UpgradeComponent }         from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FoodsComponent } from 'app/pages/foods/foods.component';
import { FoodConfigComponent } from 'app/pages/foods/food-config/food-config.component';
import { OptionsComponent } from 'app/pages/options/options.component';
import { OptionsConfigComponent } from 'app/pages/options/options-config/options-config.component';
import { OrdersComponent } from 'app/pages/orders/orders.component';
import { ConfigOrderComponent } from 'app/pages/orders/config-order/config-order.component';
import { PickOptionsComponent } from 'app/pages/foods/food-config/pick-options/pick-options.component';
import { SelectOptionsFoodComponent } from 'app/pages/orders/config-order/select-options-food/select-options-food.component';
import { IeConfigComponent } from 'app/pages/income-expenses/ie-config/ie-config.component';
import { IncomeExpensesComponent } from 'app/pages/income-expenses/income-expenses.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    OrdersComponent,
    FoodsComponent,
    FoodConfigComponent,
    OptionsComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    OptionsConfigComponent,
    ConfigOrderComponent,
    SelectOptionsFoodComponent,
    PickOptionsComponent,
    IeConfigComponent,
    IncomeExpensesComponent
  ],
  entryComponents:[
    OptionsConfigComponent
  ]
})

export class AdminLayoutModule {}
