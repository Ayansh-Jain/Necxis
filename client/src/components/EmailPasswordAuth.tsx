import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Clock } from "lucide-react";

export default function EmailPasswordAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const auth = getAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error("Auth error:", error);
      // @ts-ignore
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto p-2 rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">QuoteSync</CardTitle>
        <CardDescription>
          Get your daily dose of motivation based on the time of day.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-center text-sm text-muted-foreground mb-6">
          {isSignUp 
            ? "Create an account to see personalized time-based motivational quotes." 
            : "Sign in to see personalized time-based motivational quotes."}
        </p>
        
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleAuth}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              isSignUp ? "Sign Up" : "Sign In"
            )}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-xs"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Button>
      </CardFooter>
    </Card>
  );
}