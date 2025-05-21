import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Typography, 
  Avatar, 
  Box, 
  Container, 
  Grid, 
  IconButton, 
  Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import ScheduleIcon from '@mui/icons-material/Schedule';
import UpdateIcon from '@mui/icons-material/Update';
import { styled } from '@mui/material/styles';

// Custom styled components
const QuoteCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Lora', serif",
  marginBottom: theme.spacing(2),
}));

const QuoteAuthor = styled(Typography)(({ theme }) => ({
  textAlign: 'right',
  color: theme.palette.text.secondary,
}));

const CardActions = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[50],
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TimeChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
  },
}));

export default function Home() {
  const { data: session } = useSession();
  const [currentQuote, setCurrentQuote] = useState(null);
  const [previousQuotes, setPreviousQuotes] = useState([]);
  const [currentHour, setCurrentHour] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');

  // Load quotes based on current hour
  useEffect(() => {
    async function loadQuote() {
      try {
        const quotes = await import('../data/quotes.json');
        const now = new Date();
        const hour = now.getHours();
        
        // Format the time string
        const formattedHour = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        setCurrentHour(formattedHour);
        
        // Set time of day label
        if (hour >= 5 && hour < 12) {
          setTimeOfDay('Morning');
        } else if (hour >= 12 && hour < 17) {
          setTimeOfDay('Afternoon');
        } else if (hour >= 17 && hour < 21) {
          setTimeOfDay('Evening');
        } else {
          setTimeOfDay('Night');
        }
        
        // Get current quote
        const quote = quotes.default[hour.toString()];
        setCurrentQuote(quote);
        
        // Simulate previous quotes (for demo purposes)
        const prevHours = [];
        for (let i = 1; i <= 2; i++) {
          const prevHour = (hour - i + 24) % 24;
          prevHours.push({
            text: quotes.default[prevHour.toString()],
            time: new Date(now.setHours(prevHour, 0, 0, 0)).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          });
          // Reset date object
          now.setHours(hour);
        }
        setPreviousQuotes(prevHours);
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    }
    
    if (session) {
      loadQuote();
      
      // Update quote every hour
      const interval = setInterval(loadQuote, 3600000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const handleShareQuote = () => {
    if (navigator.share && currentQuote) {
      navigator.share({
        title: 'QuoteSync - Daily Motivation',
        text: `"${currentQuote}"`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Sharing is not supported on this browser');
    }
  };

  const handleSaveQuote = () => {
    // This would typically save to a database
    alert('Quote saved to favorites!');
  };

  if (!session) {
    return (
      <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: 'md', 
            bgcolor: 'background.paper', 
            borderRadius: 4, 
            boxShadow: 3, 
            p: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: 3 
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
            <AccessTimeIcon sx={{ fontSize: 36 }} />
          </Avatar>
          
          <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 500 }}>
            QuoteSync
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center">
            Get your daily dose of motivation based on the time of day.
          </Typography>
          
          <Button 
            variant="outlined" 
            onClick={() => signIn('google')}
            startIcon={
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            }
            sx={{ 
              mt: 3, 
              width: '100%', 
              py: 1.5, 
              borderColor: 'grey.300',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.50'
              }
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      {/* Header with user info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500 }}>
          QuoteSync
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={session.user?.image} alt={session.user?.name} sx={{ mr: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {session.user?.name}
            </Typography>
          </Box>
          
          <Button 
            color="inherit" 
            onClick={() => signOut()}
            startIcon={<LogoutIcon />}
            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
          >
            Sign out
          </Button>
        </Box>
      </Box>

      {/* Current time indicator */}
      <Box sx={{ mb: 4 }}>
        <TimeChip 
          icon={<ScheduleIcon />} 
          label={currentHour} 
          variant="outlined"
        />
      </Box>

      {/* Quote Card */}
      {currentQuote && (
        <Card sx={{ borderRadius: 4, overflow: 'hidden', transition: 'all 0.3s', '&:hover': { boxShadow: 6 } }}>
          <QuoteCardHeader 
            title={`Your ${timeOfDay} Motivation`}
            subheader="Quote for this hour"
            subheaderTypographyProps={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.875rem' }}
          />
          
          <CardContent sx={{ p: 4 }}>
            <QuoteText variant="h5" component="blockquote">
              "{currentQuote.text}"
            </QuoteText>
            <QuoteAuthor variant="body2" component="cite">
              — {currentQuote.author}
            </QuoteAuthor>
          </CardContent>
          
          <CardActions>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              <UpdateIcon fontSize="small" sx={{ mr: 0.5 }} />
              Updates hourly
            </Typography>
            
            <Box>
              <IconButton 
                color="primary" 
                aria-label="Share quote"
                onClick={handleShareQuote}
              >
                <ShareIcon />
              </IconButton>
              <IconButton 
                color="primary" 
                aria-label="Save quote"
                onClick={handleSaveQuote}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      )}

      {/* Quote history section */}
      {previousQuotes.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
            Previous Quotes
          </Typography>
          
          <Grid container spacing={3}>
            {previousQuotes.map((quote, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <QuoteText variant="body1" component="blockquote">
                      "{quote.text.text}"
                    </QuoteText>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" component="cite" color="text.secondary">
                        — {quote.text.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {quote.time}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
