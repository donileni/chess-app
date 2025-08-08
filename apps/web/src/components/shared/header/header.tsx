import type { PropsWithChildren } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumbs } from "@/components/shared/header/breadcrumbs";
import { Separator } from "@/components/ui/separator";
export const Header = ({ children }: PropsWithChildren) => (
    <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger />
                <Separator
                    orientation="vertical"
                    className="mx-2 h-6 w-px bg-border"
                />
                <Breadcrumbs />
            </div>
        </header>
        {children}
    </SidebarInset>
);
