import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Heart, Clock } from "lucide-react";
import quotesData from "@/data/quotes.json";

// Type definition for the quotes JSON structure
type QuotesData = {
  [hour: string]: {
    text: string;
    author: string;
  }
};

// Cast the imported data to our type
const quotes = quotesData as QuotesData;

interface TimeInfo {
  hour: number;
  formattedTime: string;
  timeOfDay: string;
}

interface Quote {
  text: string;
  author: string;
}

export function QuoteCard() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [timeInfo, setTimeInfo] = useState<TimeInfo>({
    hour: 0,
    formattedTime: "",
    timeOfDay: ""
  });
  const [previousQuotes, setPreviousQuotes] = useState<Array<{ quote: Quote, time: string }>>([]);

  // Load quote based on current hour
  useEffect(() => {
    const loadQuote = () => {
      try {
        const now = new Date();
        const hour = now.getHours();
        
        // Format the time string
        const formattedTime = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        
        // Set time of day label
        let timeOfDay = "Night";
        if (hour >= 5 && hour < 12) {
          timeOfDay = "Morning";
        } else if (hour >= 12 && hour < 17) {
          timeOfDay = "Afternoon";
        } else if (hour >= 17 && hour < 21) {
          timeOfDay = "Evening";
        }
        
        setTimeInfo({
          hour,
          formattedTime,
          timeOfDay
        });
        
        // Get current quote
        const hourKey = hour.toString();
        const quote = quotes[hourKey];
        setCurrentQuote(quote);
        
        // Generate previous quotes for history
        const prevHours = [];
        for (let i = 1; i <= 2; i++) {
          const prevHour = (hour - i + 24) % 24;
          const prevHourKey = prevHour.toString();
          prevHours.push({
            quote: quotes[prevHourKey],
            time: new Date(new Date().setHours(prevHour, 0, 0, 0)).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })
          });
        }
        setPreviousQuotes(prevHours);
      } catch (error) {
        console.error('Error loading quotes:', error);
      }
    };
    
    loadQuote();
    
    // Update quote every hour
    const interval = setInterval(loadQuote, 3600000);
    return () => clearInterval(interval);
  }, []);
  
  const handleShareQuote = () => {
    if (navigator.share && currentQuote) {
      navigator.share({
        title: 'QuoteSync - Daily Motivation',
        text: `"${currentQuote.text}" - ${currentQuote.author}`,
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

  if (!currentQuote) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="h-40 flex items-center justify-center">
            <p className="text-muted-foreground">Loading your quote...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Clock className="text-primary w-5 h-5" />
        <span className="text-sm font-medium">{timeInfo.formattedTime}</span>
      </div>
      
      <Card className="w-full overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Your {timeInfo.timeOfDay} Motivation</CardTitle>
          <CardDescription className="text-primary-foreground/80">Quote for this hour</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6 pb-8">
          <blockquote className="italic text-xl mb-4 font-serif">
            "{currentQuote.text}"
          </blockquote>
          <cite className="block text-right text-sm text-muted-foreground">
            — {currentQuote.author}
          </cite>
        </CardContent>
        
        <CardFooter className="bg-muted/30 py-3 justify-between items-center">
          <p className="text-sm text-muted-foreground flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            Updates hourly
          </p>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={handleShareQuote} title="Share quote">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSaveQuote} title="Save to favorites">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {previousQuotes.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-medium mb-4">Previous Quotes</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {previousQuotes.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <blockquote className="text-sm mb-2">
                    "{item.quote.text}"
                  </blockquote>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <cite>— {item.quote.author}</cite>
                    <span>{item.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}