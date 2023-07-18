import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { FoodsComponent } from 'app/pages/foods/foods.component';
import { OptionsComponent } from 'app/pages/options/options.component';
import { OrdersComponent } from 'app/pages/orders/orders.component';
import { IncomeExpensesComponent } from 'app/pages/income-expenses/income-expenses.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'IE', component: IncomeExpensesComponent },
    { path: 'foods', component: FoodsComponent },
    { path: 'options', component: OptionsComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent }
];
