import Box from '@material-ui/core/Box'
import Auth from '../components/Auth'

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      bgcolor="#eee"
    >
      <Auth />
    </Box>
  )
}

export default Home
