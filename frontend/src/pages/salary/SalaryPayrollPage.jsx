import { useEffect, useState } from 'react';
import Table from '../../components/ui/Table';
import TextInput from '../../components/ui/TextInput';
import SelectInput from '../../components/ui/SelectInput';
import Button from '../../components/ui/Button';
import { insertSalary, listSalaryByMonth, updateSalary, deleteSalary } from '../../api/salary';
import { listEmployees, listDepartments } from '../../api/hr';

export default function SalaryPayrollPage() {
    const [month, setMonth] = useState('');

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const [employeeNumber, setEmployeeNumber] = useState('');
    const [grossSalary, setGrossSalary] = useState('');
    const [totalDeduction, setTotalDeduction] = useState('');
    const [netSalary, setNetSalary] = useState('');

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        listEmployees().then((res) => setEmployees(res.data || []));
        listDepartments().then((res) => setDepartments(res.data || []));
    }, []);

    const empOptions = employees.map((e) => ({
        value: e.employeeNumber,
        label: `${e.firstName} ${e.lastName} (${e.position})`,
    }));

    const deptOptions = departments.map((d) => ({
        value: d.departmentCode,
        label: d.departmentName,
    }));

    const load = (m) => {
        if (!m) {
            setRows([]);
            return;
        }

        setLoading(true);
        listSalaryByMonth(m)
            .then((res) => setRows(res.data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        // optional: don't auto load until month selected
    }, []);

    const calcNet = (g, d) => {
        const gross = Number(g || 0);
        const ded = Number(d || 0);
        return String(gross - ded);
    };

    const onInsert = (e) => {
        e.preventDefault();
        if (!month) return;

        const payload = {
            month,
            employeeNumber,
            grossSalary: Number(grossSalary),
            totalDeduction: Number(totalDeduction),
            netSalary: Number(netSalary),
        };

        setLoading(true);
        insertSalary(payload)
            .then(() => load(month))
            .finally(() => setLoading(false));
    };

    const onStartEdit = (row) => {
        setEditingId(row.id);
        setEmployeeNumber(row.employeeNumber);
        setGrossSalary(row.grossSalary);
        setTotalDeduction(row.totalDeduction);
        setNetSalary(row.netSalary);
        setMonth(row.month);
    };

    const onUpdate = (e) => {
        e.preventDefault();
        if (!editingId) return;

        const payload = {
            month,
            employeeNumber,
            grossSalary: Number(grossSalary),
            totalDeduction: Number(totalDeduction),
            netSalary: Number(netSalary),
        };

        setLoading(true);
        updateSalary(editingId, payload)
            .then(() => load(month))
            .finally(() => setLoading(false));
    };

    const onDelete = (id) => {
        setLoading(true);
        deleteSalary(id)
            .then(() => load(month))
            .finally(() => setLoading(false));
    };

    const columns = [
        { key: 'employeeNumber', label: 'Emp No' },
        { key: 'grossSalary', label: 'Gross' },
        { key: 'totalDeduction', label: 'Deduction' },
        { key: 'netSalary', label: 'Net' },
        {
            key: 'actions',
            label: 'Actions',
            render: (r) => (
                <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => onStartEdit(r)}>
                        Edit
                    </Button>
                    <button
                        type="button"
                        onClick={() => onDelete(r.id)}
                        className="rounded-lg border border-red-200 text-red-700 px-3 py-2 text-sm hover:bg-red-50 disabled:opacity-60"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold">Salary / Payroll</h2>

            <div className="flex flex-col md:flex-row gap-3 items-end md:items-end justify-between">
                <div className="w-full md:max-w-xs">
                    <TextInput
                        label="Month (YYYY-MM)"
                        type="month"
                        value={month}
                        onChange={(e) => {
                            setMonth(e.target.value);
                            // compute net if user already entered gross/ded
                        }}
                        required={false}
                    />
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        disabled={loading}
                        onClick={() => load(month)}
                    >
                        {loading ? 'Loading...' : 'Retrieve'}
                    </Button>
                </div>
            </div>

            <form onSubmit={editingId ? onUpdate : onInsert} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput
                        label="Employee"
                        value={employeeNumber}
                        onChange={(e) => setEmployeeNumber(e.target.value)}
                        required
                        options={empOptions}
                    />

                    <TextInput
                        label="Gross Salary"
                        type="number"
                        value={grossSalary}
                        onChange={(e) => {
                            const v = e.target.value;
                            setGrossSalary(v);
                            setNetSalary(calcNet(v, totalDeduction));
                        }}
                        required
                    />

                    <TextInput
                        label="Total Deduction"
                        type="number"
                        value={totalDeduction}
                        onChange={(e) => {
                            const v = e.target.value;
                            setTotalDeduction(v);
                            setNetSalary(calcNet(grossSalary, v));
                        }}
                        required
                    />

                    <TextInput
                        label="Net Salary"
                        type="number"
                        value={netSalary}
                        onChange={(e) => setNetSalary(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex gap-3">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : editingId ? 'Update' : 'Insert'}
                        </Button>

                        {editingId ? (
                            <Button
                                variant="secondary"
                                type="button"
                                disabled={loading}
                                onClick={() => {
                                    setEditingId(null);
                                    setEmployeeNumber('');
                                    setGrossSalary('');
                                    setTotalDeduction('');
                                    setNetSalary('');
                                }}
                            >
                                Cancel
                            </Button>
                        ) : null}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-300">
                        Net salary = gross salary - total deduction
                    </div>
                </div>
            </form>

            <Table columns={columns} rows={rows.map((r, i) => ({ id: r.id ?? i, ...r }))} />
        </div>
    );
}


