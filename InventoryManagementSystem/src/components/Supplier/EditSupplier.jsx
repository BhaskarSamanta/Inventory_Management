import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';  
import appwriteService from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../index';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';

export default function EditSupplier() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchSupplier = async (supplierId) => {
            try {
                const thisSupplier = await appwriteService.getSupplier(supplierId);
                setSupplier(thisSupplier);
            } catch (error) {
                console.error("Appwrite service :: fetchSupplier :: error", error);
            }
        };

        fetchSupplier(id);
    }, [id]);

    const onSubmit = async (data) => {
        try {
            await appwriteService.updateSupplier(id, {
                Supplier_Name: data.Supplier_Name,
                Address: data.Address,
                Contact: data.Contact,
            });

            alert('Supplier updated successfully!');
            navigate('/suppliers');
        } catch (error) {
            console.error("Appwrite service :: onSubmit :: error", error);
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormItem id="Supplier_Name" className="space-y-2">
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Supplier Name"
                            defaultValue={supplier?.Supplier_Name || ''}
                            {...register('Supplier_Name', { required: 'Supplier Name is required' })}
                        />
                    </FormControl>
                    <FormMessage>{errors.Supplier_Name && errors.Supplier_Name.message}</FormMessage>
                </FormItem>
                <FormItem id="Address" className="space-y-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Address"
                            defaultValue={supplier?.Address || ''}
                            {...register('Address', { required: 'Address is required' })}
                        />
                    </FormControl>
                    <FormMessage>{errors.Address && errors.Address.message}</FormMessage>
                </FormItem>
                <FormItem id="Contact" className="space-y-2">
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Contact"
                            defaultValue={supplier?.Contact || ''}
                            {...register('Contact', { required: 'Contact is required' })}
                        />
                    </FormControl>
                    <FormMessage>{errors.Contact && errors.Contact.message}</FormMessage>
                </FormItem>
                <Button type="submit">Update Supplier</Button>
            </Form>
        </div>
    );
}
