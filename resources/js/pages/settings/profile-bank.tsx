import { RoleProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const page = usePage<SharedData>();
    const { auth, referral_used } = page.props;

    const [previewImage, setPreviewImage] = useState<string | null>(auth.user.profile_image ? `/storage/${auth.user.profile_image}` : null);
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [bankAccountName, setBankAccountName] = useState('');
    const [bankVerifying, setBankVerifying] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<{
        name: string;
        username: string;
        email: string;
        referral: string;
        phone: string;
        social_link: string;
        image: File | null;
    }>({
        name: String(auth.user.name ?? ''),
        username: String(auth.user.username ?? ''),
        email: String(auth.user.email ?? ''),
        referral: String(auth.user.used_ref ?? ''),
        phone: String(auth.user.phone ?? ''),
        social_link: String(auth.user.social_link ?? ''),
        image: null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const verifyBankAccount = async () => {
        if (!bankAccountNumber) return;
        setBankVerifying(true);
        try {
            const res = await fetch('/api/bank/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ account_number: bankAccountNumber }),
            });
            const json = await res.json();
            if (res.ok && json.account_name) {
                setBankAccountName(json.account_name);
            } else {
                setBankAccountName('Invalid Account');
            }
        } catch {
            setBankAccountName('Error verifying');
        } finally {
            setBankVerifying(false);
        }
    };

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your profile details" />
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Profile Image</Label>
                            {previewImage && <img src={previewImage} alt="Preview" className="h-24 w-24 rounded-full object-cover" />}
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full"
                                onChange={handleImageChange}
                            />
                            <InputError className="mt-2" message={errors.image} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                className="mt-1 block w-full"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                autoComplete="username"
                                placeholder="Username"
                            />
                            <InputError className="mt-2" message={errors.username} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Email address"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Phone number"
                            />
                            <InputError className="mt-2" message={errors.phone} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="social_link">Social Link</Label>
                            <Input
                                id="social_link"
                                className="mt-1 block w-full"
                                value={data.social_link}
                                onChange={(e) => setData('social_link', e.target.value)}
                                placeholder="https://facebook.com/username"
                            />
                            <InputError className="mt-2" message={errors.social_link} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bank_account_number">Bank Account Number</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="bank_account_number"
                                    value={bankAccountNumber}
                                    onChange={(e) => setBankAccountNumber(e.target.value)}
                                    placeholder="Enter account number"
                                />
                                <Button type="button" onClick={verifyBankAccount} disabled={bankVerifying}>
                                    {bankVerifying ? 'Verifying...' : 'Verify'}
                                </Button>
                            </div>
                            {bankAccountName && <p className="text-sm text-muted-foreground">Account Name: {bankAccountName}</p>}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="referral">Used Referral Code</Label>
                            <Input id="referral" type="text" className="mt-1 block w-full" value={String(referral_used ?? '')} disabled />
                            <InputError className="mt-2" message={errors.referral} />
                        </div>
                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>
                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
