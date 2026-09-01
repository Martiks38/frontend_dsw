'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';

import { actions } from '@/app/actions';
import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { FormError } from '@/components/ui/FormError/FormError';
import { CheckboxInput } from '@/components/ui/Input/CheckboxInput';
import { Input } from '@/components/ui/Input/Input';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { Label } from '@/components/ui/Label/Label';
import { type FormState } from '@/validations/auth';

import { SIGN_IN_FIELDS } from './constants';

const styles = {
  card: 'rounded-2xl xs:bg-white/95 px-8 py-6 xs:py-10 xs:shadow-[0_0_40px_rgba(0,0,0,0.12)] xs:backdrop-blur-sm',
  header: 'mb-6 flex flex-col items-center justify-center gap-4',
  content: 'space-y-4',
  fieldGroup: 'flex flex-col gap-1.5',
  formActions:
    'mb-6 gap-1.5 xs:gap-0 xs:flex-row flex-col flex items-center justify-between',
};

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  data: {
    email: '',
    remember: true,
  },
};
export default function SignInForm() {
  const [formState, formAction] = useActionState(
    actions.auth.loginUserAction,
    INITIAL_STATE
  );

  return (
    <div className="xs:max-w-md w-full">
      <form action={formAction} className="flex flex-col gap-5">
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <Link href={'/'} aria-label="Ir a la página de inicio">
              <Image
                src="/logo_2.png"
                alt="Guardería Náutica"
                width={180}
                height={48}
                preload
              />
            </Link>
            <CardTitle>Iniciar sesión</CardTitle>

            <CardDescription className="">
              Ingresa tus datos para ingresar a tu cuenta
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor={SIGN_IN_FIELDS.email} className="font-medium">
                Email
              </Label>
              <Input
                type="email"
                id={SIGN_IN_FIELDS.email}
                name={SIGN_IN_FIELDS.email}
                placeholder="Ej: juan@correo.com"
                autoComplete="email"
                defaultValue={formState.data?.email}
                required
              />
              <FormError error={formState.zodErrors?.email} />
            </div>

            <div className={styles.fieldGroup}>
              <Label htmlFor={SIGN_IN_FIELDS.password} className="font-medium">
                Contraseña
              </Label>
              <PasswordInput
                id={SIGN_IN_FIELDS.password}
                name={SIGN_IN_FIELDS.password}
              />
              <FormError error={formState.zodErrors?.password} />
            </div>

            <div className={styles.formActions}>
              <div className="flex items-center gap-2">
                <CheckboxInput
                  id={SIGN_IN_FIELDS.remember}
                  name={SIGN_IN_FIELDS.remember}
                  defaultChecked={formState.data?.remember}
                  readOnly
                />
                <Label htmlFor={SIGN_IN_FIELDS.remember}>Recordar</Label>
              </div>
              <Link href="/recuperar-cuenta" className="hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="xs:w-full">Iniciar sesión</Button>
          </CardFooter>
        </Card>
      </form>

      <div className="xs:flex-row xs:mt-8 xs:gap-6 mt-0 flex flex-col justify-center gap-2 text-center">
        <span>¿No tenés cuenta?</span>
        <Link href="/contacto" className="hover:underline">
          Contactanos
        </Link>
      </div>
    </div>
  );
}
