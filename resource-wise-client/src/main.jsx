import ReactDOM from 'react-dom/client'
import MainPage from './components/screens/MainPage.jsx'
import './index.css'

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from './state/store.js'
import RegisterPage from './components/screens/RegisterPage.jsx'
import LoginPage from './components/screens/LoginPage.jsx'
import HomePage from './components/screens/HomePage.jsx'

const router = createBrowserRouter(createRoutesFromElements(
	<Route>
		<Route path="/" element={<MainPage/>} index/>
		<Route path="/home" element={<HomePage />} />
		<Route path="/register" element={<RegisterPage/>}/>
		<Route path="/login" element={<LoginPage/>}/>
	</Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router}/>
	</Provider>
)
