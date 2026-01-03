"use client";

import * as React from "react";
import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Phone } from "lucide-react";
import { phoneSchema } from "@/lib/validations";
import { formatPhoneNumber, stripPhoneFormatting } from "@/lib/utils";

export function StepPhone() {
    const { formData, updateField, nextStep } = useFormContext();
    const [error, setError] = React.useState<string | null>(null);
    const [displayValue, setDisplayValue] = React.useState("");

    // Initialize display value from form data
    React.useEffect(() => {
        if (formData.phone) {
            setDisplayValue(formatPhoneNumber(formData.phone));
        }
    }, [formData.phone]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhoneNumber(e.target.value);
        setDisplayValue(formatted);

        const stripped = stripPhoneFormatting(formatted);
        updateField("phone", stripped);
        setError(null);
    };

    const handleNext = () => {
        const result = phoneSchema.safeParse(formData.phone || "");
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }
        nextStep();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleNext();
        }
    };

    const isValid = formData.phone && formData.phone.length === 10;

    return (
        <StepWrapper>
            <StepQuestion
                question="What is the best phone number to reach you?"
                subtext="Your agent will call to discuss options"
            />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            id="phone"
                            type="tel"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={displayValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!error}
                            className="pl-12 text-center text-2xl tracking-wide h-14"
                        />
                    </div>
                    {error && (
                        <p className="text-sm text-error">{error}</p>
                    )}
                </div>

                <Button
                    onClick={handleNext}
                    className="w-full"
                    size="lg"
                    disabled={!isValid}
                >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </StepWrapper>
    );
}
