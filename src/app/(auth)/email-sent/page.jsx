export default function EmailSentPage() {
  return (
    <div className="flex flex-col w-fit text-center self-center flex-wrap min-w-fit gap-10 border-2 border-secondary p-5 bg-secondary drop-shadow-md shadow-secondary">
      <h1 className="text-2xl text-neutral-200">Email Confirmation Sent</h1>
      <p className="text-neutral-300 flex flex-col gap-5">
        Thank you for signing up to Nuvola Coffee Shop! <br /> We&apos;ve sent a
        confirmation email to complete your registration. <br />
        Please check your inbox{" "}
      </p>
    </div>
  );
}
