import { Resend } from "resend";
import LeadNotificationEmail from "@/emails/lead-notification";
import type { LeadFormData } from "@/lib/validations";

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export async function sendLeadNotification(data: LeadFormData) {
    const fromEmail = "Try Family Life <leads@resend.dev>";
    const toEmail = process.env.LEAD_NOTIFICATION_EMAIL || "brosephwarren@gmail.com";

    try {
        const { data: result, error } = await resend.emails.send({
            from: fromEmail,
            to: toEmail,
            subject: `🔥 New Lead: ${data.first_name} - ${data.coverage_amount} - ${data.lead_source}`,
            react: LeadNotificationEmail(data),
            replyTo: data.email,
        });

        if (error) {
            console.error("Resend error:", error);
            throw new Error(error.message);
        }

        return result;
    } catch (error) {
        console.error("Failed to send email:", error);
        // Don't throw here to allow form submission to succeed even if email fails
        // In production, you might want to log this to an error tracking service
        return null;
    }
}
