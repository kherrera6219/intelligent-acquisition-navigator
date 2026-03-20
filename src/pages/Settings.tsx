
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Settings2,
  Bell,
  Shield,
  Palette,
  Database,
  Users,
  Save,
  AlertTriangle,
} from "lucide-react";
import { accessControl } from "@/lib/security/accessControl";

const Settings = () => {
  const { toast } = useToast();
  const canManageUsers = accessControl.hasPermission("MANAGE_USERS");

  const [notifications, setNotifications] = useState({
    email: true,
    solicitations: true,
    proposals: false,
    compliance: true,
    system: false,
  });

  const [security, setSecurity] = useState({
    sessionTimeout: "15",
    auditLogging: true,
    mfaRequired: false,
  });

  const [preferences, setPreferences] = useState({
    defaultRole: "CONTRACT_SPECIALIST",
    defaultAgency: "DFARS",
    theme: "dark",
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `${section} settings have been updated.`,
    });
  };

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure notifications, security, and personal preferences."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar nav */}
        <nav className="space-y-1" aria-label="Settings sections">
          {[
            { icon: Bell, label: "Notifications" },
            { icon: Shield, label: "Security" },
            { icon: Palette, label: "Preferences" },
            ...(canManageUsers ? [{ icon: Users, label: "User Management" }] : []),
            { icon: Database, label: "Data & Privacy" },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </nav>

        {/* Content */}
        <div className="lg:col-span-3 space-y-8">

          {/* Notifications */}
          <section id="notifications">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-4">
              <Bell className="h-4 w-4 text-violet-400" aria-hidden="true" />
              Notifications
            </h2>
            <Card className="p-5 bg-white/5 border-white/10 space-y-4">
              {[
                { key: "email", label: "Email notifications", desc: "Receive important updates via email" },
                { key: "solicitations", label: "New solicitations", desc: "Alerts when solicitations are added or updated" },
                { key: "proposals", label: "Proposal deadlines", desc: "Reminders 48h before proposal due dates" },
                { key: "compliance", label: "Compliance alerts", desc: "Notify when compliance issues are detected" },
                { key: "system", label: "System announcements", desc: "Maintenance windows and version updates" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-200">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <Switch
                    checked={notifications[key as keyof typeof notifications]}
                    onCheckedChange={(v) => setNotifications((n) => ({ ...n, [key]: v }))}
                    aria-label={label}
                  />
                </div>
              ))}
              <Separator className="bg-white/5" />
              <Button size="sm" onClick={() => handleSave("Notification")} className="gap-1.5">
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
                Save notifications
              </Button>
            </Card>
          </section>

          {/* Security */}
          <section id="security">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-4">
              <Shield className="h-4 w-4 text-violet-400" aria-hidden="true" />
              Security
            </h2>
            <Card className="p-5 bg-white/5 border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">Audit logging</p>
                  <p className="text-xs text-gray-500">Log all user actions (required for compliance)</p>
                </div>
                <Switch
                  checked={security.auditLogging}
                  onCheckedChange={(v) => setSecurity((s) => ({ ...s, auditLogging: v }))}
                  aria-label="Audit logging"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">Require MFA</p>
                  <p className="text-xs text-gray-500">Enforce multi-factor authentication for all users</p>
                </div>
                <Switch
                  checked={security.mfaRequired}
                  onCheckedChange={(v) => setSecurity((s) => ({ ...s, mfaRequired: v }))}
                  aria-label="Require MFA"
                />
              </div>
              <div>
                <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-200 mb-1.5">
                  Session timeout (minutes)
                </label>
                <Select value={security.sessionTimeout} onValueChange={(v) => setSecurity((s) => ({ ...s, sessionTimeout: v }))}>
                  <SelectTrigger id="session-timeout" className="w-40 bg-white/5 border-white/10 text-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["5", "10", "15", "30", "60"].map((t) => (
                      <SelectItem key={t} value={t}>{t} minutes</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-white/5" />
              <Button size="sm" onClick={() => handleSave("Security")} className="gap-1.5">
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
                Save security settings
              </Button>
            </Card>
          </section>

          {/* Preferences */}
          <section id="preferences">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-4">
              <Palette className="h-4 w-4 text-violet-400" aria-hidden="true" />
              Preferences
            </h2>
            <Card className="p-5 bg-white/5 border-white/10 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">
                  Default AI role
                </label>
                <Select value={preferences.defaultRole} onValueChange={(v) => setPreferences((p) => ({ ...p, defaultRole: v }))}>
                  <SelectTrigger className="w-64 bg-white/5 border-white/10 text-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONTRACT_SPECIALIST">Contract Specialist</SelectItem>
                    <SelectItem value="CONTRACTING_OFFICER">Contracting Officer</SelectItem>
                    <SelectItem value="PROGRAM_MANAGER">Program Manager</SelectItem>
                    <SelectItem value="LEGAL_REVIEWER">Legal Reviewer</SelectItem>
                    <SelectItem value="SMALL_BUSINESS_SPECIALIST">Small Business Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1.5">
                  Default agency regulation
                </label>
                <Select value={preferences.defaultAgency} onValueChange={(v) => setPreferences((p) => ({ ...p, defaultAgency: v }))}>
                  <SelectTrigger className="w-64 bg-white/5 border-white/10 text-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DFARS">DFARS</SelectItem>
                    <SelectItem value="FAR">FAR</SelectItem>
                    <SelectItem value="GSAM">GSAM</SelectItem>
                    <SelectItem value="HHSAR">HHSAR</SelectItem>
                    <SelectItem value="AGAR">AGAR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-white/5" />
              <Button size="sm" onClick={() => handleSave("Preferences")} className="gap-1.5">
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
                Save preferences
              </Button>
            </Card>
          </section>

          {/* User management (admin only) */}
          {canManageUsers && (
            <section id="user-management">
              <h2 className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-4">
                <Users className="h-4 w-4 text-violet-400" aria-hidden="true" />
                User Management
                <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-400">Admin</Badge>
              </h2>
              <Card className="p-5 bg-white/5 border-white/10">
                <p className="text-sm text-gray-400 mb-4">
                  Manage user accounts, roles, and access permissions.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                    View all users
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                    Invite user
                  </Button>
                </div>
              </Card>
            </section>
          )}

          {/* Data & Privacy */}
          <section id="data-&-privacy">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-200 mb-4">
              <Database className="h-4 w-4 text-violet-400" aria-hidden="true" />
              Data & Privacy
            </h2>
            <Card className="p-5 bg-red-500/5 border-red-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-gray-200 mb-1">Export / delete account data</p>
                  <p className="text-xs text-gray-400 mb-3">
                    Request a full export of your data or initiate account deletion. Deletion is irreversible and subject to your agency's records retention policy.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/10 text-gray-300 hover:text-white text-xs">
                      Export my data
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs">
                      Delete account
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

        </div>
      </div>
    </>
  );
};

export default Settings;
