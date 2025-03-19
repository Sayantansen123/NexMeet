import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Users, Plus, Search, Clock, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// Mock data for contacts and call history
const mockContacts = [
  { id: "1", name: "Sarah Johnson", status: "Available", lastSeen: "Just now" },
  { id: "2", name: "Michael Chen", status: "Busy", lastSeen: "10 min ago" },
  { id: "3", name: "Jessica Williams", status: "Away", lastSeen: "1 hour ago" },
  { id: "4", name: "David Rodriguez", status: "Available", lastSeen: "5 min ago" },
  { id: "5", name: "Emma Thompson", status: "In a call", lastSeen: "Just now" },
];

const mockHistory = [
  { id: "1", name: "Sarah Johnson", date: "Today, 10:23 AM", duration: "32 min", type: "Outgoing" },
  { id: "2", name: "Team Meeting", date: "Yesterday, 3:00 PM", duration: "45 min", type: "Group" },
  { id: "3", name: "Jessica Williams", date: "Yesterday, 11:45 AM", duration: "12 min", type: "Incoming" },
  { id: "4", name: "Michael Chen", date: "Jun 12, 2:30 PM", duration: "25 min", type: "Outgoing" },
];

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(mockContacts);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  
  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = mockContacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(mockContacts);
    }
  }, [searchQuery]);
  
  const handleStartCall = (contactId: string) => {
    const contact = mockContacts.find(c => c.id === contactId);
    if (contact) {
      toast({
        title: "Starting call",
        description: `Connecting to ${contact.name}...`,
      });
      navigate(`/call/${contactId}`);
    }
  };
  
  const handleNewMeeting = () => {
    toast({
      title: "Creating new meeting",
      description: "Your meeting room is being prepared...",
    });
    navigate("/meeting/new");
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      
      <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-medium">Welcome back, {user?.name}</h1>
            <p className="text-muted-foreground">Manage your calls and meetings</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <Card className="h-full glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Start or join video calls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full justify-start" 
                    variant="default"
                    onClick={handleNewMeeting}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    New Meeting
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                </CardContent>
                
                <Separator className="my-2" />
                
                <CardHeader>
                  <CardTitle>Meeting ID</CardTitle>
                  <CardDescription>Enter a code to join an existing meeting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Enter meeting code" 
                      className="bg-white/50"
                    />
                    <Button>Join</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Tabs defaultValue="contacts">
                <TabsList className="w-full grid grid-cols-2 mb-6">
                  <TabsTrigger value="contacts">
                    <Users className="mr-2 h-4 w-4" />
                    Contacts
                  </TabsTrigger>
                  <TabsTrigger value="history">
                    <Clock className="mr-2 h-4 w-4" />
                    Call History
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="contacts" className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search contacts..." 
                        className="pl-9 bg-white/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Card className="glass-card">
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {filteredContacts.map((contact) => (
                          <li key={contact.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                contact.status === "Available" ? "bg-green-500" : 
                                contact.status === "Busy" ? "bg-red-500" : "bg-amber-500"
                              }`} />
                              <div>
                                <p className="font-medium">{contact.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {contact.status} • {contact.lastSeen}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleStartCall(contact.id)}
                            >
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <Card className="glass-card">
                    <CardContent className="p-0">
                      <ul className="divide-y">
                        {mockHistory.map((call) => (
                          <li key={call.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                            <div>
                              <p className="font-medium">{call.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <span>
                                  {call.type === "Incoming" ? "← Incoming" : 
                                    call.type === "Outgoing" ? "→ Outgoing" : "⊛ Group"}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{call.date}</span>
                                <span className="mx-2">•</span>
                                <span>{call.duration}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <PhoneCall className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
