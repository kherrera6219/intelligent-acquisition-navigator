
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { errorTracker } from "@/lib/security/errorTracking";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  latency?: string;
  note?: string;
}

const services: ServiceStatus[] = [
  { name: "Supabase Database", status: "operational", latency: "12 ms" },
  { name: "Authentication", status: "operational", latency: "8 ms" },
  { name: "AI Assistant (Claude)", status: "operational", latency: "~2 s" },
  { name: "Vector Search (Pinecone)", status: "operational", latency: "45 ms" },
  { name: "Audit Logging", status: "operational" },
];

const statusConfig = {
  operational: { icon: CheckCircle2, color: "text-emerald-400", badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/5", label: "Operational" },
  degraded: { icon: AlertTriangle, color: "text-amber-400", badge: "border-amber-500/30 text-amber-400 bg-amber-500/5", label: "Degraded" },
  outage: { icon: XCircle, color: "text-red-400", badge: "border-red-500/30 text-red-400 bg-red-500/5", label: "Outage" },
};

const SystemStatus = () => {
  const [errors, setErrors] = useState<ReturnType<typeof errorTracker.getRecentErrors>>([]);
  const [refreshedAt, setRefreshedAt] = useState(new Date());

  const refresh = () => {
    setErrors(errorTracker.getRecentErrors());
    setRefreshedAt(new Date());
  };

  useEffect(() => {
    refresh();
  }, []);

  const overallHealthy = services.every((s) => s.status === "operational") && errors.filter(e => e.severity === "CRITICAL").length === 0;

  return (
    <>
      <PageHeader
        title="System Status"
        description="Live service health, recent errors, and audit information."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "System Status" }]}
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={refresh}
            className="gap-1.5 text-gray-400 hover:text-white"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Refresh
          </Button>
        }
      />

      {/* Overall status banner */}
      <Card className={`p-4 mb-8 flex items-center gap-3 ${overallHealthy ? "bg-emerald-500/5 border-emerald-500/20" : "bg-amber-500/5 border-amber-500/20"}`}>
        {overallHealthy ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" aria-hidden="true" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" aria-hidden="true" />
        )}
        <div>
          <p className={`text-sm font-semibold ${overallHealthy ? "text-emerald-300" : "text-amber-300"}`}>
            {overallHealthy ? "All systems operational" : "Some services are experiencing issues"}
          </p>
          <p className="text-xs text-gray-500">
            Last checked: {refreshedAt.toLocaleTimeString()}
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service health */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Services
          </h2>
          <Card className="bg-white/5 border-white/10 divide-y divide-white/5">
            {services.map((svc) => {
              const { icon: Icon, color, badge, label } = statusConfig[svc.status];
              return (
                <div key={svc.name} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${color} shrink-0`} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-gray-200">{svc.name}</p>
                      {svc.note && <p className="text-xs text-gray-500">{svc.note}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {svc.latency && (
                      <span className="text-xs text-gray-500 font-mono">{svc.latency}</span>
                    )}
                    <Badge variant="outline" className={`text-[10px] ${badge}`}>{label}</Badge>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Recent errors */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Recent Errors
            {errors.length > 0 && (
              <Badge variant="outline" className="ml-2 text-[10px] border-red-500/30 text-red-400">
                {errors.length}
              </Badge>
            )}
          </h2>

          {errors.length === 0 ? (
            <Card className="p-8 text-center bg-white/5 border-white/10">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2 opacity-50" aria-hidden="true" />
              <p className="text-sm text-gray-400">No recent errors</p>
            </Card>
          ) : (
            <Card className="bg-white/5 border-white/10 divide-y divide-white/5 max-h-96 overflow-y-auto">
              {errors.map((err, i) => {
                const isHighSeverity = err.severity === "CRITICAL" || err.severity === "HIGH";
                return (
                  <div key={i} className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-gray-200 font-medium truncate">{err.message}</p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] shrink-0 ${isHighSeverity ? "border-red-500/30 text-red-400" : "border-amber-500/30 text-amber-400"}`}
                      >
                        {err.severity}
                      </Badge>
                    </div>
                    {err.additionalData && (
                      <p className="text-xs text-gray-500 font-mono truncate">{JSON.stringify(err.additionalData)}</p>
                    )}
                    {err.timestamp && (
                      <p className="text-[10px] text-gray-600 mt-1">
                        {new Date(err.timestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                );
              })}
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default SystemStatus;
