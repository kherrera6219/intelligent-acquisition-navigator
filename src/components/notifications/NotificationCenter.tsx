import { Bell, CheckCheck, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNotifications, AppNotification } from "@/hooks/useNotifications";
import { useNavigate } from "react-router-dom";

const typeColors: Record<AppNotification["type"], string> = {
  status_change: "bg-blue-500/20 text-blue-400",
  assignment: "bg-violet-500/20 text-violet-400",
  deadline: "bg-amber-500/20 text-amber-400",
  compliance_alert: "bg-red-500/20 text-red-400",
  ai_complete: "bg-emerald-500/20 text-emerald-400",
};

const typeLabels: Record<AppNotification["type"], string> = {
  status_change: "Status",
  assignment: "Assigned",
  deadline: "Deadline",
  compliance_alert: "Compliance",
  ai_complete: "AI",
};

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export const NotificationCenter = () => {
  const { notifications, unreadCount, markRead, markAllRead, clearAll } = useNotifications();
  const navigate = useNavigate();

  const handleClick = (n: AppNotification) => {
    markRead(n.id);
    if (n.resourceType && n.resourceId) {
      const routes: Record<string, string> = {
        proposal: "/proposals",
        solicitation: "/acquisition/solicitation-review",
        document: "/acquisition/document-control",
        compliance: "/compliance",
      };
      const route = routes[n.resourceType.toLowerCase()];
      if (route) navigate(route);
    }
  };

  return (
    <Popover>
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-7 w-7 text-gray-500 hover:text-gray-200 shrink-0"
              aria-label={`Notifications — ${unreadCount} unread`}
            >
              <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-violet-500 flex items-center justify-center text-[9px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Notifications</TooltipContent>
      </Tooltip>

      <PopoverContent
        side="right"
        align="end"
        sideOffset={8}
        className="w-80 p-0 bg-gray-900 border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-sm font-semibold text-white">Notifications</span>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-500 hover:text-gray-200"
                    onClick={markAllRead}
                    aria-label="Mark all as read"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">Mark all read</TooltipContent>
              </Tooltip>
            )}
            {notifications.length > 0 && (
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-500 hover:text-red-400"
                    onClick={clearAll}
                    aria-label="Clear all notifications"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">Clear all</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* List */}
        {notifications.length === 0 ? (
          <div className="py-10 text-center">
            <Bell className="h-8 w-8 mx-auto text-gray-700 mb-2" aria-hidden="true" />
            <p className="text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="max-h-80">
            <ul>
              {notifications.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => handleClick(n)}
                    className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors ${
                      !n.readAt ? "bg-white/[0.03]" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {/* Unread dot */}
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                          !n.readAt ? "bg-violet-500" : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${typeColors[n.type]}`}
                          >
                            {typeLabels[n.type]}
                          </span>
                          <span className="text-[10px] text-gray-600 ml-auto shrink-0">
                            {relativeTime(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-200 truncate">{n.title}</p>
                        <p className="text-[11px] text-gray-500 truncate">{n.body}</p>
                      </div>
                      {n.resourceId && (
                        <ExternalLink className="h-3 w-3 text-gray-600 shrink-0 mt-1" aria-hidden="true" />
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}

        {unreadCount > 0 && (
          <div className="px-4 py-2 border-t border-white/10">
            <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400">
              {unreadCount} unread
            </Badge>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
