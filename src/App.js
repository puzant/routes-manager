import React from 'react'
import styled from 'styled-components'
import { MapContainer, Marker, Popup, TileLayer, Polyline, Tooltip } from "react-leaflet"
import { Icon } from "leaflet"
import './App.css'
import * as data from './data.json'
import { Route } from './components/route'

export const icon = new Icon({
  iconUrl: "/skateboarding.svg",
  iconSize: [25, 25]
});

export const App = () => {

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

        {data?.stops.map((stop) => {
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
          <span>{completedRoutes.length}/{data.stops.length} stops • </span>
          <span>{Math.floor(data.total_distance / 1000)} KM •</span>
          <span>{Math.floor(data.total_driving_time / 3600)} Hr</span>
        </StopsOverview> 
      </StopsInfoContainer>

      <RoutesContainer>
      {data.stops.map((stop, index) => {
        return (
            <Route 
              key={stop.id}
              onRouteSelect={(id) => setShowRouteOptions(id)} 
              stop={stop}
              selectedRoute={showRouteOptions === stop.id}
              onRouteFinish={(id) => handleCompletedRoutes(id)}
              completedRoute={completedRoutes.includes(stop.id)}
              length={data.stops.length}
              index={index}
            />
          )
        })
      }
      </RoutesContainer>
      

    </MainAppContainer>
  );
}

const MainAppContainer = styled.div`
`

const StopsInfoContainer = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  box-shadow: inset 0px -1px 1px 1px rgb(127 124 124 / 20%);
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
  height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
`