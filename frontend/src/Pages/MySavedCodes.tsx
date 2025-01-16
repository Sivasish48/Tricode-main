import React from 'react'
import { useGetMyCodesQuery } from '../redux/slices/api'
function MySavedCodes() {

  const{data}=useGetMyCodesQuery()
  console.log(data)

  return (
    <div>MySavedCodes</div>
  )
}

export default MySavedCodes