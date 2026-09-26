'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { actions } from '@/app/actions';
import type { OperatorOption, ServiceRequestDetail } from '@/interfaces';
import { type UserRole } from '@/lib/auth';

import { AssignmentInput, AssignmentSection } from './AssignmentSection';
import { CancelButton } from './CancelButton';
import { CommentSection } from './CommentSection';
import { DetailInfo } from './DetailInfo';
import { FormMessage } from './FormMessage';
import { StatusActionButton } from './StatusActionButton';

interface Props {
  detail: ServiceRequestDetail;
  role: UserRole;
  operators: OperatorOption[];
}

const {
  assignServiceRequest,
  cancelServiceRequest,
  updateServiceRequestManagement,
} = actions.serviceRequest;

export function ServiceRequestDetailView({ detail, role, operators }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runAction(action: () => Promise<void>, successMessage: string) {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await action();
        setMessage(successMessage);
        router.refresh();
      } catch (e) {
        setError(
          e instanceof Error ? e.message : 'Ocurrió un error inesperado.'
        );
      }
    });
  }

  function handleAssign(input: AssignmentInput) {
    runAction(
      () =>
        assignServiceRequest(detail.id, {
          employeeId: input.employeePublicId,
          scheduledDate: input.scheduledDate,
          scheduledTime: input.scheduledTime,
          sector: input.sector || undefined,
        }),
      'Solicitud asignada correctamente.'
    );
  }

  const canAssign =
    role === 'ADMIN' &&
    (detail.status === 'PENDING' || detail.status === 'SCHEDULED');

  return (
    <div className="mx-auto w-fit">
      <DetailInfo detail={detail} />

      <FormMessage message={message} error={error} />

      {detail.canEditComment && (
        <CommentSection
          initialComment={detail.internalComment ?? ''}
          disabled={isPending}
          onSave={(comment) =>
            runAction(
              () =>
                updateServiceRequestManagement(detail.id, {
                  internalComment: comment,
                }),
              'Comentario guardado.'
            )
          }
        />
      )}

      {detail.canUpdateStatus && (
        <StatusActionButton
          status={detail.status}
          isDepartureService={detail.isDepartureService}
          disabled={isPending}
          onUpdate={(status, estimatedReturnDatetime) =>
            runAction(
              () =>
                updateServiceRequestManagement(detail.id, {
                  status,
                  estimatedReturnDatetime,
                }),
              'Estado actualizado.'
            )
          }
        />
      )}

      {canAssign && (
        <AssignmentSection
          status={detail.status}
          operators={operators}
          disabled={isPending}
          onSubmit={handleAssign}
          onValidationError={(msg) => {
            setMessage(null);
            setError(msg);
          }}
        />
      )}

      {detail.canCancel && (
        <CancelButton
          disabled={isPending}
          onCancel={() =>
            runAction(
              () => cancelServiceRequest(detail.id),
              'Solicitud cancelada.'
            )
          }
        />
      )}
    </div>
  );
}
