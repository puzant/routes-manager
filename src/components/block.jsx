import styled, { css } from 'styled-components'

export const Block = styled.div`
  display: flex;
  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  justify-content: ${({ justify }) => (justify ? justify : 'initial')};
  align-items: ${({ align }) => (align ? align : 'initial')};
  gap: ${({ gap }) => (gap ? gap : 0)}px;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)}px;
  ${({ zeroMinWidth }) =>
    zeroMinWidth &&
    css`
      min-width: 0;
    `};
  ${({ zeroMinHeight }) =>
    zeroMinHeight &&
    css`
      min-height: 0;
    `};
  ${({ wrap }) =>
    wrap &&
    css`
      flex-wrap: wrap;
    `}
  ${({ spreadX }) =>
    spreadX &&
    css`
      width: 100%;
    `}
  ${({ spreadY }) =>
    spreadY &&
    css`
      height: 100%;
    `}
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: marginTop;
    `};
  
  @media (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`

export const BlockGroup = styled(Block)``