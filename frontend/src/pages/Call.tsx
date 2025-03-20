
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, Phone, MonitorX, MessageSquare, Users, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
<<<<<<< HEAD
import { Input } from "@/components/ui/input";
=======
>>>>>>> 15adf6996da3db6be41e2b86735854fe1dee8109

// Mock data for contacts
const mockContacts = [
  { id: "1", name: "Sarah Johnson", status: "Available", lastSeen: "Just now" },
  { id: "2", name: "Michael Chen", status: "Busy", lastSeen: "10 min ago" },
  { id: "3", name: "Jessica Williams", status: "Away", lastSeen: "1 hour ago" },
  { id: "4", name: "David Rodriguez", status: "Available", lastSeen: "5 min ago" },
  { id: "5", name: "Emma Thompson", status: "In a call", lastSeen: "Just now" },
];

const Call = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [contact, setContact] = useState<any>(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Find contact from mock data
  useEffect(() => {
    if (id) {
      const foundContact = mockContacts.find(c => c.id === id);
      if (foundContact) {
        setContact(foundContact);
      } else {
        toast({
          title: "Contact not found",
          description: "The requested contact could not be found.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    }
  }, [id, navigate, toast]);
  
  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format call duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleEndCall = () => {
    toast({
      title: "Call ended",
      description: `Call with ${contact?.name} ended.`,
    });
    navigate("/dashboard");
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Video turned off" : "Video turned on",
      description: isVideoOn ? "Your camera is now disabled" : "Your camera is now enabled",
    });
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Mic muted" : "Mic unmuted",
      description: isAudioOn ? "Your microphone is now muted" : "Your microphone is now unmuted",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Video Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center relative overflow-hidden"
      >
        {/* Remote User Video (Placeholder) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl font-medium">
                {contact?.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-2xl font-medium mb-2">{contact?.name}</h2>
            <p className="text-gray-400 mb-4">{formatDuration(callDuration)}</p>
            {!isVideoOn && (
              <p className="text-gray-400 text-sm">Your camera is turned off</p>
            )}
          </div>
        </div>
        
        {/* Self Video Preview */}
        {isVideoOn && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-24 right-8 w-48 aspect-video rounded-lg overflow-hidden border-2 border-white/20 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-white text-center text-sm">
                <span>Your camera</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Call Info Bar */}
        <div className="absolute top-0 left-0 right-0 bg-black/30 backdrop-blur-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white font-medium">{contact?.name}</span>
          </div>
          <div className="text-white">{formatDuration(callDuration)}</div>
        </div>
        
        {/* Call Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-6">
          <div className="max-w-md mx-auto flex items-center justify-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
              onClick={toggleAudio}
            >
              {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
              onClick={toggleVideo}
            >
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="destructive" 
              size="icon" 
              className="h-14 w-14 rounded-full"
              onClick={handleEndCall}
            >
              <Phone className="h-6 w-6 rotate-135" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48" align="end">
                <div className="grid gap-1">
                  <Button variant="ghost" className="flex justify-start" size="sm">
                    <MonitorX className="mr-2 h-4 w-4" />
                    <span>Share Screen</span>
                  </Button>
                  <Button variant="ghost" className="flex justify-start" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Add Participant</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="flex justify-start" 
                    size="sm"
                    onClick={() => setIsSettingsOpen(true)}
                  >
                    Settings
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </motion.div>
      
      {/* Chat Sidebar */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-md h-[80vh]">
          <DialogHeader>
            <DialogTitle>Chat</DialogTitle>
            <DialogDescription>
              Send messages during your call with {contact?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4 min-h-[40vh]">
              <p className="text-center text-sm text-muted-foreground">
                Chat messages will appear here
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 p-4 border-t">
            <Input className="flex-1" placeholder="Type a message..." />
            <Button>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Settings</DialogTitle>
            <DialogDescription>
              Adjust your call settings and preferences
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Video</h4>
              <Card className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Camera</span>
                  <Button 
                    variant={isVideoOn ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleVideo}
                  >
                    {isVideoOn ? "On" : "Off"}
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Audio</h4>
              <Card className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Microphone</span>
                  <Button 
                    variant={isAudioOn ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleAudio}
                  >
                    {isAudioOn ? "On" : "Off"}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Call;
