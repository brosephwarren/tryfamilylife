"use client";

import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { SelectionButton } from "@/components/ui/radio-group";
import { employmentStatusLabels, type EmploymentStatus } from "@/lib/validations";

const options: { value: EmploymentStatus; label: string }[] = [
    { value: "employed_full_time", label: employmentStatusLabels.employed_full_time },
    { value: "employed_part_time", label: employmentStatusLabels.employed_part_time },
    { value: "self_employed", label: employmentStatusLabels.self_employed },
    { value: "retired", label: employmentStatusLabels.retired },
    { value: "not_employed", label: employmentStatusLabels.not_employed },
];

export function StepEmployment() {
    const { formData, updateField, nextStep } = useFormContext();

    const handleSelect = (value: EmploymentStatus) => {
        updateField("employment_status", value);
        // Auto-advance after selection
        setTimeout(nextStep, 300);
    };

    return (
        <StepWrapper>
            <StepQuestion
                question="What is your current employment status?"
            />
            <div className="space-y-3">
                {options.map((option) => (
                    <SelectionButton
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        selected={formData.employment_status === option.value}
                        onClick={() => handleSelect(option.value)}
                    />
                ))}
            </div>
        </StepWrapper>
    );
}
