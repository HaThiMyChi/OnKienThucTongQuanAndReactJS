import useUser from "../useUser"

export default function Cart() {
  const [user] = useUser({});

  return <div>Cart {user?.name}</div>
}