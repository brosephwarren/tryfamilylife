"use client";

import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { SelectionButton } from "@/components/ui/radio-group";
import { protectionLevelLabels, type ProtectionLevel } from "@/lib/validations";

const options: { value: ProtectionLevel; label: string }[] = [
    { value: "under_100000", label: protectionLevelLabels.under_100000 },
    { value: "100001_250000", label: protectionLevelLabels["100001_250000"] },
    { value: "250001_500000", label: protectionLevelLabels["250001_500000"] },
    { value: "500001_1000000", label: protectionLevelLabels["500001_1000000"] },
    { value: "more_than_1000000", label: protectionLevelLabels.more_than_1000000 },
];

export function StepProtectionLevel() {
    const { formData, updateField, nextStep } = useFormContext();

    const handleSelect = (value: ProtectionLevel) => {
        updateField("protection_level", value);
        // Auto-advance after selection
        setTimeout(nextStep, 300);
    };

    return (
        <StepWrapper>
            <StepQuestion
                question="What level of protection are you looking for?"
            />
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.slice(0, 4).map((option) => (
                        <SelectionButton
                            key={option.value}
                            value={option.value}
                            label={option.label}
                            selected={formData.protection_level === option.value}
                            onClick={() => handleSelect(option.value)}
                            className="text-center justify-center"
                        />
                    ))}
                </div>
                {/* Last option full width */}
                {options.slice(4).map((option) => (
                    <SelectionButton
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        selected={formData.protection_level === option.value}
                        onClick={() => handleSelect(option.value)}
                        className="text-center justify-center w-full"
                    />
                ))}
            </div>
        </StepWrapper>
    );
}
