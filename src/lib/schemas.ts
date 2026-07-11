import { z } from "zod";

export const contactSchema = z.object({
  name:      z.string().min(2, "Name must be at least 2 characters").max(80, "Name must be under 80 characters"),
  email:     z.string().email("Please enter a valid email address"),
  message:   z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be under 1000 characters"),
  honeypot:  z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string[]>>;
