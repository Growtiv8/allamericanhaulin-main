"use client";
import React, { forwardRef, FormHTMLAttributes, InputHTMLAttributes, LabelHTMLAttributes, ButtonHTMLAttributes, DialogHTMLAttributes } from 'react';

// Button component
export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Dialog component
export const Dialog = forwardRef<HTMLDialogElement, DialogHTMLAttributes<HTMLDialogElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <dialog
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </dialog>
    );
  }
);
Dialog.displayName = 'Dialog';

// Form component
export const Form = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </form>
    );
  }
);
Form.displayName = 'Form';

// Input component
export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={className}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Label component
export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </label>
    );
  }
);
Label.displayName = 'Label';
