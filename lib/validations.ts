import { z } from "zod";

// Calculate age from date string
function calculateAge(dateString: string): number {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

// Individual field schemas
export const hasInsuranceSchema = z.enum(["yes", "no", "unsure"], {
    message: "Please select an option",
});

export const genderSchema = z.enum(["woman", "man"], {
    message: "Please select your gender",
});

export const coverageAmountSchema = z.enum([
    "under_100000",
    "100001_250000",
    "250001_500000",
    "500001_1000000",
    "more_than_1000000",
], {
    message: "Please select an amount",
});

export const mortgagePaymentSchema = z.enum([
    "under_1500",
    "1500_2499",
    "2500_3499",
    "3500_4999",
    "5000_plus",
], {
    message: "Please select a monthly payment",
});

// Life Insurance specific schemas
export const beneficiaryTypeSchema = z.enum([
    "husband_wife",
    "children",
    "parent_sibling",
    "business_partner",
    "other",
], {
    message: "Please select a beneficiary",
});

export const householdIncomeSchema = z.enum([
    "under_4000",
    "4000_6999",
    "7000_9999",
    "10000_plus",
], {
    message: "Please select your household income",
});

export const protectionLevelSchema = z.enum([
    "under_100000",
    "100001_250000",
    "250001_500000",
    "500001_1000000",
    "more_than_1000000",
], {
    message: "Please select a protection level",
});

export const socialSecuritySchema = z.enum(["yes", "no"], {
    message: "Please select an option",
});

export const employmentStatusSchema = z.enum([
    "employed_full_time",
    "employed_part_time",
    "self_employed",
    "retired",
    "not_employed",
], {
    message: "Please select your employment status",
});

export const dateOfBirthSchema = z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
        const parsed = new Date(date);
        return !isNaN(parsed.getTime());
    }, "Please enter a valid date")
    .refine((date) => {
        const age = calculateAge(date);
        return age >= 18;
    }, "You must be at least 18 years old")
    .refine((date) => {
        const age = calculateAge(date);
        return age <= 85;
    }, "Age must be 85 or under");

export const tobaccoUseSchema = z.enum(["yes", "no"], {
    message: "Please select an option",
});

export const zipCodeSchema = z.string()
    .min(5, "Zip code must be 5 digits")
    .max(5, "Zip code must be 5 digits")
    .regex(/^\d{5}$/, "Please enter a valid 5-digit zip code");

export const phoneSchema = z.string()
    .min(10, "Phone number must be 10 digits")
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number");

export const firstNameSchema = z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\-']+$/, "Name can only contain letters, spaces, hyphens, and apostrophes");

export const emailSchema = z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address");

// Lead source schema
export const leadSourceSchema = z.enum([
    "life_insurance",
    "mortgage_protection",
    "external",
]);

// Complete lead form schema
export const leadFormSchema = z.object({
    // Form fields
    has_insurance: hasInsuranceSchema,
    gender: genderSchema,
    coverage_amount: coverageAmountSchema.optional(), // Mortgage protection only
    mortgage_payment: mortgagePaymentSchema.optional(), // Mortgage protection only
    beneficiary_type: beneficiaryTypeSchema.optional(), // Life insurance only
    household_income: householdIncomeSchema.optional(), // Life insurance only
    protection_level: protectionLevelSchema.optional(), // Life insurance only
    social_security: socialSecuritySchema.optional(), // Life insurance only
    employment_status: employmentStatusSchema.optional(),
    date_of_birth: dateOfBirthSchema,
    tobacco_use: tobaccoUseSchema,
    zip_code: zipCodeSchema,
    phone: phoneSchema,
    first_name: firstNameSchema,
    email: emailSchema,

    // Auto-captured fields
    lead_source: leadSourceSchema,
    page_url: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
});

// Type inference
export type LeadFormData = z.infer<typeof leadFormSchema>;
export type HasInsurance = z.infer<typeof hasInsuranceSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type CoverageAmount = z.infer<typeof coverageAmountSchema>;
export type MortgagePayment = z.infer<typeof mortgagePaymentSchema>;
export type BeneficiaryType = z.infer<typeof beneficiaryTypeSchema>;
export type HouseholdIncome = z.infer<typeof householdIncomeSchema>;
export type ProtectionLevel = z.infer<typeof protectionLevelSchema>;
export type SocialSecurity = z.infer<typeof socialSecuritySchema>;
export type EmploymentStatus = z.infer<typeof employmentStatusSchema>;
export type TobaccoUse = z.infer<typeof tobaccoUseSchema>;
export type LeadSource = z.infer<typeof leadSourceSchema>;

// Coverage amount display labels (Now Mortgage Amount)
export const coverageAmountLabels: Record<CoverageAmount, string> = {
    under_100000: "Under $100,000",
    "100001_250000": "$100,001 - $250,000",
    "250001_500000": "$250,001 - $500,000",
    "500001_1000000": "$500,001 - $1,000,000",
    "more_than_1000000": "More Than $1,000,000",
};

// Mortgage Payment labels
export const mortgagePaymentLabels: Record<MortgagePayment, string> = {
    under_1500: "Under $1,500 / month",
    "1500_2499": "$1,500 - $2,499 / month",
    "2500_3499": "$2,500 - $3,499 / month",
    "3500_4999": "$3,500 - $4,999 / month",
    "5000_plus": "$5,000+ / month",
};

// Beneficiary type labels
export const beneficiaryTypeLabels: Record<BeneficiaryType, string> = {
    husband_wife: "Husband or Wife",
    children: "Child / Children",
    parent_sibling: "Parent / Sibling",
    business_partner: "Business Partner",
    other: "Other",
};

// Household income labels
export const householdIncomeLabels: Record<HouseholdIncome, string> = {
    under_4000: "Under $4,000 / month",
    "4000_6999": "$4,000 - $6,999 / month",
    "7000_9999": "$7,000 - $9,999 / month",
    "10000_plus": "$10,000+ / month",
};

// Protection level labels
export const protectionLevelLabels: Record<ProtectionLevel, string> = {
    under_100000: "Under $100,000",
    "100001_250000": "$100,001 - $250,000",
    "250001_500000": "$250,001 - $500,000",
    "500001_1000000": "$500,001 - $1,000,000",
    "more_than_1000000": "More Than $1,000,000",
};

// Employment status labels
export const employmentStatusLabels: Record<EmploymentStatus, string> = {
    employed_full_time: "Employed Full-Time",
    employed_part_time: "Employed Part-Time",
    self_employed: "Self-Employed",
    retired: "Retired",
    not_employed: "Not Currently Employed",
};

