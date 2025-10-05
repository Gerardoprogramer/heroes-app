import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router"

interface Breadcrumb {
    label: string,
    to: string
}

interface Props {
    currentPage: string,
    breadcrumbs?: Breadcrumb[],

}

export const CustomBreadcrumb = ({ currentPage, breadcrumbs = [] }: Props) => {

    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>

                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to='/'>Inicio</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {breadcrumbs.map((Breadcrumb) => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={Breadcrumb.to}>{Breadcrumb.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                ))}

                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb>
    )
}
