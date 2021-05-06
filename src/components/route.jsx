import React from 'react'
import styled from 'styled-components'
import { Block } from './block'
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Divider from '@material-ui/core/Divider'

export const Route = (
    { stop, onRouteSelect, selectedRoute, onRouteFinish, completedRoute, length, index }
  ) => {
  return (
    <StopOverview selectedRoute={selectedRoute} onClick={() => onRouteSelect(stop.id)}>
  
      <RouteNumberCont>
        <RouteNumber selectedRoute={selectedRoute}>{stop.sequence_number+1}</RouteNumber>
        {index !== length -1 && <VerticalLine selectedRoute={selectedRoute} />}
      </RouteNumberCont>

      <StopInformation>
        <RouteTimings>
          <Block gap={6}>
            <RouteName>{stop.information.name}</RouteName>
            <GrayText>{stop.information.city}, {stop.information.country}</GrayText>
          </Block>
          {!completedRoute ?
            <Block gap={6} align='flex-end'>
              <span>{stop.arr_time_string}</span>
              <GrayText>{stop.time_window_earliest}{stop.time_window_earliest && '-'}{stop.time_window_latest}</GrayText>
            </Block>
            :
            <Block>
              <StyledDoneIcon />
            </Block>
            }
        </RouteTimings>  

        {(!completedRoute && selectedRoute) && <Divider />}

        {(!completedRoute && selectedRoute) && 
          (<RouteOptions>
            <Block align='center'>
              <StyledDirectionIcon />
              <OptionsText>Directions</OptionsText>
            </Block>
            <Block align='center' onClick={() => onRouteFinish(stop.id)}>
              <StyledFinishIcon />
              <OptionsText>Finish</OptionsText>
            </Block>
          </RouteOptions>)
        }

      </StopInformation>      

    </StopOverview>
  )
}

const StopOverview = styled.div`
  display: flex;
  gap: 39px;
  padding: 16px 25px 16px 37px;
  background: ${props => props.selectedRoute ? '#F6F9FE' : '#fff'};
`

const VerticalLine = styled.div`
  border-left: 2px solid #1329FE;
  position: absolute;
  top: ${props => props.selectedRoute ? '31px' : '25px'};
  height: ${props => props.selectedRoute ? '107px' : '45px'};
  opacity: ${props => !props.selectedRoute && '.3'};
`

const RouteNumber = styled.span`
  color: #1329FE;
  font-size: ${props => props.selectedRoute ? '24px' : '18px'};
  opacity: ${props => !props.selectedRoute && '.3'};
  font-weight: bold;
`

const StopInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
`

const GrayText = styled.div`
  color: #808080;
`

const RouteTimings = styled.div`
  display: flex;
  justify-content: space-between;
`

const RouteOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`

const OptionsText = styled.div`
  color: #1329FE;
`

const StyledDirectionIcon = styled(DirectionsOutlinedIcon)`
  color: #1329FE !important;
  &:hover {
    cursor: pointer;
  }
`

const StyledFinishIcon = styled(AssignmentTurnedInIcon)`
  color: #1329FE !important;
  &:hover {
    cursor: pointer;
  }
`

const StyledDoneIcon = styled(CheckCircleOutlineIcon)`
  color: #1329FE !important;
`

const RouteNumberCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const RouteName = styled.span`
  white-space: nowrap; 
  width: 200px; 
  overflow: hidden;
  text-overflow: ellipsis; 
`