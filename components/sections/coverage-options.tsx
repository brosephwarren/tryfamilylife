"use client";

import { Button } from "@/components/ui/button";
import { Shield, Home, Heart, CheckCircle, ArrowRight } from "lucide-react";

interface CoverageOptionsProps {
    onLifeInsurance?: () => void;
    onMortgageProtection?: () => void;
}

export function CoverageOptions({ onLifeInsurance, onMortgageProtection }: CoverageOptionsProps) {
    const lifeInsuranceBenefits = [
        "Protect your family's financial future",
        "Living benefits included at no extra cost",
        "Coverage amounts from $25K to $1M+",
        "No medical exam options available",
        "Lock in rates that never increase",
    ];

    const mortgageProtectionBenefits = [
        "Keep your home in the family",
        "Coverage matches your mortgage balance",
        "Benefits paid directly to your family",
        "Living benefits for critical illness",
        "Affordable monthly premiums",
    ];

    return (
        <section id="coverage" className="py-20 lg:py-28 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                        Choose the Protection That{" "}
                        <span className="text-primary">Fits Your Life</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Whether you&apos;re protecting your family&apos;s future or ensuring your mortgage
                        is covered, we have the right solution for you.
                    </p>
                </div>

                {/* Coverage Cards */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Life Insurance Card */}
                    <div className="bg-card rounded-3xl shadow-xl overflow-hidden card-hover">
                        {/* Card Header */}
                        <div className="bg-card p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground">Life Insurance</h3>
                                    <p className="text-muted-foreground text-sm">Family Protection</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                Comprehensive coverage that protects your loved ones and provides
                                living benefits when you need them most.
                            </p>
                        </div>

                        {/* Card Body */}
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                {lifeInsuranceBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={onLifeInsurance}
                                className="w-full group"
                                size="lg"
                            >
                                Get Life Insurance Quote
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Mortgage Protection Card */}
                    <div className="bg-card rounded-3xl shadow-xl overflow-hidden card-hover">
                        {/* Card Header */}
                        <div className="bg-card p-8">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                                    <Home className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-foreground">Mortgage Protection</h3>
                                    <p className="text-muted-foreground text-sm">Home Security</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground">
                                Ensure your home stays in your family, no matter what life throws
                                your way.
                            </p>
                        </div>

                        {/* Card Body */}
                        <div className="p-8">
                            <ul className="space-y-4 mb-8">
                                {mortgageProtectionBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={onMortgageProtection}
                                variant="secondary"
                                className="w-full group"
                                size="lg"
                            >
                                Get Mortgage Protection Quote
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Trust Indicator */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-md">
                        <Shield className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                            Backed by <span className="font-semibold text-foreground">A-rated insurance carriers</span> you can trust
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
