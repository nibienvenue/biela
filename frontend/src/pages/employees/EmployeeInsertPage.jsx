import { useEffect, useState } from 'react';
import { insertEmployee, listDepartments } from '../../api/hr';
import TextInput from '../../components/ui/TextInput';
import SelectInput from '../../components/ui/SelectInput';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import { listEmployees } from '../../api/hr';

export default function EmployeeInsertPage() {
    const [employeeNo, setEmployeeNo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState('');
    const [telephone, setTelephone] = useState('');
    const [gender, setGender] = useState('Male');
    const [hiredDate, setHiredDate] = useState('');
    const [departmentCode, setDepartmentCode] = useState('');

    const [departments, setDepartments] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        listDepartments().then((res) => setDepartments(res.data || []));
        listEmployees().then((res) => setRows(res.data || []));
    }, []);

    const deptOptions = departments.map((d) => ({
        value: d.departmentCode,
        label: d.departmentName,
    }));

    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        insertEmployee({
            employeeNumber: employeeNo,
            firstName,
            lastName,
            address,
            position,
            telephone,
            gender,
            hireddate: hiredDate,
            departmentCode,
        })
            .then(() => Promise.all([listEmployees(), listDepartments()]))
            .then(([empRes]) => setRows(empRes.data || []))
            .finally(() => setLoading(false));
    };

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold">Employee</h2>

            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <TextInput label="Employee Number" value={employeeNo} onChange={(e) => setEmployeeNo(e.target.value)} required />
                <TextInput label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

                <TextInput label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />

                <TextInput label="Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                <TextInput label="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />

                <SelectInput
                    label="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' },
                    ]}
                />

                <TextInput
                    label="Hire Date"
                    type="date"
                    value={hiredDate}
                    onChange={(e) => setHiredDate(e.target.value)}
                    required
                />

                <SelectInput
                    label="Department"
                    value={departmentCode}
                    onChange={(e) => setDepartmentCode(e.target.value)}
                    required
                    options={deptOptions}
                />

                <div className="md:col-span-2 flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Inserting...' : 'Insert'}
                    </Button>
                </div>
            </form>

            <Table
                columns={[
                    { key: 'employeeNumber', label: 'Emp No' },
                    { key: 'firstName', label: 'First' },
                    { key: 'lastName', label: 'Last' },
                    { key: 'position', label: 'Position' },
                    {
                        key: 'departmentCode',
                        label: 'Dept Code',
                    },
                ]}
                rows={rows.map((r, i) => ({ id: r.id ?? r.employeeNumber ?? i, ...r }))}
            />
        </div>
    );
}


