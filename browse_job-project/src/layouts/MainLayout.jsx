import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar'
import { GooeyToaster } from 'goey-toast';
import './bones/registry'
import 'goey-toast/styles.css'

const MainLayout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
      <ToastContainer position="top-right" autoClose={3000} />
      <GooeyToaster position="top-right" />

    </>
  )
}

export default MainLayout