"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Loader2, X } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cars } from "@/data/cars";
import {
  submitTestDriveRequest,
  validateTestDrive,
  type TestDriveErrors,
  type TestDriveRequest,
} from "@/lib/api/test-drive";
import { cn } from "@/lib/cn";

type Status = "idle" | "loading" | "success" | "error";

interface TestDriveModalProps {
  open: boolean;
  initialCar?: string;
  onClose: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

function tomorrowISO() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function TestDriveModal({ open, initialCar, onClose }: TestDriveModalProps) {
  const ref = useDialog<HTMLDivElement>(open, onClose);
  const titleId = useId();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.1 } }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[94svh] w-full max-w-2xl flex-col overflow-hidden border border-line bg-bg text-fg shadow-2xl shadow-black/50"
            initial={{ y: 60, opacity: 0, clipPath: "inset(10% 0% 0% 0%)" }}
            animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ y: 40, opacity: 0, transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] } }}
            transition={{ duration: 0.7, ease }}
          >
            {/* key resets the form each time the dialog opens */}
            <TestDriveForm key={initialCar ?? "none"} titleId={titleId} initialCar={initialCar} onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function TestDriveForm({
  titleId,
  initialCar,
  onClose,
}: {
  titleId: string;
  initialCar?: string;
  onClose: () => void;
}) {
  const uid = useId();
  const [data, setData] = useState<TestDriveRequest>({
    name: "",
    email: "",
    phone: "",
    car: initialCar ?? "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<TestDriveErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [serverError, setServerError] = useState("");

  const set = <K extends keyof TestDriveRequest>(key: K, value: TestDriveRequest[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched) setErrors(validateTestDrive(next));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validateTestDrive(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      const el = e.currentTarget.querySelector<HTMLElement>(`[data-field="${first}"]`);
      (el?.querySelector<HTMLElement>("button") ?? el)?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");
    try {
      const res = await submitTestDriveRequest(data);
      setReference(res.reference);
      setStatus("success");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const car = cars.find((c) => c.slug === data.car);
  const fieldId = (k: string) => `${uid}-${k}`;
  const errId = (k: keyof TestDriveRequest) => (errors[k] ? `${uid}-${k}-error` : undefined);

  return (
    <>
      <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-5 sm:px-8">
        <div>
          <p className="t-meta mb-2">Private appointment</p>
          <h2 id={titleId} className="t-title">
            Request a test drive
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-line-strong"
        >
          <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="px-6 py-14 text-center sm:px-8"
            role="status"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="mx-auto mb-8 grid size-16 place-items-center rounded-full bg-invert-bg text-invert-fg"
            >
              <Check className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </motion.span>
            <p className="t-heading text-[clamp(1.75rem,4vw,2.5rem)]">Request received.</p>
            <p className="t-body mx-auto mt-4 max-w-sm">
              Thanks, {data.name.split(" ")[0]}. We&apos;ve noted your interest in the {car?.fullName}. This is a demo —
              nobody will call, but the form did its job.
            </p>
            <p className="t-meta mt-6">
              Reference <span className="text-fg">{reference}</span>
            </p>
            <div className="mt-10 flex justify-center">
              <Button onClick={onClose} variant="outline" size="md" icon="none">
                Close
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
            className="flex min-h-0 flex-1 flex-col"
            aria-busy={status === "loading"}
          >
            <div className="grid gap-x-6 gap-y-7 overflow-y-auto px-6 py-7 sm:grid-cols-2 sm:px-8">
              <Field label="Full name" id={fieldId("name")} error={errors.name} errorId={errId("name")}>
                <input
                  id={fieldId("name")}
                  data-field="name"
                  data-autofocus
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  aria-invalid={!!errors.name || undefined}
                  aria-describedby={errId("name")}
                  className={inputCls(!!errors.name)}
                  placeholder="Alex Morgan"
                />
              </Field>
              <Field label="Email" id={fieldId("email")} error={errors.email} errorId={errId("email")}>
                <input
                  id={fieldId("email")}
                  data-field="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={!!errors.email || undefined}
                  aria-describedby={errId("email")}
                  className={inputCls(!!errors.email)}
                  placeholder="you@domain.com"
                />
              </Field>
              <Field label="Phone" id={fieldId("phone")} error={errors.phone} errorId={errId("phone")}>
                <input
                  id={fieldId("phone")}
                  data-field="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={!!errors.phone || undefined}
                  aria-describedby={errId("phone")}
                  className={inputCls(!!errors.phone)}
                  placeholder="+1 555 010 2030"
                />
              </Field>
              <Field label="Preferred date" id={fieldId("date")} error={errors.date} errorId={errId("date")}>
                <input
                  id={fieldId("date")}
                  data-field="date"
                  type="date"
                  min={tomorrowISO()}
                  value={data.date}
                  onChange={(e) => set("date", e.target.value)}
                  aria-invalid={!!errors.date || undefined}
                  aria-describedby={errId("date")}
                  className={cn(inputCls(!!errors.date), !data.date && "text-fg-subtle")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Vehicle" id={fieldId("car")} labelAs="span" error={errors.car} errorId={errId("car")}>
                  <div data-field="car" tabIndex={-1} className="outline-none">
                    <Select
                      id={`${fieldId("car")}-button`}
                      labelledBy={`${fieldId("car")}-label`}
                      value={data.car}
                      onChange={(v) => set("car", v)}
                      placeholder="Choose a machine"
                      invalid={!!errors.car}
                      describedBy={errId("car")}
                      options={cars.map((c) => ({ value: c.slug, label: c.fullName, hint: c.engineShort }))}
                    />
                  </div>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Message"
                  optional
                  id={fieldId("message")}
                  error={errors.message}
                  errorId={errId("message")}
                >
                  <textarea
                    id={fieldId("message")}
                    data-field="message"
                    rows={3}
                    maxLength={600}
                    value={data.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message || undefined}
                    aria-describedby={errId("message")}
                    className={cn(inputCls(!!errors.message), "h-auto resize-none py-3")}
                    placeholder="Anything we should know?"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-auto border-t border-line px-6 py-5 sm:px-8">
              <AnimatePresence>
                {status === "error" && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 flex items-start gap-2 overflow-hidden text-sm text-danger"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    {serverError}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-fg-subtle">Demo form · no data leaves your browser.</p>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex h-12 items-center justify-center gap-3 rounded-full bg-invert-bg px-7 text-sm font-medium text-invert-fg transition-opacity disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Sending request…
                    </>
                  ) : status === "error" ? (
                    "Try again"
                  ) : (
                    "Request test drive"
                  )}
                </button>
              </div>
              <p className="sr-only" aria-live="polite">
                {status === "loading" ? "Sending your request" : ""}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </>
  );
}

function inputCls(invalid: boolean) {
  return cn(
    "h-12 w-full border-b bg-transparent text-[0.9375rem] text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-fg",
    invalid ? "border-danger" : "border-line-strong",
  );
}

function Field({
  label,
  id,
  error,
  errorId,
  optional,
  labelAs = "label",
  children,
}: {
  label: string;
  id: string;
  error?: string;
  errorId?: string;
  optional?: boolean;
  labelAs?: "label" | "span";
  children: React.ReactNode;
}) {
  const LabelTag = labelAs;
  return (
    <div>
      <LabelTag
        {...(labelAs === "label" ? { htmlFor: id } : { id: `${id}-label` })}
        className="t-meta mb-1 flex justify-between"
      >
        {label}
        {optional && <span className="tracking-normal text-fg-subtle normal-case">Optional</span>}
      </LabelTag>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-danger"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
