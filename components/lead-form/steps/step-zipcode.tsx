"use client";

import * as React from "react";
import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, MapPin } from "lucide-react";
import { zipCodeSchema } from "@/lib/validations";

export function StepZipcode() {
    const { formData, updateField, nextStep } = useFormContext();
    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits, max 5
        const value = e.target.value.replace(/\D/g, "").slice(0, 5);
        updateField("zip_code", value);
        setError(null);
    };

    const handleNext = () => {
        const result = zipCodeSchema.safeParse(formData.zip_code || "");
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

    return (
        <StepWrapper>
            <StepQuestion
                question="What is your zip code?"
                subtext="So we can find agents and rates in your area"
            />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="zipcode">Zip Code</Label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            id="zipcode"
                            type="tel"
                            inputMode="numeric"
                            placeholder="Enter 5-digit zip"
                            value={formData.zip_code || ""}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            error={!!error}
                            className="pl-12 text-center text-2xl tracking-[0.2em] h-14"
                            maxLength={5}
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
                    disabled={!formData.zip_code || formData.zip_code.length < 5}
                >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </StepWrapper>
    );
}
