"use client";

import * as React from "react";
import type { LeadFormData, FormContextType } from "./types";
import { MORTGAGE_STEPS, LIFE_INSURANCE_STEPS } from "./types";
import { getUTMParams } from "@/lib/utils";
import type { LeadSource } from "@/lib/validations";

const FormContext = React.createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
    children: React.ReactNode;
    leadSource: LeadSource;
}

export function FormProvider({ children, leadSource }: FormProviderProps) {
    const [formData, setFormData] = React.useState<LeadFormData>({
        lead_source: leadSource,
    });
    const [currentStep, setCurrentStep] = React.useState(1);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isComplete, setIsComplete] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Get the appropriate steps based on lead source
    const steps = leadSource === "mortgage_protection" ? MORTGAGE_STEPS : LIFE_INSURANCE_STEPS;
    const totalSteps = steps.length;

    // Capture UTM params and page URL on mount
    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const utmParams = getUTMParams();
            setFormData((prev) => ({
                ...prev,
                page_url: window.location.href,
                ...utmParams,
            }));
        }
    }, []);

    // Update lead source when prop changes
    React.useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            lead_source: leadSource,
        }));
    }, [leadSource]);

    const updateField = React.useCallback(
        <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
            setError(null);
        },
        []
    );

    const nextStep = React.useCallback(() => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    }, [currentStep, totalSteps]);

    const prevStep = React.useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    }, [currentStep]);

    const goToStep = React.useCallback((step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
        }
    }, [totalSteps]);

    const submitForm = React.useCallback(async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to submit form");
            }

            setIsComplete(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [formData]);

    const resetForm = React.useCallback(() => {
        setFormData({
            lead_source: leadSource,
            page_url: typeof window !== "undefined" ? window.location.href : undefined,
            ...getUTMParams(),
        });
        setCurrentStep(1);
        setIsComplete(false);
        setError(null);
    }, [leadSource]);

    const value: FormContextType = {
        formData,
        currentStep,
        totalSteps,
        steps,
        leadSource,
        isSubmitting,
        isComplete,
        error,
        updateField,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        resetForm,
    };

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

export function useFormContext() {
    const context = React.useContext(FormContext);
    if (context === undefined) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
}
