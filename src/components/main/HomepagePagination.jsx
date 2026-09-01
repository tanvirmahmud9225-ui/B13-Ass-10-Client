"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function HomepagePagination({ totalPage, propertyPage }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(propertyPage) || 1;
    const totalPages = Number(totalPage) || 1;
    const allProductSearch = searchParams.get("allProductSearch") || "";

    const buildHref = (newPage) => {
        const params = new URLSearchParams();
        params.set("page", newPage);
        if (allProductSearch) params.set("allProductSearch", allProductSearch);
        return `/allProperties?${params.toString()}`;
    };

    const gotToPage = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        router.push(buildHref(newPage));
    };

    return (
        <Pagination className="justify-center pt-5 pb-10">
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1} onPress={() => gotToPage(page - 1)}>
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                    </Pagination.Previous>
                </Pagination.Item>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link key={p} href={buildHref(p)}>
                        <Pagination.Item>
                            <Pagination.Link isActive={p === page}>
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    </Link>
                ))}
                <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages} onPress={() => gotToPage(page + 1)}>
                        <span>Next</span>
                        <Pagination.NextIcon />
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    );
}