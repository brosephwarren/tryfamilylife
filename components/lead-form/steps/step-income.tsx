"use client";

import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { SelectionButton } from "@/components/ui/radio-group";
import { householdIncomeLabels, type HouseholdIncome } from "@/lib/validations";

const options: { value: HouseholdIncome; label: string }[] = [
    { value: "under_4000", label: householdIncomeLabels.under_4000 },
    { value: "4000_6999", label: householdIncomeLabels["4000_6999"] },
    { value: "7000_9999", label: householdIncomeLabels["7000_9999"] },
    { value: "10000_plus", label: householdIncomeLabels["10000_plus"] },
];

export function StepIncome() {
    const { formData, updateField, nextStep } = useFormContext();

    const handleSelect = (value: HouseholdIncome) => {
        updateField("household_income", value);
        // Auto-advance after selection
        setTimeout(nextStep, 300);
    };

    return (
        <StepWrapper>
            <StepQuestion
                question="What is your approximate monthly household income?"
            />
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map((option) => (
                        <SelectionButton
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            selected={formData.household_income === option.value}
                            onClick={() => handleSelect(option.value)}
                            className="text-center justify-center"
                        />
                    ))}
                </div>
            </div>
        </StepWrapper>
    );
}
