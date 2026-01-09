import type { LeadFormData as ValidatedLeadFormData, LeadSource } from "@/lib/validations";

// Form state is partial because user fills it step by step
export type LeadFormData = Partial<ValidatedLeadFormData>;

export interface FormStep {
    id: number;
    name: string;
    component: string;
    autoAdvance: boolean;
}

// Mortgage Protection flow steps
export const MORTGAGE_STEPS: FormStep[] = [
    { id: 1, name: "Insurance", component: "StepInsurance", autoAdvance: true },
    { id: 2, name: "Gender", component: "StepGender", autoAdvance: true },
    { id: 3, name: "Coverage", component: "StepCoverage", autoAdvance: true },
    { id: 4, name: "Payment", component: "StepMortgagePayment", autoAdvance: true },
    { id: 5, name: "Birthday", component: "StepDob", autoAdvance: false },
    { id: 6, name: "Tobacco", component: "StepTobacco", autoAdvance: true },
    { id: 7, name: "Zip Code", component: "StepZipcode", autoAdvance: false },
    { id: 8, name: "Phone", component: "StepPhone", autoAdvance: false },
    { id: 9, name: "Name", component: "StepName", autoAdvance: false },
    { id: 10, name: "Email", component: "StepEmail", autoAdvance: false },
];

// Life Insurance flow steps (no mortgage questions)
export const LIFE_INSURANCE_STEPS: FormStep[] = [
    { id: 1, name: "Insurance", component: "StepInsurance", autoAdvance: true },
    { id: 2, name: "Gender", component: "StepGender", autoAdvance: true },
    { id: 3, name: "Beneficiary", component: "StepBeneficiary", autoAdvance: true },
    { id: 4, name: "Birthday", component: "StepDob", autoAdvance: false },
    { id: 5, name: "Employment", component: "StepEmployment", autoAdvance: true },
    { id: 6, name: "Income", component: "StepIncome", autoAdvance: true },
    { id: 7, name: "Protection", component: "StepProtectionLevel", autoAdvance: true },
    { id: 8, name: "Tobacco", component: "StepTobacco", autoAdvance: true },
    { id: 9, name: "Zip Code", component: "StepZipcode", autoAdvance: false },
    { id: 10, name: "Phone", component: "StepPhone", autoAdvance: false },
    { id: 11, name: "Name", component: "StepName", autoAdvance: false },
    { id: 12, name: "Email", component: "StepEmail", autoAdvance: false },
];

// Legacy export for backwards compatibility
export const FORM_STEPS = MORTGAGE_STEPS;
export const TOTAL_STEPS = MORTGAGE_STEPS.length;

export interface FormContextType {
    formData: LeadFormData;
    currentStep: number;
    totalSteps: number;
    steps: FormStep[];
    leadSource: LeadSource;
    isSubmitting: boolean;
    isComplete: boolean;
    error: string | null;
    updateField: <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => void;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    submitForm: () => Promise<void>;
    resetForm: () => void;
}
