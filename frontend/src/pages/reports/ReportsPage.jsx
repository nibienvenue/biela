import { useState } from 'react';
import Table from '../../components/ui/Table';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import { payrollReportByMonth } from '../../api/reports';

export default function ReportsPage() {
    const [month, setMonth] = useState('');
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = () => {
        if (!month) return;
        setLoading(true);
        payrollReportByMonth(month)
            .then((res) => setRows(res.data || []))
            .finally(() => setLoading(false));
    };

    return (
        <div className="space-y-5">
            <h2 className="text-xl font-semibold">Monthly Payroll Report</h2>

            <div className="flex flex-col md:flex-row gap-3 items-end md:items-end justify-between">
                <div className="w-full md:max-w-xs">
                    <TextInput
                        label="Month (YYYY-MM)"
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required={false}
                    />
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" disabled={loading} onClick={load}>
                        {loading ? 'Generating...' : 'Generate'}
                    </Button>
                </div>
            </div>

            <Table
                columns={[
                    { key: 'firstName', label: 'First Name' },
                    { key: 'lastName', label: 'Last Name' },
                    { key: 'position', label: 'Position' },
                    { key: 'departmentName', label: 'Department' },
                    { key: 'netSalary', label: 'Net Salary' },
                ]}
                rows={rows.map((r, i) => ({ id: r.id ?? i, ...r }))}
            />

            <div className="text-xs text-gray-500 dark:text-gray-300">
                Report should show: firstname, lastname, position, department, net salary.
            </div>
        </div>
    );
}


