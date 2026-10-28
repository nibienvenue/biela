import { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import { insertParkingSale, listParkingSales } from '../../api/parkingSales';

export default function ParkingSalesPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fields (adjust to match your backend)
    const [buyerName, setBuyerName] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [price, setPrice] = useState('');
    const [saleDate, setSaleDate] = useState('');

    const load = () => {
        setLoading(true);
        listParkingSales()
            .then((res) => setRows(res.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            buyerName,
            vehiclePlate,
            price: Number(price),
            saleDate,
        };

        setLoading(true);
        insertParkingSale(payload)
            .then(() => {
                setBuyerName('');
                setVehiclePlate('');
                setPrice('');
                setSaleDate('');
                load();
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold">Parking Sales</h2>

            <form onSubmit={onSubmit} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput label="Buyer Name" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
                    <TextInput
                        label="Vehicle Plate"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        required
                    />
                    <TextInput label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <TextInput label="Sale Date" type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} required />
                </div>

                <div className="mt-4 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Inserting...' : 'Insert'}
                    </Button>
                </div>
            </form>

            <Table
                columns={[
                    { key: 'buyerName', label: 'Buyer' },
                    { key: 'vehiclePlate', label: 'Plate' },
                    { key: 'price', label: 'Price' },
                    { key: 'saleDate', label: 'Date' },
                ]}
                rows={rows.map((r, i) => ({ id: r.id ?? i, ...r }))}
            />
        </div>
    );
}


