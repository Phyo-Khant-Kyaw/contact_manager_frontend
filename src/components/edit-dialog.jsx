"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { contactRepository } from "@/repositories/contactRepository";
import { z } from "zod";
import { contactSchema } from "./schemas/contactSchema";

export function EditDialog({ id, onUpdateSuccess }) {
    const [open, setOpen] = useState(false);
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open && id) {
            const fetchContact = async () => {
                try {
                    const res = await contactRepository.getContactById(id);
                    const { name = "", email = "", message = "" } = res;
                    setContact({ name, email, message });
                } catch (error) {
                    console.error("Error fetching contact:", error);
                }
            };
            fetchContact();
        }
    }, [open, id]);

    const handleUpdate = async () => {
        try {
            contactSchema.parse(contact);
            setErrors({});
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = {};
                err.errors.forEach((e) => {
                    fieldErrors[e.path[0]] = e.message;
                });
                setErrors(fieldErrors);
                return;
            }
        }

        setIsLoading(true);
        try {
            await contactRepository.updateContactById(id, contact);
            onUpdateSuccess();
            setOpen(false);
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className="text-blue-600 hover:text-blue-800"
                onClick={() => setOpen(true)}
            >
                <Pencil className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Contact</DialogTitle>
                    <DialogDescription>
                        Make changes and click "Save" to update this contact.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div>
                        <Input
                            value={contact.name}
                            onChange={(e) =>
                                setContact({ ...contact, name: e.target.value })
                            }
                            placeholder="Name"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            value={contact.email}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    email: e.target.value,
                                })
                            }
                            placeholder="Email"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <Input
                            value={contact.message}
                            onChange={(e) =>
                                setContact({
                                    ...contact,
                                    message: e.target.value,
                                })
                            }
                            placeholder="Message"
                        />
                        {errors.message && (
                            <p className="text-sm text-red-500">
                                {errors.message}
                            </p>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
