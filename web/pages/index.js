import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  CircularProgress,
  Avatar
} from '@mui/material';
import QuoteCard from '../components/QuoteCard';
import quotes from '../data/quotes.json';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentQuote, setCurrentQuote] = useState(null);
  const [previousQuotes, setPreviousQuotes] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    // Check if a token was passed from the mobile WebView
    if (typeof window !== 'undefined' && window.FIREBASE_FCM_TOKEN) {
      console.log('FCM Token received from mobile app:', window.FIREBASE_FCM_TOKEN);
      setFcmToken(window.FIREBASE_FCM_TOKEN);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Function to get the current quote based on hour
  async function loadQuote() {
    const date = new Date();
    const hour = date.getHours();
    const formattedTime = date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Set time of day message
    let timeMsg = '';
    if (hour >= 5 && hour < 12) {
      timeMsg = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      timeMsg = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      timeMsg = 'Good Evening';
    } else {
      timeMsg = 'Good Night';
    }

    setCurrentTime(formattedTime);
    setTimeOfDay(timeMsg);

    // Get quote for current hour
    const quote = quotes[hour % 24];
    
    // Check if we're getting a new quote
    if (currentQuote && quote.text !== currentQuote.text) {
      setPreviousQuotes(prev => {
        // Only keep the most recent 5 quotes
        const updated = [
          { quote: currentQuote, time: currentTime },
          ...prev
        ].slice(0, 5);
        return updated;
      });
    }
    
    setCurrentQuote(quote);
  }

  useEffect(() => {
    // Load the initial quote
    loadQuote();
    
    // Set up interval to update the quote every minute
    const interval = setInterval(() => {
      loadQuote();
    }, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // Show loading state while session is loading
  if (status === 'loading' || !currentQuote) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {session && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={session.user.image} 
              alt={session.user.name} 
              sx={{ mr: 2 }}
            />
            <Typography variant="subtitle1">
              {session.user.name}
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {timeOfDay}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Current time: {currentTime}
        </Typography>
        
        {currentQuote && (
          <QuoteCard 
            quote={currentQuote} 
            isHighlighted={true} 
          />
        )}
        
        {fcmToken && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            Connected to mobile app for notifications
          </Typography>
        )}
      </Paper>

      {previousQuotes.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Previous Quotes
          </Typography>
          {previousQuotes.map((item, index) => (
            <QuoteCard 
              key={index} 
              quote={item.quote} 
              time={item.time} 
            />
          ))}
        </Box>
      )}
    </Container>
  );
}