import { useEffect, useState } from 'react';
import { insertDepartment, listDepartments } from '../../api/hr';
import Table from '../../components/ui/Table';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

export default function DepartmentInsertPage() {
    const [deptCode, setDeptCode] = useState('');
    const [deptName, setDeptName] = useState('');

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listDepartments().then((res) => setRows(res.data || []));
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        insertDepartment({
            departmentCode: deptCode,
            departmentName: deptName,
        })
            .then(() => listDepartments().then((res) => setRows(res.data || [])))
            .finally(() => setLoading(false));
    };

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold">Department</h2>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <TextInput label="Department Code" value={deptCode} onChange={(e) => setDeptCode(e.target.value)} required />
                <TextInput label="Department Name" value={deptName} onChange={(e) => setDeptName(e.target.value)} required />

                <div className="md:col-span-2 flex gap-3 justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Inserting...' : 'Insert'}
                    </Button>
                </div>
            </form>

            <Table
                columns={[
                    { key: 'departmentCode', label: 'Dept Code' },
                    { key: 'departmentName', label: 'Dept Name' },
                ]}
                rows={rows.map((r, i) => ({ id: r.id ?? r.departmentCode ?? i, ...r }))}
            />
        </div>
    );
}


