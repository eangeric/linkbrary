import Form from "../Components/Form";

export default function Signup() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Form type="Sign up" url="http://localhost:4000/api/auth/signup" />
    </div>
  );
}
