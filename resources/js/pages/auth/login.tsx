import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
            <Head title="Connect to Schale" />

            {/* Background Decoration */}
            <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] h-[50vh] w-[50vh] rounded-full bg-cyan-100 opacity-50 blur-3xl dark:bg-cyan-900/30"></div>
                <div className="absolute bottom-[-10%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-blue-100 opacity-50 blur-3xl dark:bg-blue-900/30"></div>
                {/* Diagonal Tech Lines */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'linear-gradient(45deg, #12D0F2 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/50 bg-white/80 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
                {/* Header Logo */}
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-16 w-16 rotate-3 transform items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-lg">
                        <svg
                            className="h-10 w-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter text-slate-800 dark:text-white">
                        SCHALE AUTHORITY
                    </h2>
                    <p className="mt-1 text-sm font-medium tracking-widest text-slate-500">
                        SENSEI ACCESS PORTAL
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                >
                                    Official Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    placeholder="sensei@schale.gg"
                                    className="rounded-lg border-slate-200 bg-slate-50 py-5 focus:border-cyan-400 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
                                    >
                                        Access Key
                                    </Label>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="text-xs font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-400"
                                        >
                                            Lost Key?
                                        </Link>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="rounded-lg border-slate-200 bg-slate-50 py-5 focus:border-cyan-400 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="mt-2 flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    className="border-slate-300 data-[state=checked]:bg-cyan-500"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm text-slate-600 dark:text-slate-400"
                                >
                                    Remember credentials
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-6 w-full rounded-xl bg-[#12D0F2] py-6 font-bold tracking-wide text-white shadow-lg shadow-cyan-200 transition-all hover:scale-[1.02] hover:bg-[#0ea5c2] active:scale-[0.98] dark:shadow-none"
                                disabled={processing}
                            >
                                {processing && (
                                    <Spinner className="mr-2 h-4 w-4" />
                                )}
                                AUTHENTICATE
                            </Button>
                        </>
                    )}
                </Form>

                {/* Footer Decor */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6 font-mono text-[10px] text-slate-400 uppercase dark:border-slate-700">
                    <span>SYS.VER 3.1.2</span>
                    <span>SECURE CONNECTION</span>
                </div>
            </div>
        </div>
    );
}
