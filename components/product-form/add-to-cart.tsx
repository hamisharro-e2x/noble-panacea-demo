'use client';

import { Loader2 as Spinner } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@bigcommerce/components/button';

export const AddToCart = ({ disabled = false }: { disabled?: boolean }) => {
  const { formState } = useFormContext();
  const { isSubmitting } = formState;

  return (
    <Button
      className="text-sm font-extralight uppercase"
      disabled={disabled || isSubmitting}
      type="submit"
      variant="tertiary"
    >
      {isSubmitting ? (
        <>
          <Spinner aria-hidden="true" className="animate-spin" />
          <span className="sr-only">Processing...</span>
        </>
      ) : (
        'Add to cart'
      )}
    </Button>
  );
};
