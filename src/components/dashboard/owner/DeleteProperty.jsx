"use client";

import { Button, Modal, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";

export function DeleteProperty({ id, token, title }) {

    const router = useRouter()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


    const handleDeletePet = async () => {

        const res = await fetch(`${baseUrl}/api/properties/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
        });
        const data = await res.json();

        if (data.acknowledged) {
            toast.success(`${title} property delete successfully`)
            router.refresh()
        }

        return data
    }


    return (
        <Modal>
            <Button variant="ghost" className={'text-gray-500 w-fit min-w-0 p-2'}><FiTrash2 className="w-4 h-4" /></Button>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[360px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            Delete Property?
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Are you sure you want to delete this property? This action cannot be undone. All information related to this property will be permanently removed.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="w-full" slot="close">
                                Cancle
                            </Button>
                            <Button
                                onClick={() => handleDeletePet()}
                                className="w-full">
                                Delete Property
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}