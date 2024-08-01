import React, { useEffect, useState } from 'react';
import { useNavigate,} from 'react-router-dom';
import appwriteService from '../../appwrite/config';
import { Button, Input } from '../index'; // Adjust this import according to your project structure
import { useForm } from 'react-hook-form';
export default function EditSupplier({onSupplierEditted, SupplierId}) {
    let id = SupplierId;
    const [supplier, setSupplier] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {reset} = useForm();
    const [formData, setFormData] = useState({
        Supplier_Name: '',
        Address: '',
        Contact: ''
    });

    useEffect(() => {
        const fetchSupplier = async (supplierId) => {
            setIsLoading(true);
            try {
                const thisSupplier = await appwriteService.getSupplier(supplierId);
                setSupplier(thisSupplier);
                setFormData({
                    Supplier_Name: thisSupplier.Supplier_Name,
                    Address: thisSupplier.Address,
                    Contact: thisSupplier.Contact,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Appwrite service :: fetchSupplier :: error", error);
                setError('Failed to fetch supplier details.');
                setIsLoading(false);
            }
        };

        fetchSupplier(id);
    }, [id,setSupplier]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidDocumentId(id)) {
            setError('Invalid supplier ID format.');
            return;
        }
        try {
            await appwriteService.updateSupplier(id, formData);
            alert('Supplier updated successfully!');
            reset();
            onSupplierEditted();
        } catch (error) {
            console.error("Appwrite service :: handleSubmit :: error", error);
            setError('Failed to update supplier. Please try again.');
        }
    };

    const isValidDocumentId = (id) => {
        const validIdPattern = /^[a-zA-Z0-9]{1,36}$/;
        return validIdPattern.test(id);
    };

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto my-8 px-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Supplier</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="Supplier_Name" className="block text-gray-700">Supplier Name</label>
                    <Input
                        type="text"
                        name="Supplier_Name"
                        id="Supplier_Name"
                        value={formData.Supplier_Name}
                        onChange={handleChange}
                        className="mt-2 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Address" className="block text-gray-700">Address</label>
                    <Input
                        type="text"
                        name="Address"
                        id="Address"
                        value={formData.Address}
                        onChange={handleChange}
                        className="mt-2 p-2 border rounded w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="Contact" className="block text-gray-700">Contact</label>
                    <Input
                        type="text"
                        name="Contact"
                        id="Contact"
                        value={formData.Contact}
                        onChange={handleChange}
                        className="mt-2 p-2 border rounded w-full"
                        required
                    />
                </div>
                <Button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Supplier</Button>
            </form>
        </div>
    );
}
