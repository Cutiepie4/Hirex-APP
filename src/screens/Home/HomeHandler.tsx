import React from 'react'
import { useSelector } from 'react-redux';
import { RootReducer } from '@/redux/store/reducer';
import Home from './HomeScreen';
import Home2 from './HomeScreen2';

export const HomeHandler = () => {
  const { role } = useSelector((state: RootReducer) => state.authReducer)

  return ( 
    <>
      {role.toLowerCase() == 'USER'.toLowerCase() ? <Home /> : <Home2 /> }
    </>
  )
}

export default HomeHandler