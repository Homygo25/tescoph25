import { RoleProps, type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile Image',
        href: '/settings/profile',
    },
];

export default function ProfileImage() {
    const { auth } = usePage<SharedData>().props;

    console.log('auth', auth);

    const { setData, post, reset, processing, recentlySuccessful } = useForm<{ profile_image: File | null }>({
        profile_image: null,
        // profile_image: auth.user.profile_image,
    });


    const [previewImage, setPreviewImage] = useState<string | undefined>(auth.user.profile_image ? `/storage/${auth.user.profile_image}` : undefined);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setData('profile_image', file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(undefined);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('postprofile.image'), {
            onSuccess: () => {
                reset('profile_image');
                // setPreviewImage(auth.user.profile_image ? `/storage/${auth.user.profile_image}` : undefined);
                router.visit(window.location.pathname, {
                    //Reload the full page.
                    replace: true,
                });
            },
        });
    };
    const getInitials = useInitials();
    return (
        <AppLayout breadcrumbs={breadcrumbs} role={auth.user.role as RoleProps}>
            <Head title="Profile image" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile Picture" description="Update your profile picture." />
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Avatar className="h-70 w-70 overflow-hidden rounded-full">
                            <AvatarImage src={previewImage} alt={auth.user.name} />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-9xl text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                            {/* <img src={user.profile_image} alt="Profile Preview" style={{ maxWidth: '200px' }} /> */}
                        </Avatar>
                        {/* {previewImage && <img src={previewImage} alt="Profile Preview" style={{ maxWidth: '200px' }} />} */}
                        <form onSubmit={submit} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Input type="file" onChange={handleImageChange} />
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
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
