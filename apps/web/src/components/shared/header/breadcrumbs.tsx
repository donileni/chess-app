import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export const Breadcrumbs = () => {
    const items = useBreadcrumbs();
    if (items.length === 0) return null;

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <Fragment key={item.title}>
                        {index !== items.length - 1 && (
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink asChild>
                                    <Link to={item.link}>{item.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        {index === items.length - 1 && (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
