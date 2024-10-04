import LoginForm from "@/ui/login-form";

export default function Home() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-black" />
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <LoginForm />
      </div>
    </div>
  );
}
