import Form from "../Components/Form";

export default function Login() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Form type="Login" url="http://localhost:4000/api/auth/login" />
    </div>
  );
}
