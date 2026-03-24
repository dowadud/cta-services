"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactFormState } from "./actions";
import { CheckCircle2, Loader2 } from "lucide-react";

const INITIAL_STATE: ContactFormState = { success: false, message: "" };

const TYPE_LABELS: Record<string, string> = {
  contact: "General Inquiry",
  quote: "Request a Quote",
  rental: "Rental Inquiry",
  service: "Schedule Service",
  parts: "Parts Inquiry",
};

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, INITIAL_STATE);
  const searchParams = useSearchParams();
  const type = (searchParams.get("type") || "contact") as string;
  const product = searchParams.get("product") || "";

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Message Received</h3>
        <p className="text-muted-foreground max-w-md">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="type" value={type} />
      {product && <input type="hidden" name="product" value={product} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your full name" required />
          {state.errors?.name && <p className="text-xs text-destructive">{state.errors.name[0]}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" name="email" type="email" placeholder="your@email.com" required />
          {state.errors?.email && <p className="text-xs text-destructive">{state.errors.email[0]}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="704-000-0000" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            name="subject"
            defaultValue={product ? `Inquiry: ${product}` : TYPE_LABELS[type] || ""}
            required
          />
          {state.errors?.subject && <p className="text-xs text-destructive">{state.errors.subject[0]}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Describe the equipment, service, or inquiry…"
          required
        />
        {state.errors?.message && <p className="text-xs text-destructive">{state.errors.message[0]}</p>}
      </div>

      {state.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
