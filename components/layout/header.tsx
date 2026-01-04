"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps {
    onGetStarted?: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#coverage", label: "Coverage Options" },
        { href: "#benefits", label: "Living Benefits" },
        { href: "#how-it-works", label: "How It Works" },
        { href: "#testimonials", label: "Testimonials" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled || isMobileMenuOpen
                    ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/logo-icon.png"
                            alt="Try Family Life"
                            width={48}
                            height={48}
                            className="rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
                        />
                        <span className="text-2xl font-serif font-bold text-foreground hidden sm:block">
                            Try Family Life
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Button
                            onClick={onGetStarted}
                            className="hidden sm:inline-flex"
                            size="default"
                        >
                            Get Started
                        </Button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-border">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="px-4 pt-4 sm:hidden">
                                <Button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        onGetStarted?.();
                                    }}
                                    className="w-full"
                                    size="lg"
                                >
                                    Get Started
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
