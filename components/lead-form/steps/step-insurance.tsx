"use client";

import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { SelectionButton } from "@/components/ui/radio-group";

const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];

const lifeInsuranceOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "unsure", label: "Unsure" },
];

export function StepInsurance() {
    const { formData, updateField, nextStep, leadSource } = useFormContext();

    const handleSelect = (value: "yes" | "no" | "unsure") => {
        updateField("has_insurance", value);
        // Auto-advance after selection
        setTimeout(nextStep, 300);
    };

    const isMortgageFlow = leadSource === "mortgage_protection";
    const currentOptions = isMortgageFlow ? options : lifeInsuranceOptions;
    const question = isMortgageFlow
        ? "Do you currently have a mortgage?"
        : "Do you currently have life insurance?";

    return (
        <StepWrapper>
            <StepQuestion
                question={question}
            />
            <div className="space-y-3">
                {currentOptions.map((option) => (
                    <SelectionButton
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        selected={formData.has_insurance === option.value}
                        onClick={() => handleSelect(option.value as "yes" | "no" | "unsure")}
                    />
                ))}
            </div>
        </StepWrapper>
    );
}
