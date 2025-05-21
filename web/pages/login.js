import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Card,
  CardContent
} from '@mui/material';
import Google from '@mui/icons-material/Google';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    // Redirect to home if authenticated
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          QuoteSync
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Daily motivation at your fingertips
        </Typography>
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
            Sign In
          </Typography>

          {error && (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                bgcolor: 'error.light', 
                color: 'error.dark',
                borderRadius: 1
              }}
            >
              <Typography variant="body2">
                {error === 'OAuthSignin' && 'Error starting Google sign in'}
                {error === 'OAuthCallback' && 'Error completing Google sign in'}
                {error === 'OAuthCreateAccount' && 'Error creating OAuth account'}
                {error === 'EmailCreateAccount' && 'Error creating account'}
                {error === 'Callback' && 'Error during callback'}
                {error === 'AccessDenied' && 'You do not have access to this resource'}
                {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'AccessDenied'].includes(error) && 'An error occurred during sign in'}
              </Typography>
            </Paper>
          )}

          <Button
            variant="contained"
            size="large"
            startIcon={<Google />}
            onClick={() => signIn('google')}
            fullWidth
            sx={{ py: 1.5, borderRadius: 2 }}
          >
            Sign in with Google
          </Button>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          QuoteSync shows you a different motivational quote based on the time of day.
        </Typography>
      </Box>
    </Container>
  );
}