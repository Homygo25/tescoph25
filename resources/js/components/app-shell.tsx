import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/context/ThemeContext';
import { useState } from 'react';

interface AppShellProps {
    children: React.ReactNode;
    variant?: 'header' | 'sidebar';
}

export function AppShell({ children, variant = 'header' }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('sidebar') !== 'false' : true));

    const handleSidebarChange = (open: boolean) => {
        setIsOpen(open);

        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebar', String(open));
        }
    };

    if (variant === 'header') {
        return (
            <ThemeProvider>
                <div className="flex min-h-screen w-full flex-col">{children}</div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            <SidebarProvider defaultOpen={isOpen} open={isOpen} onOpenChange={handleSidebarChange}>
                {children}
            </SidebarProvider>
        </ThemeProvider>
    );
}
