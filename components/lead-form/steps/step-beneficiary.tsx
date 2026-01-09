"use client";

import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { SelectionButton } from "@/components/ui/radio-group";
import { beneficiaryTypeLabels, type BeneficiaryType } from "@/lib/validations";

const options: { value: BeneficiaryType; label: string }[] = [
    { value: "husband_wife", label: beneficiaryTypeLabels.husband_wife },
    { value: "children", label: beneficiaryTypeLabels.children },
    { value: "parent_sibling", label: beneficiaryTypeLabels.parent_sibling },
    { value: "business_partner", label: beneficiaryTypeLabels.business_partner },
    { value: "other", label: beneficiaryTypeLabels.other },
];

export function StepBeneficiary() {
    const { formData, updateField, nextStep } = useFormContext();

    const handleSelect = (value: BeneficiaryType) => {
        updateField("beneficiary_type", value);
        // Auto-advance after selection
        setTimeout(nextStep, 300);
    };

    return (
        <StepWrapper>
            <StepQuestion
                question="Who will be the MAIN beneficiary of your policy?"
            />
            <div className="space-y-3">
                {options.map((option) => (
                    <SelectionButton
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        selected={formData.beneficiary_type === option.value}
                        onClick={() => handleSelect(option.value)}
                    />
                ))}
            </div>
        </StepWrapper>
    );
}
