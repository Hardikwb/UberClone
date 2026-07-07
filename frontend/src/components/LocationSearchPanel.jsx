import React from 'react'
import VehicleModeRide from './VehicleModeRide'
import ConfirmedRide from './ConfirmedRide'
import ConnectingWithDriver from './ConnectingWithDriver'
import WaitingForDriver from './WaitingForDriver'

const LocationSearchPanel = () => {
  return (
    <div>
      <VehicleModeRide />
      <ConfirmedRide />
      <ConnectingWithDriver />
      <WaitingForDriver />
    </div>
  )
}

export default LocationSearchPanel