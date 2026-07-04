
import { useEffect, useRef, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Building, Shield, Mail, Settings, Download, Upload, RotateCcw } from "lucide-react";
import {
  supabase,
  exportLocalAppBackup,
  importLocalAppBackup,
  resetLocalAppData,
  type LocalAppBackup,
} from "@/integrations/supabase/client";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization must be at least 2 characters"),
  department: z.string().min(2, "Department must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { toast } = useToast();
  const importInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      organization: "",
      department: "",
      role: "",
    },
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const metadata = (data?.user?.user_metadata ?? {}) as Record<string, unknown>;
      reset({
        fullName: String(metadata.fullName ?? ""),
        email: data?.user?.email ?? "",
        organization: String(metadata.organization ?? ""),
        department: String(metadata.department ?? ""),
        role: String(metadata.role ?? ""),
      });
    });
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    const { error } = await supabase.auth.updateUser({
      data: {
        fullName: data.fullName,
        organization: data.organization,
        department: data.department,
        role: data.role,
      },
    });

    if (error) {
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    reset(data); // mark form as pristine again
  };

  const handleExportBackup = () => {
    const backup = exportLocalAppBackup();
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ian-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Backup exported",
      description: "Local application data backup has been downloaded.",
    });
  };

  const handleImportBackup = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const backup = JSON.parse(content) as LocalAppBackup;
      importLocalAppBackup(backup);
      toast({
        title: "Backup imported",
        description: "Local application data has been restored.",
      });
      window.location.reload();
    } catch {
      toast({
        title: "Import failed",
        description: "The selected file is not a valid backup.",
        variant: "destructive",
      });
    } finally {
      event.currentTarget.value = "";
    }
  };

  const handleResetData = () => {
    resetLocalAppData();
    toast({
      title: "Data reset complete",
      description: "Local data has been reset to seeded defaults.",
    });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-black/40 backdrop-blur-sm border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              User Profile
            </h2>
            <div className="flex gap-2">
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={handleImportBackup}
            />
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportBackup}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Export Backup
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => importInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Import Backup
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleResetData}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset Demo Data
            </Button>
            {isDirty && (
              <Button
                 variant="outline"
                 onClick={() => reset()}
                 className="flex items-center gap-2"
              >
                 <Settings className="h-4 w-4" aria-hidden="true" />
                 Discard Changes
              </Button>
            )}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      {...register("fullName")}
                      className="pl-10"
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      aria-invalid={!!errors.fullName}
                    />
                  </div>
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="profile-email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="profile-email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      className="pl-10"
                      aria-describedby={errors.email ? "profile-email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                  </div>
                  {errors.email && (
                    <p id="profile-email-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-400 mb-2">
                    Organization
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="organization"
                      type="text"
                      autoComplete="organization"
                      {...register("organization")}
                      className="pl-10"
                      aria-describedby={errors.organization ? "organization-error" : undefined}
                      aria-invalid={!!errors.organization}
                    />
                  </div>
                  {errors.organization && (
                    <p id="organization-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.organization.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-400 mb-2">
                    Department
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="department"
                      type="text"
                      {...register("department")}
                      className="pl-10"
                      aria-describedby={errors.department ? "department-error" : undefined}
                      aria-invalid={!!errors.department}
                    />
                  </div>
                  {errors.department && (
                    <p id="department-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-400 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <Input
                      id="role"
                      type="text"
                      {...register("role")}
                      className="pl-10"
                      aria-describedby={errors.role ? "role-error" : undefined}
                      aria-invalid={!!errors.role}
                    />
                  </div>
                  {errors.role && (
                    <p id="role-error" className="mt-1 text-sm text-red-400" role="alert">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="w-full mt-4 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
