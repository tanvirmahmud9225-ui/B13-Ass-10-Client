"use client";

import { Pagination } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HomepagePagination({ totalPage, propertyPage }) {

    const router = useRouter();

    const [page, setPage] = useState(Number(propertyPage));
    const totalPages = Number(totalPage);

    const gotToPage = (newPage) => {
        if (newPage < 1 || newPage > totalPage) return;
        setPage(newPage)
        router.push(`allProperties?page=${newPage}`)
    }



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
                    <Link key={p} href={`allProperties?page=${p}`}>
                        <Pagination.Item >
                            <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
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