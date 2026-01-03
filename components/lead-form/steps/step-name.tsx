"use client";

import * as React from "react";
import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, User } from "lucide-react";
import { firstNameSchema } from "@/lib/validations";

export function StepName() {
    const { formData, updateField, nextStep } = useFormContext();
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateField("first_name", e.target.value);
        setError(null);
    };

    const handleNext = () => {
        const result = firstNameSchema.safeParse(formData.first_name || "");
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

    const isValid = formData.first_name && formData.first_name.length >= 2;

    return (
        <StepWrapper>
            <StepQuestion
                question="What is your first name?"
                subtext="So your agent knows who they're speaking with"
            />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.first_name || ""}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!error}
                            className="pl-12 text-xl h-14"
                            autoComplete="given-name"
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
