import { Badge, Box, InputBase, styled, Toolbar } from '@mui/material'

export const StyledToolBar = styled(Toolbar)({
    diplay: "flex",
    justifyContent: "space-between",
    backgroundColor: 'white'
})

export const StyledBadge = styled(Badge)({
  cursor: 'pointer'
})

export const Search = styled('div')(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  border: '1px solid gray'
}))

export const Icons = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '20px',
  // If Screen is greater or equal to 650 display flex
  [theme.breakpoints.up('sm')]: {
    display: 'flex'
  }
}))

export const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  // IF Screen is smaller than 650px display none
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}))

export const StyleInputBase = styled(InputBase)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '12ch'
  }
}))


export const styleBox = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '&:focus': {
    outline: 'none',
  },
};