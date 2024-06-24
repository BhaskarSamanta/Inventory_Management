import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/HomePage.jsx'
import { AuthLayout, } from './components'

import  Signup from './pages/SignupAndLogin/SignupPage.jsx'
import Login from './pages/SignupAndLogin/LoginPage.jsx'

import DashboardPage from './pages/dashboard/DashBoardPage.jsx'

import AddCatagoriPage from './pages/catagory/AddCatagoriPage.jsx'
import CatagoriesPage from './pages/catagory/CatagoriesPage.jsx'

import OrderPage from './pages/order/OrderPage.jsx'
import AddOrderPage from './pages/order/AddOrderPage.jsx'

import OrderDetailsPage from './pages/orderDetails/OrderDetailsPage.jsx'
import AddOrderDetailsPage from './pages/orderDetails/AddOrderDetailsPage.jsx'

import AddItemsPage from './pages/products/AddItemsPage.jsx'
import EditItemsPage from './pages/products/EditItemsPage.jsx'
import ProductsPage from './pages/products/ProductsPage.jsx'

import AddSuppliers from './pages/suppliers/AddSuppliers.jsx'
import EditSuppliers from './pages/suppliers/EditSuppliers.jsx'
import SuppliersPage from './pages/suppliers/SuppliersPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children: [
      {
        path: '/',
        element: <Home /> 
      },
      {
        path: '/login',
        element: (<AuthLayout authentication={false}>

            <Login/>
          </AuthLayout>)
      },
      {
        path: '/signup',
        element: (<AuthLayout authentication={false}>
              <Signup/>
            </AuthLayout>)
      },
      {
        path: '/dashboard',
        element: (<AuthLayout authentication>
              {" "}
          <DashboardPage/>
        </AuthLayout>)
      },
      {
        path: '/Items',
        element: (<AuthLayout authentication>
              {" "}
          <ProductsPage/>
        </AuthLayout>)
      },
      {
        path: '/Items/edit/:id',
        element: (<AuthLayout authentication>
              {" "}
          <EditItemsPage/>
        </AuthLayout>)
      },
      {
        path: '/Items/add',
        element: (<AuthLayout authentication>
              {" "}
          <AddItemsPage/>
        </AuthLayout>)
      },
      {
        path: '/catagory',
        element: (<AuthLayout authentication>
              {" "}
          <CatagoriesPage/>
        </AuthLayout>)
      },
      {
        path: '/catagory/add',
        element: (<AuthLayout authentication>
              {" "}
          <AddCatagoriPage/>
        </AuthLayout>)
      },
      {
        path: '/order',
        element: (<AuthLayout authentication>
              {" "}
          <OrderPage/>
        </AuthLayout>)
      },
      {
        path: '/order/add',
        element: (<AuthLayout authentication>
              {" "}
          <AddOrderPage/>
        </AuthLayout>)
      },
      {
        path: '/orderDetails',
        element: (<AuthLayout authentication>
              {" "}
          <OrderDetailsPage/>
        </AuthLayout>)
      },
      {
        path: '/orderDetails/add',
        element: (<AuthLayout authentication>
              {" "}
          <AddOrderDetailsPage/>
        </AuthLayout>)
      },
      {
        path: '/suppliers',
        element: (<AuthLayout authentication>
              {" "}
          <SuppliersPage/>
        </AuthLayout>)
      },
      {
        path: '/suppliers/add',
        element: (<AuthLayout authentication>
              {" "}
          <AddSuppliers/>
        </AuthLayout>)
      },
      {
        path: '/suppliers/edit/:id',
        element: (<AuthLayout authentication>
              {" "}
          <EditSuppliers/>
        </AuthLayout>)
      },

    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
