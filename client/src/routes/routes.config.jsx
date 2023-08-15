import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login/login";

import AdminLayout from "../layouts/adminlayout/admin_layout";
import Admindashboard from "../pages/admin/dashboard/admindashboard";
import UserRegister from "../pages/admin/userregister/regform";

import User_Layout from "../layouts/userlayout/user_layout";

import Inv_Dashboard from "../pages/user/inventory_dept/dashboard/inv_dashboard";
import ShowInventory from "../pages/user/inventory_dept/inventory/inventory";
import ManageInventory from "../pages/user/inventory_dept/manage_inventory/manage_inventory";

import Sales_Dashboard from "../pages/user/sales_dept/dashboard/sales_dashboard";
import ShowSales from "../pages/user/sales_dept/show_sales/show_sales";
import ManageSales from "../pages/user/sales_dept/manage_sales/manage_sales";

import Prod_Dashboard from "../pages/user/production_dept/dashboard/prod_dashboard";
import ManageManuInventory from "../pages/user/production_dept/manage_manu_stock/manage_manu_stock";
import ShowManuInv from "../pages/user/production_dept/manufacutred_stock/show_manu_stock";
import ShowProdInv from "../pages/user/production_dept/show_prod_inventory/show_prod_inv";
import ManageProdInventory from "../pages/user/production_dept/manage_prod_inv/manage_prod_inv";

import Pur_Dashboard from "../pages/user/purchase_dept/dashboard/pur_dashboard";
import ShowPurchases from "../pages/user/purchase_dept/show_purchases/show_purchases";
import ManagePurchases from "../pages/user/purchase_dept/manage_purchases/manage_purchases";

import User_Account_Settings from "../pages/user/user_account/account_settings";
import StockOut from "../pages/user/stock_outs/stock_outs";
import StockRequests from "../pages/user/stock_requests/stock_requests"










const RouterConfig = () => {
    return(
        useRoutes(
            [
                {
                    path: '/',
                    index: true,
                    element: <Login/>
                },                
                
                {
                    element: <AdminLayout/>,
                    children: [
                        {
                            path : '/admin_dashboard',
                            element : <Admindashboard/>
                        },
                        {
                            path : '/user_register',
                            element : <UserRegister/>
                        },
                    ]
                },

                {
                    element: <User_Layout/>,
                    children: [
                        {
                            path : '/inv_dashboard',
                            element : <Inv_Dashboard/>
                        },
                        {
                            path : '/inv_showinv',
                            element : <ShowInventory/>
                        },
                        {
                            path : '/inv_manageinv',
                            element : <ManageInventory/>
                        },
                       
                        {
                            path : '/prod_dashboard',
                            element : <Prod_Dashboard/>
                        },
                        {
                            path : '/prod_showinv',
                            element : <ShowProdInv/>
                        },
                        {
                            path : '/prod_prodinv',
                            element : <ManageProdInventory/>
                        },
                        {
                            path : '/prod_managemanuinv',
                            element : <ManageManuInventory/>
                        },
                        {
                            path : '/prod_showmanuinv',
                            element : <ShowManuInv/>
                        },

                        {
                            path : '/sales_dashboard',
                            element : <Sales_Dashboard/>
                        },
                        {
                            path : '/sales_showsales',
                            element : <ShowSales/>
                        },
                        {
                            path : '/sales_managesales',
                            element : <ManageSales/>
                        },

                        {
                            path : '/pur_dashboard',
                            element : <Pur_Dashboard/>
                        },
                        {
                            path : '/pur_showpur',
                            element : <ShowPurchases/>
                        },
                        {
                            path : '/pur_managepur',
                            element : <ManagePurchases/>
                        },

                        {
                            path : '/acc_settings',
                            element : <User_Account_Settings/>
                        },    
                        
                        {
                            path : '/stock_outs',
                            element : <StockOut/>
                        },
                        {
                            path : '/stock_requests',
                            element : <StockRequests/>
                        },
                       
                    ]
                }
           
            ]
        )
    )
}

export default RouterConfig