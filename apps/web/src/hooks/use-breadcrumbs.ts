import { useLocation } from "@tanstack/react-router";
import { useMemo } from "react";

type BreadcrumbItem = {
    title: string;
    link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
    "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
    "/dashboard/overview": [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Overview", link: "/dashboard/overview" },
    ],
};

export const useBreadcrumbs = (): BreadcrumbItem[] => {
    const { pathname } = useLocation();

    const breadcrumbs = useMemo(() => {
        if (routeMapping[pathname]) {
            return routeMapping[pathname];
        }

        const segments = pathname.split("/").filter(Boolean);
        return segments.map((segment, index) => {
            const path = `/${segments.slice(0, index + 1).join("/")}`;
            return {
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                link: path,
            };
        });
    }, [pathname]);

    return breadcrumbs;
};
