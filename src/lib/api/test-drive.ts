export interface TestDriveRequest {
  name: string;
  email: string;
  phone: string;
  car: string;
  date: string;
  message: string;
}

export type TestDriveErrors = Partial<Record<keyof TestDriveRequest, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

export function validateTestDrive(data: TestDriveRequest, today = new Date()): TestDriveErrors {
  const errors: TestDriveErrors = {};
  if (data.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL.test(data.email.trim())) errors.email = "Enter a valid email address.";
  if (!PHONE.test(data.phone.trim()) || data.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Enter a valid phone number.";
  if (!data.car) errors.car = "Choose a vehicle.";
  if (!data.date) errors.date = "Choose a preferred date.";
  else {
    const picked = new Date(`${data.date}T00:00:00`);
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (Number.isNaN(picked.getTime()) || picked < start) errors.date = "Choose a date from tomorrow onward.";
  }
  if (data.message.length > 500) errors.message = "Keep your message under 500 characters.";
  return errors;
}

/**
 * Mock submission — BLACKLINE has no backend. Resolves after a short delay.
 * Use an address ending in "@fail.test" to preview the error state.
 */
export async function submitTestDriveRequest(data: TestDriveRequest): Promise<{ reference: string }> {
  await new Promise((r) => setTimeout(r, 1400));
  if (data.email.trim().toLowerCase().endsWith("@fail.test")) {
    throw new Error("We couldn't reach the booking service. Please try again.");
  }
  return { reference: `BL-${Math.random().toString(36).slice(2, 8).toUpperCase()}` };
}
