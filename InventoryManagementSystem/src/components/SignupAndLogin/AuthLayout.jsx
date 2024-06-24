import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'


export default function AuthLayout({ children, authentication=true }) {

    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication ) {
            navigate('/InventoryManagementSystem/src/pages/SignupAndLogin/LoginPage.jsx')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authentication,navigate])

  return loader ? <h1>Loading...</h1> : children
}

