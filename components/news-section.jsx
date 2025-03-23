"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  // Define topics with their API values and display names
  const topics = {
    "blockchain": "Blockchain",
    // "earnings": "Earnings",
    // "ipo": "IPO",
    // "mergers_and_acquisitions": "Mergers & Acquisitions",
    // "financial_markets": "Financial Markets",
    // "economy_fiscal": "Economy - Fiscal Policy",
    // "economy_monetary": "Economy - Monetary Policy",
    // "economy_macro": "Economy - Macro/Overall",
    // "energy_transportation": "Energy & Transportation",
    // "finance": "Finance"
  };

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // Try both possible environment variable names
        // const apiKey = process.env.ALPHAVANTAGE_API_KEY;
        const apiKey = "DQAC2VEDUG6GD2JK";
        
        if (!apiKey) {
          throw new Error("Alpha Vantage API key is missing. Please check your environment variables.");
        }
        
        // Join all topics for the API request - limit to fewer topics to avoid exceeding URL length limits
        // Alpha Vantage might have issues with too many topics at once
        const topicsParam = Object.keys(topics).slice(0, 5).join(",");
        
        console.log("Fetching news with topics:", topicsParam);
        
        const response = await fetch(
          `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${topicsParam}&apikey=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Alpha Vantage API Response structure:", Object.keys(data));
        
        // Check for API error messages (Alpha Vantage sends these as part of the JSON response)
        if (data.Note) {
          throw new Error(`Alpha Vantage API limit reached: ${data.Note}`);
        }
        
        if (data.Information) {
          throw new Error(`Alpha Vantage API information: ${data.Information}`);
        }
        
        // Alpha Vantage sometimes returns different structures - handle potential variations
        const feedData = data.feed || data.articles || data.items || [];
        
        if (Array.isArray(feedData) && feedData.length > 0) {
          // Filter and organize news by topic
          const newsByTopic = { all: [] };
          
          // Initialize each topic with an empty array
          Object.keys(topics).forEach(topic => {
            newsByTopic[topic] = [];
          });
          
          feedData.forEach((item, index) => {
            // Skip items without necessary data
            if (!item.title || !item.summary) return;
            
            // Some feeds use different property names - handle variations
            const itemTopics = item.topics || item.categories || [];
            const timePublished = item.time_published || item.published || item.datetime || new Date().toISOString();
            
            // Create formatted news item
            const formattedItem = {
              id: index + 1,
              title: item.title,
              description: item.summary || item.description || "",
              source: item.source || item.publisher || "News Source",
              time: formatRelativeTime(new Date(timePublished)),
              url: item.url || "#",
              topics: Array.isArray(itemTopics) ? itemTopics.map(t => t.topic || t) : [],
              indiaRelevance: isIndiaRelated(item) ? 10 : 0
            };
            
            // Add to general "all" category
            newsByTopic.all.push(formattedItem);
            
            // Add to specific topic categories
            if (Array.isArray(itemTopics)) {
              itemTopics.forEach(topicItem => {
                const topicValue = topicItem.topic || topicItem;
                if (newsByTopic[topicValue]) {
                  newsByTopic[topicValue].push(formattedItem);
                }
              });
            }
          });
          
          // Sort each category by India relevance (higher first) and then by time
          Object.keys(newsByTopic).forEach(topic => {
            newsByTopic[topic].sort((a, b) => {
              if (b.indiaRelevance !== a.indiaRelevance) {
                return b.indiaRelevance - a.indiaRelevance;
              }
              return new Date(b.time) - new Date(a.time);
            });
            
            // Limit to top 10 news items per category
            newsByTopic[topic] = newsByTopic[topic].slice(0, 10);
          });
          
          setNewsItems(newsByTopic);
        } else {
          // If feed array is empty but the request succeeded, show a custom message
          if (response.ok && (!feedData || feedData.length === 0)) {
            setError("No news articles found. The API returned an empty feed.");
          } else {
            throw new Error("Unexpected API response format. The news feed data is missing or not in the expected format.");
          }
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Modify isIndiaRelated to handle potential undefined properties
  function isIndiaRelated(item) {
    if (!item) return false;
    
    const indiaTerms = ['india', 'indian', 'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 
                        'kolkata', 'nse', 'bse', 'sensex', 'nifty', 'rbi', 'sebi'];
    
    // Check in title, summary, and source - handle potential undefined values
    const title = item.title || '';
    const summary = item.summary || item.description || '';
    const source = item.source || item.publisher || '';
    
    const textToCheck = (title + ' ' + summary + ' ' + source).toLowerCase();
    
    return indiaTerms.some(term => textToCheck.includes(term));
  }

  // Helper function to format relative time
  function formatRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  }

  if (isLoading) {
    return (
      <ScrollArea className="h-[400px]">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="border-l-4 border-l-primary">
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-3 w-1/3 mt-2" />
              </CardHeader>
              <CardContent className="pb-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (error) {
    return (
      <Card className="border-l-4 border-l-destructive">
        <CardHeader>
          <CardTitle>Error Loading News</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please check your API key and try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex flex-wrap h-auto">
          <TabsTrigger value="all">All Topics</TabsTrigger>
          {Object.entries(topics).map(([key, name]) => (
            <TabsTrigger key={key} value={key}>{name}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab}>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {newsItems[activeTab]?.length > 0 ? (
                newsItems[activeTab].map((item) => (
                  <Card key={item.id} className={`border-l-4 ${item.indiaRelevance > 0 ? 'border-l-primary' : 'border-l-slate-400'}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        {item.indiaRelevance > 0 && (
                          <Badge className="ml-2 bg-blue-500">India</Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <span>{item.source}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                        {item.topics.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-1">
                              {item.topics.map(topic => (
                                topics[topic] && (
                                  <Badge key={topic} variant="outline" className="text-[0.6rem] py-0">
                                    {topics[topic]}
                                  </Badge>
                                )
                              ))}
                            </div>
                          </>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                        Read more
                      </a>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-4">
                    <p className="text-center text-muted-foreground">No news available for this topic</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
