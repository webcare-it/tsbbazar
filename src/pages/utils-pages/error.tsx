export const ErrorPage = ({ error }: { error?: unknown }) => {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          দয়া করে, এই পেজের একটা স্ক্রিনশর্ট নিয়ে আমাদের পাঠান!
        </h1>

        <p className="text-xl mt-8">{JSON.stringify(error)}</p>
      </div>
    </section>
  );
};
