import React from 'react'
import styled from 'styled-components'
import { MapContainer, Marker, Popup, TileLayer, Polyline, Tooltip } from "react-leaflet";
import { Icon } from "leaflet";
import './App.css'
import * as data from './data.json'
import { Route } from './components/route'

export const icon = new Icon({
  iconUrl: "/skateboarding.svg",
  iconSize: [25, 25]
});

const App = () => {

  const [showRouteOptions, setShowRouteOptions] = React.useState(null)
  const [completedRoutes, setCompletedRoutes] = React.useState([])

  const handleCompletedRoutes = (stopId) => {
    setCompletedRoutes((prevState) => [...prevState, stopId])
  }

  const cordinates = []
  cordinates.push(data.stops.map(s => s.address))

  return (
    <MainAppContainer>
      <MapContainer center={[52.79797, 6.89503]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {
          data?.stops?.map((stop) => {
            return (
              <div key={stop.id}>
                <Marker 
                  key={stop.id}
                  position={[stop.address.lat, stop.address.lng]} 
                >
                  <Tooltip>{stop.information.name}</Tooltip>
                  </Marker>
                <Polyline
                  key={stop.id}
                  positions={cordinates}
                />
              </div>
            )
          })
        }

      </MapContainer>

      <StopsInfoContainer>
        <RouteText>Route 1</RouteText>
        <StopsOverview>
          <span>0/{data.stops.length} • </span>
          <span>{Math.floor(data.total_distance / 1000)} KM •</span>
          <span>{Math.floor(data.total_driving_time / 3600)} Hr</span>
        </StopsOverview> 

      </StopsInfoContainer>

      <RoutesContainer>
      {
        data.stops.map((stop) => {
          return (
              <Route 
                key={stop.id}
                onRouteSelect={(id) => setShowRouteOptions(id)} 
                stop={stop}
                selectedRoute={showRouteOptions === stop.id}
                onRouteFinish={(id) => handleCompletedRoutes(id)}
                completedRoute={completedRoutes.includes(stop.id)}
              />
            
          )
        })
      }
      </RoutesContainer>
      

    </MainAppContainer>
  );
}

export default App

const MainAppContainer = styled.div`
`

const StopsInfoContainer = styled.div`
  padding: 24px;
`

const RouteText = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const StopsOverview = styled.div`
  margin-top: 3px;
  display: flex;
  gap: 5px;
  color: #808080;
  span {
    font-size: 16.41px
  }
`

const RoutesContainer = styled.div`
  height: 490px;
  overflow-x: hidden;
  overflow-y: auto;
`