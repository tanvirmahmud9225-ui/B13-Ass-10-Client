'use client'
import { Input } from '@heroui/react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AllPropertiesSearch = () => {
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
        const searchValue = e.target.allProductSearch.value.trim();

        if (searchValue) {
            router.push(`/allProperties?allProductSearch=${encodeURIComponent(searchValue)}`);
        } else {
            router.push(`/allProperties`);
        }
    };

    return (
        <div className=' '>
            <form onSubmit={onSubmit} className='flex justify-center items-center gap-4'>
                <Input
                    name='allProductSearch'
                    className='border rounded-3xl p-3 w-3/12'
                    type="search" placeholder='Search Product' />
                <Button type='submit' className='p-6'>
                    Search
                </Button>
            </form>
        </div>
    );
};

export default AllPropertiesSearch;