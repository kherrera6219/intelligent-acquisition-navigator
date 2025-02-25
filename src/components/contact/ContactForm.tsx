
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientButton } from "@/components/ui/universal/GradientButton";
import { cn } from "@/lib/utils";
import { useContactForm } from "./useContactForm";

export const ContactForm = () => {
  const { formData, errors, isSubmitting, handleSubmit, handleChange } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "bg-white/5 border-white/10 text-white",
              errors.name && "border-red-500 focus-visible:ring-red-500"
            )}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "bg-white/5 border-white/10 text-white",
              errors.email && "border-red-500 focus-visible:ring-red-500"
            )}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Subject
        </label>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={cn(
            "bg-white/5 border-white/10 text-white",
            errors.subject && "border-red-500 focus-visible:ring-red-500"
          )}
          required
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Message
        </label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={cn(
            "bg-white/5 border-white/10 text-white h-32",
            errors.message && "border-red-500 focus-visible:ring-red-500"
          )}
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>
      <GradientButton 
        type="submit" 
        className="w-full"
        gradientVariant="primary"
        loading={isSubmitting}
        disabled={isSubmitting || Object.keys(errors).length > 0}
      >
        Send Message
      </GradientButton>
    </form>
  );
};
