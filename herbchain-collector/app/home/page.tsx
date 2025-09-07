"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push("/collectorDashboard");
        }}
        className="w-full mt-4"
      >
        Record Collection
      </Button>
    </div>
  );
};

export default page;
