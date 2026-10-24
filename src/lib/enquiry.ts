export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  matter: string;
  message: string;
};

/**
 * Sends the enquiry form.
 *
 * NOT CONNECTED YET: this only simulates a network request so the form's
 * loading and success states can be reviewed. Before launch, replace the body
 * with a real call (Formspree, Resend, your own API route, etc.) and throw an
 * Error on failure so the form shows its error state.
 */
export async function submitEnquiry(data: Enquiry): Promise<void> {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 1200));
}
