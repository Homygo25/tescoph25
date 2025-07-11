import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AuthLayout2 from '@/layouts/auth-layout2';

type RegisterForm = {
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    used_ref: string;
    gender: string;
    termsConsent: boolean;
};

export default function Register() {
    const { ref } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        used_ref: typeof ref === 'string' ? ref : '',
        gender: '',
        termsConsent: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout2 title="Register" description="Enter your details below to create your account">
            <Head title="Register" />
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">Enter your details below to create your account</p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            // autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                            placeholder="Username"
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Gender</Label>
                        <RadioGroup id="gender" value={data.gender} onValueChange={(value) => setData('gender', value)} className="flex">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="m" id="m" />
                                <Label htmlFor="m">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="f" id="f" />
                                <Label htmlFor="f">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="o" id="o" />
                                <Label htmlFor="o">Other</Label>
                            </div>
                        </RadioGroup>
                        <InputError message={errors.gender} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="used_ref">Referral Code</Label>
                        <Input
                            id="used_ref"
                            type="text"
                            required
                            // autoFocus
                            tabIndex={3}
                            // autoComplete="name"
                            value={data.used_ref}
                            onChange={(e) => setData('used_ref', e.target.value)}
                            disabled={processing}
                            placeholder="Referral Code"
                        />
                        <InputError message={errors.used_ref} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <InputPassword
                            id="password"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                    <InputPassword
                        id="password_confirmation"
                        type="password"
                        required
                        tabIndex={5}
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        placeholder="Confirm password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>



                {/* Red link for Terms and Conditions, triggers card modal */}
                <div className="mb-3 mt-2 text-center d-flex align-items-center justify-content-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!data.termsConsent}
                    readOnly
                    className="form-check-input me-2"
                    style={{ width: '1.1em', height: '1.1em', accentColor: '#8B0000', cursor: 'pointer' }}
                    tabIndex={-1}
                  />
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 m-0 text-decoration-underline fw-bold"
                    style={{ color: '#8B0000', fontWeight: 600, fontSize: '1em', cursor: 'pointer' }}
                    onClick={() => setShowModal(true)}
                  >
                    I agree to the Terms and Conditions
                  </button>
                </div>

                {/* Card modal for legal text, replaces form */}
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" style={{ minHeight: '100vh' }}>
                    <div className="backdrop-blur-lg bg-white rounded-2xl shadow-2xl flex w-full max-w-sm flex-col justify-center gap-4 px-5 py-8 relative" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}>
                      <h5 className="text-2xl font-bold mb-2 text-center" style={{ color: '#8B0000' }}>Terms & Conditions</h5>
                      <div className="overflow-y-auto mb-4" style={{ maxHeight: '260px' }}>
                        <p style={{ fontSize: '0.95em', color: '#8B0000', fontWeight: 500 }}>
                          I confirm that I have read and agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#8B0000', textDecoration: 'underline' }}>Terms and Conditions</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#8B0000', textDecoration: 'underline' }}>Privacy Policy</a>. I understand that CVS Pharmacy Philippines offers co-partnership and franchise opportunities involving a fixed daily earnings model for a period of time, and that participation in such programs is subject to separate qualification and package selection. I consent to receive marketing updates, promotional content, and official communications from CVS Pharmacy Philippines and its authorized persons.
                        </p>
                      </div>
                      <div className="flex justify-center w-full mt-2">
                        <Button
                          type="button"
                          className="w-full"
                          style={{ backgroundColor: '#8B0000', color: '#fff', fontWeight: 600, fontSize: '1.1em' }}
                        onClick={() => {
                          setData('termsConsent', true);
                          setShowModal(false);
                        }}
                        >
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Create account
                </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout2>
    );
}
