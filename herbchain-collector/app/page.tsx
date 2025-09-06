import InstallButton from "@/components/InstallButton";

export default function Home() {
  return (
    <div className="flex">
      <div>Landing page </div>
      <button className="p-2 m-2 border-[0.5] rounded-md">
        <a href="/kyc">Click here to Verify / KYC </a>
      </button>
      <InstallButton />
    </div>
  );
}
