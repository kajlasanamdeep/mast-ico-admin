
import { useState } from "react";
import { 
  Bell, 
  BellRing, 
  BellOff, 
  Users, 
  AlertTriangle, 
  CheckCircle2,
  Ban,
  Clock 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

// Define notification types
type NotificationStatus = "read" | "unread";
type NotificationType = "system" | "investor" | "security" | "warning";
type NotificationPriority = "low" | "medium" | "high" | "critical";

// Notification data interface
interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: string;
  actionRequired?: boolean;
}

// Dummy notification data
const notificationsData: Notification[] = [
  {
    id: "not-001",
    title: "System Update Complete",
    message: "The platform has been updated to version 2.4.0. Check out the new features in your dashboard.",
    type: "system",
    priority: "medium",
    status: "unread",
    timestamp: "2025-04-30T08:30:00",
    actionRequired: false
  },
  {
    id: "not-002",
    title: "New Investor Registration",
    message: "Investor #1452 has completed registration and is awaiting KYC verification.",
    type: "investor",
    priority: "high",
    status: "unread",
    timestamp: "2025-04-29T16:45:00",
    actionRequired: true
  },
  {
    id: "not-003",
    title: "Security Alert",
    message: "Multiple failed login attempts detected for admin account. Please verify all recent access.",
    type: "security",
    priority: "critical",
    status: "unread",
    timestamp: "2025-04-29T14:20:00",
    actionRequired: true
  },
  {
    id: "not-004",
    title: "KYC Verification Pending",
    message: "5 investor KYC submissions are awaiting your review and approval.",
    type: "investor",
    priority: "medium",
    status: "read",
    timestamp: "2025-04-28T11:15:00",
    actionRequired: true
  },
  {
    id: "not-005",
    title: "Token Distribution Complete",
    message: "Monthly token distribution has been completed successfully. 5,000,000 MAST tokens distributed to 120 investors.",
    type: "system",
    priority: "medium",
    status: "read",
    timestamp: "2025-04-27T09:30:00",
    actionRequired: false
  },
  {
    id: "not-006",
    title: "Smart Contract Warning",
    message: "Gas prices are unusually high. Consider postponing non-essential transactions.",
    type: "warning",
    priority: "high",
    status: "read",
    timestamp: "2025-04-26T22:10:00",
    actionRequired: false
  },
  {
    id: "not-007",
    title: "Legal Document Updated",
    message: "Privacy Policy has been updated. Please review the changes and update your website.",
    type: "system",
    priority: "high",
    status: "read",
    timestamp: "2025-04-25T15:45:00",
    actionRequired: true
  },
  {
    id: "not-008",
    title: "Investor Request",
    message: "Premium investor #0572 has requested a call to discuss additional investment opportunity.",
    type: "investor",
    priority: "high",
    status: "read",
    timestamp: "2025-04-24T13:20:00",
    actionRequired: true
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Get notification icon based on type
const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "system":
      return <Bell className="h-5 w-5" />;
    case "investor":
      return <Users className="h-5 w-5" />;
    case "security":
      return <AlertTriangle className="h-5 w-5 text-destructive" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

// Get priority badge styling
const getPriorityBadge = (priority: NotificationPriority) => {
  switch (priority) {
    case "low":
      return "bg-secondary/20 text-secondary-foreground border-secondary/30";
    case "medium":
      return "bg-blue-500/20 text-blue-600 border-blue-500/30";
    case "high":
      return "bg-warning/20 text-warning border-warning/30";
    case "critical":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "";
  }
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

  const unreadCount = notifications.filter(n => n.status === "unread").length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;
  
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      status: "read" as NotificationStatus
    }));
    setNotifications(updatedNotifications);
    toast({
      title: "Success",
      description: "All notifications marked as read",
    });
  };
  
  const sendTestNotification = () => {
    toast({
      title: "Test Notification",
      description: "This is a test notification sent from the dashboard",
      variant: "default",
    });
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return notification.status === "unread";
    if (activeTab === "actionRequired") return notification.actionRequired;
    return notification.type === activeTab;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Notifications & Alerts</h1>
          <p className="text-muted-foreground">Configure system notifications and investor communications</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <BellOff className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button onClick={sendTestNotification}>
            <BellRing className="mr-2 h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="flex items-center text-lg">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">notifications requiring attention</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="ghost" size="sm" className="w-full">View All</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="flex items-center text-lg">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{actionRequiredCount}</div>
            <p className="text-sm text-muted-foreground">items need your response</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="ghost" size="sm" className="w-full">View All</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5 text-accent" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="ghost" size="sm" className="w-full">Configure</Button>
          </CardFooter>
        </Card>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Daily notification summary</AlertTitle>
        <AlertDescription>
          You have {unreadCount} unread notifications and {actionRequiredCount} items requiring your attention.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="investor">Investor</TabsTrigger>
          <TabsTrigger value="actionRequired">Action Required</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                {filteredNotifications.length} notifications
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id} className={notification.status === "unread" ? "bg-muted/30" : ""}>
                    <TableCell>
                      <div className="flex items-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{notification.message}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityBadge(notification.priority)}>
                        {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(notification.timestamp)}</TableCell>
                    <TableCell>
                      {notification.status === "unread" ? (
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                          Unread
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">
                          Read
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {notification.status === "unread" && (
                          <Button size="sm" variant="ghost">Mark Read</Button>
                        )}
                        {notification.actionRequired && (
                          <Button size="sm">Respond</Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default Notifications;
