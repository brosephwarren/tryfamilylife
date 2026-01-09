"use client";

import { Button } from "@/components/ui/button";
import { Star, Quote, Shield, MapPin, Award } from "lucide-react";

interface TestimonialsProps {
    onGetStarted?: () => void;
}

export function Testimonials({ onGetStarted }: TestimonialsProps) {
    const stats = [
        {
            icon: Award,
            value: "A-Rated",
            label: "Insurance Carriers",
        },
        {
            icon: MapPin,
            value: "50 States",
            label: "Nationwide Coverage",
        },
        {
            icon: Shield,
            value: "$1B+",
            label: "Coverage Placed",
        },
    ];

    const testimonials = [
        {
            name: "Sarah M.",
            location: "Texas",
            rating: 5,
            text: "I was nervous about getting life insurance after my health issues, but they found me coverage I could afford. The living benefits give me peace of mind knowing I'm protected now, not just my family later.",
            coverageType: "Life Insurance",
        },
        {
            name: "Michael R.",
            location: "Florida",
            rating: 5,
            text: "After buying our first home, mortgage protection was a priority. The agent explained everything clearly and found us a policy that fits our budget. The process was surprisingly easy!",
            coverageType: "Mortgage Protection",
        },
        {
            name: "Jennifer L.",
            location: "California",
            rating: 5,
            text: "As a single mom, knowing my kids will be taken care of is everything. They found me a no-exam policy with living benefits—I didn't even know that was an option. Highly recommend!",
            coverageType: "Life Insurance",
        },
    ];

    return (
        <section id="testimonials" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-8 mb-16 pb-16 border-b border-border">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="flex justify-center mb-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <stat.icon className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                                {stat.value}
                            </p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
                        Real Stories from{" "}
                        <span className="text-primary">Real Families</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Thousands of families trust us to protect what matters most. Here&apos;s
                        what they have to say.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-muted rounded-2xl p-8 border border-border"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-primary/50 mb-4" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                </div>
                                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {testimonial.coverageType}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        onClick={onGetStarted}
                        size="xl"
                        variant="default"
                    >
                        Check My Eligibility Now
                    </Button>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Free quote • No obligation • 2 minute application
                    </p>
                </div>
            </div>
        </section>
    );
}
