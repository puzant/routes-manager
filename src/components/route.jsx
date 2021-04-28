import React from 'react'
import styled from 'styled-components'
import { Block, BlockGroup } from './block'
import DirectionsIcon from '@material-ui/icons/Directions';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Divider from '@material-ui/core/Divider';

export const Route = ({ stop, onRouteSelect, selectedRoute, onRouteFinish, completedRoute }) => {
  return (
    <StopOverview selectedRoute={selectedRoute} onClick={() => onRouteSelect(stop.id)}>
      <Block align='center' gap={4}>
        <RouteNumber selectedRoute={selectedRoute} >{stop.sequence_number+1}</RouteNumber>
        <VerticalLine selectedRoute={selectedRoute} />
      </Block>

      <StopInformation>
      
      <RouteTimings>
        <Block gap={6}>
          <span>{stop.information.name}</span>
          <GrayText>{stop.information.city}, {stop.information.country}</GrayText>
        </Block>
        {!completedRoute ?
          <Block gap={6}>
            <span>{stop.arr_time_string}</span>
            <GrayText>{stop.time_window_earliest}, {stop.time_window_latest}</GrayText>
          </Block>
          :
          <Block>
            <StyledDoneIcon />
          </Block>
          }
      </RouteTimings>  
      {(!completedRoute && selectedRoute) && <Divider />}
      {(!completedRoute && selectedRoute) && <RouteOptions>
        <Block align='center'>
          <StyledDirectionIcon />
          <OptionsText>Directions</OptionsText>
        </Block>
        <Block align='center' onClick={() => onRouteFinish(stop.id)}>
          <StyledFinishIcon />
          <OptionsText>Finish</OptionsText>
        </Block>
      </RouteOptions>}

      </StopInformation>
      

    </StopOverview>
  )
}

const StopOverview = styled.div`
  display: flex;
  gap: 33px;
  padding: 37px;
  background: ${props => props.selectedRoute ? '#F6F9FE' : '#fff'};
`

const VerticalLine = styled.div`
  border-left: 2px solid #1329FE;
  height: ${props => props.selectedRoute ? '100px' : '34px'};
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
  gap: 6px;
  justify-content: space-between;
`

const GrayText = styled.div`
  color: #808080;
`

const RouteTimings = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const RouteOptions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const OptionsText = styled.div`
  color: #1329FE;
`

const StyledDirectionIcon = styled(DirectionsIcon)`
  color: #1329FE !important;
`

const StyledFinishIcon = styled(AssignmentTurnedInIcon)`
  color: #1329FE !important;
`

const StyledDoneIcon = styled(CheckCircleOutlineIcon)`
  color: #1329FE !important;
`
