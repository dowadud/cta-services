"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  type: z.enum(["contact", "quote", "service", "parts"]).default("contact"),
  product: z.string().optional(),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Server-side log (swap this block for Resend/SMTP in production)
  console.log("[CTA Contact Form]", {
    timestamp: new Date().toISOString(),
    ...parsed.data,
  });

  // Future: await sendEmail(parsed.data);

  return {
    success: true,
    message: "Thank you — we received your message and will respond shortly.",
  };
}
