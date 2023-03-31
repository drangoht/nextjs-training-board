'use client';
import {useRouter} from 'next/navigation';
import React, { FormEvent } from 'react'
import { Button } from '~/src/components/form/Bouton'
import { Input } from '~/src/components/form/Input'

type propositionFormProps = {
    boardId : number;
}
export const PropositionForm= ({
    boardId
} : propositionFormProps ) => {
    const router = useRouter();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = String(formData.get("Title"));
        fetch(`/api/boards/${boardId}/propositions`, {
            method:"POST",
            body: JSON.stringify({
                title
            })
        }).then(res => res.json())
        .then((data) => {
            router.refresh(); // refresh data
        });
    }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <Input label="Title" name="Title" />
        <Button type="submit">Create Proposition</Button>
    </form>
  )
}
