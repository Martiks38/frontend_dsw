import type { ActionResult, DataActionResult } from '@/interfaces';
import { OperationsError } from '@/lib/operations';

function messageOf(error: unknown, fallback: string): string {
  return error instanceof OperationsError ? error.message : fallback;
}

export async function runVoid(
  task: () => Promise<void>,
  fallback: string
): Promise<ActionResult> {
  try {
    await task();
    return { success: true };
  } catch (error) {
    return { success: false, errorMessage: messageOf(error, fallback) };
  }
}

export async function runData<T>(
  task: () => Promise<T>,
  fallback: string
): Promise<DataActionResult<T>> {
  try {
    return { success: true, data: await task() };
  } catch (error) {
    return { success: false, errorMessage: messageOf(error, fallback) };
  }
}
