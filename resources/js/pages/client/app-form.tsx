import DatePicker from '@/components/date-picker';
import { SelectInput } from '@/components/select';
import styles from './app-form.module.css';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { Auth, RoleProps, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type PageProps = {
    success: {
        message: string;
    };
    error: {
        message: string;
    };
    auth: Auth;
    account_balance: number;
    received_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
    sent_transactions: {
        name: string;
        transfer_amount: number;
        updated_at: string;
    }[];
};

export default function AppForm() {
    const { auth, success, error, type } = usePage<PageProps>().props;
    const [appDetails, setAppDetails] = useState({
        first_name: '',
        last_name: '',
        middle_name: '',
        present_address: '',
        nationality: '',
        phone_number: '',
        email: '',
        highest_education: '',
        school_name: '',
        year_graduated: '',
        source_of_income: '',
    });
    const [date, setDate] = useState<Date | null>(null);
    const [gender, setGender] = useState<string | null>(null);
    const [employee, setEmployee] = useState({
        company_name: '',
        years_of_employment: '',
    });
    const [business_owner, setBusiness_owner] = useState({
        nature_of_business: '',
        duration_business_operation: '',
    });
    const [creditDetails, setCreditDetails] = useState({
        tesco_active_deposit: '',
        tesco_monthly_income: '',
        purpose: '',
    });

    const resetForm = () => {
        setAppDetails({
            first_name: '',
            last_name: '',
            middle_name: '',
            present_address: '',
            nationality: '',
            phone_number: '',
            email: '',
            highest_education: '',
            school_name: '',
            year_graduated: '',
            source_of_income: '',
        });
        setDate(null);
        setGender(null);
        setEmployee({ company_name: '', years_of_employment: '' });
        setBusiness_owner({ nature_of_business: '', duration_business_operation: '' });
        setCreditDetails({ tesco_active_deposit: '', tesco_monthly_income: '', purpose: '' });
    };

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const missingFields: string[] = [];

        for (const key in appDetails) {
            if (appDetails[key as keyof typeof appDetails] === '') {
                missingFields.push(key);
            }
        }
        if (!gender) missingFields.push('gender');
        if (!date) missingFields.push('date_of_birth');

        if (appDetails.source_of_income === 'employment') {
            for (const key in employee) {
                if (employee[key as keyof typeof employee] === '') {
                    missingFields.push(key);
                }
            }
        }
        if (appDetails.source_of_income === 'business_owner') {
            for (const key in business_owner) {
                if (business_owner[key as keyof typeof business_owner] === '') {
                    missingFields.push(key);
                }
            }
        }
        if (type === 'credit') {
            for (const key in creditDetails) {
                if (creditDetails[key as keyof typeof creditDetails] === '') {
                    missingFields.push(key);
                }
            }
        }

        if (missingFields.length > 0) {
            toast.error(`Please fill in all necessary details.`);
            return;
        }

        const payload = {
            ...appDetails,
            gender,
            date_of_birth: date,
            app_type: String(type),
            ...employee,
            ...business_owner,
            ...creditDetails,
        };

        router.post('/post-appForm', payload);
    }

    function onChange(
        e: React.ChangeEvent<HTMLInputElement>,
        stateName: 'appDetails' | 'employee' | 'business_owner' | 'creditDetails'
    ) {
        const { name, value } = e.target;
        if (stateName === 'appDetails') {
            setAppDetails((prev) => ({ ...prev, [name]: value }));
        } else if (stateName === 'employee') {
            setEmployee((prev) => ({ ...prev, [name]: value }));
        } else if (stateName === 'business_owner') {
            setBusiness_owner((prev) => ({ ...prev, [name]: value }));
        } else if (stateName === 'creditDetails') {
            setCreditDetails((prev) => ({ ...prev, [name]: value }));
        }
    }

    function handleGenderChange(val: string) {
        setGender(val);
    }

    useEffect(() => {
        if (success?.message) {
            toast.success(success.message);
        }
        if (error?.message) {
            toast.error(error.message);
        }
    }, [success, error]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: type === 'franchise' ? 'Franchise Application' : 'Tesco Credit Application',
            href: '/transfer-fund',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Dashboard" />
            <form onSubmit={handleSubmit} className={styles.formWrapper}>
                <div className={styles.formSection}>
                    <Label>First Name</Label>
                    <Input name="first_name" value={appDetails.first_name} onChange={e => onChange(e, 'appDetails')} required />
                </div>
                <div className={styles.formSection}>
                    <Label>Last Name</Label>
                    <Input name="last_name" value={appDetails.last_name} onChange={e => onChange(e, 'appDetails')} required />
                </div>
                <div className={styles.formSection}>
                    <Label>Middle Name</Label>
                    <Input name="middle_name" value={appDetails.middle_name} onChange={e => onChange(e, 'appDetails')} />
                </div>
                <div className={styles.formSection}>
                    <Label>Present Address</Label>
                    <Input name="present_address" value={appDetails.present_address} onChange={e => onChange(e, 'appDetails')} required />
                </div>
                <div className={styles.formSection}>
                    <Label>Nationality</Label>
                    <Input name="nationality" value={appDetails.nationality} onChange={e => onChange(e, 'appDetails')} required />
                </div>
                <div className={styles.formSection}>
                    <Label>Phone Number</Label>
                    <Input name="phone_number" value={appDetails.phone_number} onChange={e => onChange(e, 'appDetails')} required />
                </div>
                <div className={styles.formSection}>
                    <Label>Email</Label>
                    <Input name="email" value={appDetails.email} onChange={e => onChange(e, 'appDetails')} required type="email" />
                </div>
                <div className={styles.formSection}>
                    <Label>Highest Education</Label>
                    <Input name="highest_education" value={appDetails.highest_education} onChange={e => onChange(e, 'appDetails')} />
                </div>
                <div className={styles.formSection}>
                    <Label>School Name</Label>
                    <Input name="school_name" value={appDetails.school_name} onChange={e => onChange(e, 'appDetails')} />
                </div>
                <div className={styles.formSection}>
                    <Label>Year Graduated</Label>
                    <Input name="year_graduated" value={appDetails.year_graduated} onChange={e => onChange(e, 'appDetails')} />
                </div>
                <div className={styles.formSection}>
                    <Label>Date of Birth</Label>
                    <DatePicker date={date} setDate={setDate} />
                </div>
                <div className={styles.formSection}>
                    <Label>Gender</Label>
                    <RadioGroup value={gender ?? ''} onValueChange={handleGenderChange} className={styles.radioGroup}>
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </RadioGroup>
                </div>
                <div className={styles.formSection}>
                    <Label>Source of Income</Label>
                    <SelectInput
                        placeholder="Select"
                        className="w-full"
                        value={appDetails.source_of_income}
                        onChange={val => onChange({ target: { name: 'source_of_income', value: val } } as React.ChangeEvent<HTMLInputElement>, 'appDetails')}
                        items={[
                            { value: '', text: 'Select' },
                            { value: 'employment', text: 'Employment' },
                            { value: 'business_owner', text: 'Business Owner' },
                        ]}
                        disabled={false}
                    />
                </div>
                {appDetails.source_of_income === 'employment' && (
                    <>
                        <div className={styles.formSection}>
                            <Label>Company Name</Label>
                            <Input name="company_name" value={employee.company_name} onChange={e => onChange(e, 'employee')} required />
                        </div>
                        <div className={styles.formSection}>
                            <Label>Years of Employment</Label>
                            <Input name="years_of_employment" value={employee.years_of_employment} onChange={e => onChange(e, 'employee')} required />
                        </div>
                    </>
                )}
                {appDetails.source_of_income === 'business_owner' && (
                    <>
                        <div className={styles.formSection}>
                            <Label>Nature of Business</Label>
                            <Input name="nature_of_business" value={business_owner.nature_of_business} onChange={e => onChange(e, 'business_owner')} required />
                        </div>
                        <div className={styles.formSection}>
                            <Label>Duration of Business Operation</Label>
                            <Input name="duration_business_operation" value={business_owner.duration_business_operation} onChange={e => onChange(e, 'business_owner')} required />
                        </div>
                    </>
                )}
                {type === 'credit' && (
                    <>
                        <div className={styles.formSection}>
                            <Label>Tesco Active Deposit</Label>
                            <Input name="tesco_active_deposit" value={creditDetails.tesco_active_deposit} onChange={e => onChange(e, 'creditDetails')} required />
                        </div>
                        <div className={styles.formSection}>
                            <Label>Tesco Monthly Income</Label>
                            <Input name="tesco_monthly_income" value={creditDetails.tesco_monthly_income} onChange={e => onChange(e, 'creditDetails')} required />
                        </div>
                        <div className={styles.formSection}>
                            <Label>Purpose</Label>
                            <Input name="purpose" value={creditDetails.purpose} onChange={e => onChange(e, 'creditDetails')} required />
                        </div>
                    </>
                )}
                <div className={styles.formSection}>
                    <Button type="submit">Submit</Button>
                    <Button type="button" onClick={resetForm} variant="secondary">Reset</Button>
                </div>
            </form>
        </AppLayout>
    );
}
