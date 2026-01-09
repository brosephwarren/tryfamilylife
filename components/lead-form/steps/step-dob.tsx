"use client";

import * as React from "react";
import { useFormContext } from "../form-context";
import { StepWrapper, StepQuestion } from "../step-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { dateOfBirthSchema } from "@/lib/validations";

export function StepDob() {
    const { formData, updateField, nextStep } = useFormContext();
    const [inputValue, setInputValue] = React.useState(toDisplayDate(formData.date_of_birth));
    const [error, setError] = React.useState<string | null>(null);

    // Initial sync
    React.useEffect(() => {
        setInputValue(toDisplayDate(formData.date_of_birth));
    }, [formData.date_of_birth]);

    function toDisplayDate(isoString: string | undefined): string {
        if (!isoString) return "";
        // ISO is YYYY-MM-DD, we want MM/DD/YYYY
        const [y, m, d] = isoString.split("-");
        if (!y || !m || !d) return "";
        return `${m}/${d}/${y}`;
    }

    function toIsoDate(displayString: string): string {
        // Input MM/DD/YYYY -> YYYY-MM-DD
        const [m, d, y] = displayString.split("/");
        if (!y || !m || !d) return "";
        return `${y}-${m}-${d}`;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, ""); // Remove non-digits
        if (val.length > 8) val = val.slice(0, 8);

        // Auto-format MM/DD/YYYY
        let formatted = val;
        if (val.length >= 5) {
            formatted = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
        } else if (val.length >= 3) {
            formatted = `${val.slice(0, 2)}/${val.slice(2)}`;
        }

        setInputValue(formatted);
        setError(null);

        // Only update context if we have a full valid date
        if (val.length === 8) {
            const iso = toIsoDate(formatted);
            // Verify it's a valid date object
            const d = new Date(iso);
            if (!isNaN(d.getTime())) {
                updateField("date_of_birth", iso);
            }
        } else {
            // If incomplete, we can clear the strict context or leave it partial
            // But for validation schema, we need YYYY-MM-DD
            // Let's just not update context validly until full
        }
    };

    const handleNext = () => {
        // We need to construct the ISO string for validation
        const iso = toIsoDate(inputValue);

        // Basic length check first
        if (inputValue.length !== 10) {
            setError("Please enter a full date: MM/DD/YYYY");
            return;
        }

        const result = dateOfBirthSchema.safeParse(iso);
        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        // Success
        updateField("date_of_birth", iso);
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
                question="What is your date of birth?"
                subtext="Enter as MM/DD/YYYY"
            />
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                        id="dob"
                        type="tel"
                        inputMode="numeric"
                        placeholder="MM/DD/YYYY"
                        value={inputValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        maxLength={10}
                        error={!!error}
                        className="text-center text-lg tracking-widest"
                    />
                    {error && (
                        <p className="text-sm text-error">{error}</p>
                    )}
                </div>

                <Button
                    onClick={handleNext}
                    className="w-full"
                    size="lg"
                    disabled={inputValue.length < 10}
                >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </StepWrapper>
    );
}
