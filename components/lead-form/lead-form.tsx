"use client";

import * as React from "react";
import { useFormContext } from "./form-context";
import { ProgressBar } from "./progress-bar";
import { StepInsurance } from "./steps/step-insurance";
import { StepGender } from "./steps/step-gender";
import { StepCoverage } from "./steps/step-coverage";
import { StepMortgagePayment } from "./steps/step-mortgage-payment";
import { StepBeneficiary } from "./steps/step-beneficiary";
import { StepEmployment } from "./steps/step-employment";
import { StepIncome } from "./steps/step-income";
import { StepProtectionLevel } from "./steps/step-protection-level";
import { StepDob } from "./steps/step-dob";
import { StepTobacco } from "./steps/step-tobacco";
import { StepZipcode } from "./steps/step-zipcode";
import { StepPhone } from "./steps/step-phone";
import { StepName } from "./steps/step-name";
import { StepEmail } from "./steps/step-email";
import { StepConfirmation } from "./steps/step-confirmation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface LeadFormProps {
    onClose?: () => void;
}

// Component mapping for dynamic rendering
const stepComponents: Record<string, React.ComponentType> = {
    StepInsurance,
    StepGender,
    StepCoverage,
    StepMortgagePayment,
    StepBeneficiary,
    StepEmployment,
    StepIncome,
    StepProtectionLevel,
    StepDob,
    StepTobacco,
    StepZipcode,
    StepPhone,
    StepName,
    StepEmail,
};

export function LeadForm({ onClose }: LeadFormProps) {
    const { currentStep, prevStep, isComplete, steps } = useFormContext();

    const renderStep = () => {
        if (isComplete) {
            return <StepConfirmation onClose={onClose} />;
        }

        // Get the current step configuration
        const currentStepConfig = steps[currentStep - 1];
        if (!currentStepConfig) {
            return <StepInsurance />;
        }

        // Get the component for this step
        const StepComponent = stepComponents[currentStepConfig.component];
        if (!StepComponent) {
            return <StepInsurance />;
        }

        return <StepComponent />;
    };

    return (
        <div className="w-full">
            {/* Progress Bar */}
            <ProgressBar />

            {/* Back Button */}
            {currentStep > 1 && !isComplete && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevStep}
                    className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back
                </Button>
            )}

            {/* Current Step */}
            <div key={isComplete ? "complete" : currentStep} className="min-h-[300px]">
                {renderStep()}
            </div>
        </div>
    );
}
