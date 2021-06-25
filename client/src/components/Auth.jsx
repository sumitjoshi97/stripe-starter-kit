import { Box, Typography, TextField, Button, Link } from '@material-ui/core'
import useAuth from '../hooks/useAuth'

function Auth() {
  const {
    authTypes,
    authType,
    authInput,
    handleAuthInput,
    setAuthTypeToLogin,
    setAuthTypeToSignup,
    handleUserAuth,
  } = useAuth()

  const renderLink = () => {
    if (authType === authTypes.LOGIN) {
      return <Link onClick={setAuthTypeToSignup}>New member? Signup here</Link>
    }
    return (
      <Link onClick={setAuthTypeToLogin}>Already a member? Login here </Link>
    )
  }

  const handleAuthSubmit = e => {
    e.preventDefault()
    handleUserAuth()
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minWidth={340}
      p={2}
      boxShadow={3}
      bgcolor="#fff"
      borderRadius={4}
    >
      <Typography variant="h4">{authType}</Typography>
      <form onSubmit={handleAuthSubmit} style={{ width: '100%' }}>
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <TextField
            label="enter name"
            variant="outlined"
            fullWidth
            size="small"
            name="name"
            value={authInput['name']}
            onChange={handleAuthInput}
            required
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="enter password"
            variant="outlined"
            fullWidth
            mb="10px"
            size="small"
            name="password"
            type="password"
            value={authInput['password']}
            onChange={handleAuthInput}
            required
            style={{ marginBottom: '10px' }}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            fullWidth
            p={2}
          >
            {authType}
          </Button>
        </Box>
      </form>
      <Typography variant="subtitle1">{renderLink()}</Typography>
    </Box>
  )
}

export default Auth
