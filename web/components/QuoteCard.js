import { Card, CardContent, Typography, Box } from '@mui/material';

function QuoteCard({ quote, time, isHighlighted = false }) {
  return (
    <Card 
      className="quote-card"
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        bgcolor: isHighlighted ? 'primary.main' : 'background.paper',
        color: isHighlighted ? 'white' : 'text.primary',
        boxShadow: isHighlighted ? 4 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      <CardContent sx={{ p: isHighlighted ? 4 : 3 }}>
        <Typography variant={isHighlighted ? "h5" : "body1"} component="div" gutterBottom>
          "{quote.text}"
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 1 
        }}>
          {time && (
            <Typography variant="caption" color={isHighlighted ? 'rgba(255,255,255,0.7)' : 'text.secondary'}>
              {time}
            </Typography>
          )}
          <Typography variant={isHighlighted ? "subtitle1" : "body2"} sx={{ 
            mt: isHighlighted ? 2 : 0, 
            textAlign: isHighlighted ? 'right' : 'left',
            fontStyle: 'italic'
          }}>
            — {quote.author}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default QuoteCard;